const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "talenthub";

// Sample data
const adminUser = {
  id: uuidv4(),
  username: "admin",
  password: "admin123", // In production, this should be hashed
  email: "admin@talenthub.com",
  role: "admin",
  created_at: new Date(),
  updated_at: new Date(),
};

const sampleApplicants = [
  {
    id: uuidv4(),
    full_name: "John Smith",
    email: "john.smith@email.com",
    phone_number: "+1234567890",
    role: "intern",
    skills_interests:
      "Web Development, React, Node.js, MongoDB, JavaScript, Python",
    availability: "Full-time, Monday to Friday, 9 AM - 5 PM",
    status: "pending",
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15"),
  },
  {
    id: uuidv4(),
    full_name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone_number: "+1987654321",
    role: "volunteer",
    skills_interests:
      "UI/UX Design, Figma, Adobe Creative Suite, User Research, Prototyping",
    availability: "Part-time, Weekends and evenings",
    status: "approved",
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-12"),
  },
  {
    id: uuidv4(),
    full_name: "Michael Chen",
    email: "michael.chen@email.com",
    phone_number: "+1555123456",
    role: "intern",
    skills_interests:
      "Data Science, Machine Learning, Python, SQL, Statistics, Data Visualization",
    availability: "Full-time, Flexible hours",
    status: "under_review",
    created_at: new Date("2024-01-20"),
    updated_at: new Date("2024-01-22"),
  },
  {
    id: uuidv4(),
    full_name: "Emily Davis",
    email: "emily.davis@email.com",
    phone_number: "+1444333222",
    role: "volunteer",
    skills_interests:
      "Content Writing, SEO, Social Media Marketing, Copywriting, Blog Management",
    availability: "Remote, 10-15 hours per week",
    status: "rejected",
    created_at: new Date("2024-01-05"),
    updated_at: new Date("2024-01-08"),
  },
  {
    id: uuidv4(),
    full_name: "David Wilson",
    email: "david.wilson@email.com",
    phone_number: "+1777888999",
    role: "intern",
    skills_interests:
      "Mobile Development, React Native, iOS, Android, Firebase, API Integration",
    availability: "Full-time, Monday to Friday",
    status: "approved",
    created_at: new Date("2024-01-18"),
    updated_at: new Date("2024-01-19"),
  },
  {
    id: uuidv4(),
    full_name: "Lisa Brown",
    email: "lisa.brown@email.com",
    phone_number: "+1666777888",
    role: "volunteer",
    skills_interests:
      "Project Management, Agile, Scrum, Team Leadership, Stakeholder Communication",
    availability: "Part-time, 20 hours per week",
    status: "pending",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id: uuidv4(),
    full_name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    phone_number: "+1888999000",
    role: "intern",
    skills_interests:
      "DevOps, Docker, Kubernetes, AWS, CI/CD, Linux Administration",
    availability: "Full-time, Remote",
    status: "under_review",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-24"),
  },
  {
    id: uuidv4(),
    full_name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone_number: "+1999000111",
    role: "volunteer",
    skills_interests:
      "Digital Marketing, Google Ads, Facebook Ads, Email Marketing, Analytics",
    availability: "Flexible, 15-20 hours per week",
    status: "approved",
    created_at: new Date("2024-01-12"),
    updated_at: new Date("2024-01-14"),
  },
];

async function seedDatabase() {
  let client;

  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("Clearing existing data...");
    await db.collection("users").deleteMany({});
    await db.collection("applications").deleteMany({});

    // Insert admin user
    console.log("Inserting admin user...");
    await db.collection("users").insertOne(adminUser);
    console.log("✅ Admin user created successfully");

    // Insert sample applicants
    console.log("Inserting sample applicants...");
    const result = await db
      .collection("applications")
      .insertMany(sampleApplicants);
    console.log(
      `✅ ${result.insertedCount} sample applicants created successfully`
    );

    // Display summary
    console.log("\n📊 Database Seeding Summary:");
    console.log("============================");
    console.log(`👤 Admin Users: 1`);
    console.log(`📝 Applications: ${result.insertedCount}`);

    console.log("\n🔑 Admin Login Credentials:");
    console.log("Username: admin");
    console.log("Password: admin123");

    console.log("\n📧 Sample Applicant Emails for Testing:");
    sampleApplicants.forEach((applicant, index) => {
      console.log(`${index + 1}. ${applicant.email} (${applicant.status})`);
    });

    console.log("\n🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed.");
    }
  }
}

// Run the seeding function
seedDatabase();
