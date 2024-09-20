const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 6112;

// Middleware to parse JSON bodies
app.use(express.json());

// A simple route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Function to start the server
const startServer = async () => {
  try {
    // Attempt to connect to the database
    await prisma.$connect();
    console.log("Database connection successful");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with failure
  }
};

// Start the server after the Prisma connection is successful
startServer();

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing HTTP server");
  await prisma.$disconnect();
  process.exit(0);
});
