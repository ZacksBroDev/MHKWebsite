const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Import the Event model
const Event = require("./models/Event");

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mhk_karate",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const loadCSVEvents = async () => {
  try {
    // Clear existing events
    await Event.deleteMany({});
    console.log("Cleared existing events");

    const events = [];
    const csvPath = path.join(__dirname, "public/data/schedule.csv");

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
            // Insert all events into MongoDB
            const result = await Event.insertMany(events);
            console.log(
              `Successfully loaded ${result.length} events into MongoDB`
            );

            // Display some sample events
            console.log("\nSample events loaded:");
            result.slice(0, 5).forEach((event) => {
              console.log(
                `- ${event.date.toISOString().split("T")[0]}: ${
                  event.title
                } at ${event.time}`
              );
            });

            mongoose.connection.close();
            resolve(result);
          } catch (error) {
            console.error("Error inserting events:", error);
            mongoose.connection.close();
            reject(error);
          }
        })
        .on("error", (error) => {
          console.error("Error reading CSV file:", error);
          mongoose.connection.close();
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error loading CSV events:", error);
    mongoose.connection.close();
  }
};

loadCSVEvents()
  .then(() => {
    console.log("CSV import completed successfully!");
  })
  .catch((error) => {
    console.error("CSV import failed:", error);
  });
