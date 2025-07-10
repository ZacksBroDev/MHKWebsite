const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Define Event schema directly in this file
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String },
    type: { type: String },
    maxParticipants: { type: Number, default: null },
    currentParticipants: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mhk_karate"
);

const loadCSVEvents = async () => {
  try {
    console.log("🗑️  Clearing existing events...");
    await Event.deleteMany({});
    console.log("✅ Cleared existing events");

    const events = [];
    const csvPath = path.join(__dirname, "public/data/schedule.csv");

    console.log("📄 Reading CSV file...");

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on("data", (row) => {
          // Parse the CSV row and create event object
          const event = {
            title: row.title,
            date: new Date(row.date),
            time: row.time,
            type: row.type,
            location: "Mile High Karate Dojo",
            description: `${row.type} - ${row.title}`,
            maxParticipants:
              row.type === "Tournament" ? 50 : row.type === "Class" ? 20 : 30,
            currentParticipants: 0,
            createdBy: null, // No user required for CSV import
          };
          events.push(event);
        })
        .on("end", async () => {
          try {
            console.log(`📊 Processing ${events.length} events...`);

            // Insert all events into MongoDB
            const result = await Event.insertMany(events);
            console.log(
              `🎉 Successfully loaded ${result.length} events into MongoDB`
            );

            // Display some sample events
            console.log("\n📅 Sample events loaded:");
            result.slice(0, 5).forEach((event) => {
              console.log(
                `   - ${event.date.toISOString().split("T")[0]}: ${
                  event.title
                } at ${event.time}`
              );
            });

            resolve(result);
          } catch (error) {
            console.error("❌ Error inserting events:", error);
            reject(error);
          }
        })
        .on("error", (error) => {
          console.error("❌ Error reading CSV file:", error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("❌ Error loading CSV events:", error);
    throw error;
  }
};

// Run the import
const runImport = async () => {
  try {
    console.log("🚀 Starting CSV to MongoDB migration...\n");
    await loadCSVEvents();
    console.log("\n✅ CSV import completed successfully!");
  } catch (error) {
    console.error("\n❌ CSV import failed:", error);
  } finally {
    mongoose.connection.close();
  }
};

runImport();
