const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
let db;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "talenthub";

async function connectToMongo() {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Validation schemas
const applicationSchema = Joi.object({
  full_name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required().min(10).max(15),
  role: Joi.string().valid("intern", "volunteer").required(),
  skills_interests: Joi.string().required().min(10),
  availability: Joi.string().required().min(5),
});

const loginSchema = Joi.object({
  username: Joi.string().optional(),
  password: Joi.string().optional(),
  email: Joi.string().email().optional(),
}).or("username", "email");

const statusUpdateSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "rejected", "under_review")
    .required(),
});

// Admin credentials (will be loaded from database)
let ADMIN_USERNAME = "admin";
let ADMIN_PASSWORD = "admin123";

// Load admin credentials from database
async function loadAdminCredentials() {
  try {
    const adminUser = await db.collection("users").findOne({ role: "admin" });
    if (adminUser) {
      ADMIN_USERNAME = adminUser.username;
      ADMIN_PASSWORD = adminUser.password;
      console.log("Admin credentials loaded from database");
    }
  } catch (error) {
    console.log("Using default admin credentials");
  }
}

// Helper function to validate request body
function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: "Validation error",
        details: error.details[0].message,
      });
    }
    next();
  };
}

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "TalentHub API is running" });
});

// Submit a new intern/volunteer application
app.post(
  "/api/applications",
  validateBody(applicationSchema),
  async (req, res) => {
    try {
      const applicationData = req.body;

      // Check if email already exists
      const existingApp = await db
        .collection("applications")
        .findOne({ email: applicationData.email });
      if (existingApp) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const application = {
        id: uuidv4(),
        ...applicationData,
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      };

      await db.collection("applications").insertOne(application);
      res.status(201).json(application);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Unified login endpoint
app.post("/api/login", validateBody(loginSchema), async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if admin credentials are provided
    if (username && password) {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = `admin_token_${uuidv4()}`;
        return res.json({
          token,
          message: "Admin login successful",
          user_type: "admin",
          redirect_path: "/admin/dashboard",
        });
      } else {
        return res.status(401).json({ error: "Invalid admin credentials" });
      }
    }

    // Check if applicant email is provided
    if (email) {
      const application = await db
        .collection("applications")
        .findOne({ email });
      if (!application) {
        return res
          .status(404)
          .json({ error: "No application found with this email" });
      }

      const token = `applicant_token_${uuidv4()}`;
      return res.json({
        token,
        message: "Applicant login successful",
        user_type: "applicant",
        user_info: {
          id: application.id,
          name: application.full_name,
          email: application.email,
        },
        redirect_path: "/status",
      });
    }

    return res.status(400).json({
      error:
        "Please provide either admin credentials (username/password) or applicant email",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get applicant's own application status
app.get("/api/applicant/status/:applicantId", async (req, res) => {
  try {
    const { applicantId } = req.params;
    const application = await db
      .collection("applications")
      .findOne({ id: applicantId });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error("Error getting applicant status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all applications for admin view
app.get("/api/admin/applications", async (req, res) => {
  try {
    const applications = await db
      .collection("applications")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    res.json(applications);
  } catch (error) {
    console.error("Error getting all applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update application status
app.put(
  "/api/admin/applications/:applicationId/status",
  validateBody(statusUpdateSchema),
  async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;

      const result = await db.collection("applications").updateOne(
        { id: applicationId },
        {
          $set: {
            status,
            updated_at: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      res.json({ message: `Application status updated to ${status}` });
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete an application
app.delete("/api/admin/applications/:applicationId", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const result = await db
      .collection("applications")
      .deleteOne({ id: applicationId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
async function startServer() {
  await connectToMongo();
  await loadAdminCredentials();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch(console.error);

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  process.exit(0);
});
