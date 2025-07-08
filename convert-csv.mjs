import fs from "fs";
import csv from "csv-parser";

const csvData = [];

// Read the CSV file
fs.createReadStream("./public/data/schedule.csv")
  .pipe(csv())
  .on("data", (row) => {
    csvData.push(row);
  })
  .on("end", async () => {
    console.log("CSV file read successfully");
    console.log(`Found ${csvData.length} events to upload`);

    // Get admin token first (you'll need to login as admin)
    try {
      // For now, let's just show what we would upload
      const events = csvData.map((row) => ({
        title: row.title,
        date: row.date,
        time: row.time,
        type: row.type.toLowerCase(),
        location: "Mile High Karate Dojo",
        description: `${row.type} - ${row.title}`,
        maxParticipants:
          row.type === "Tournament" ? 50 : row.type === "Class" ? 20 : 30,
      }));

      console.log("\nSample events to be uploaded:");
      events.slice(0, 5).forEach((event) => {
        console.log(
          `- ${event.date}: ${event.title} at ${event.time} (${event.type})`
        );
      });

      // Save events to a JSON file for manual upload
      fs.writeFileSync(
        "./events-to-upload.json",
        JSON.stringify(events, null, 2)
      );
      console.log("\nEvents saved to events-to-upload.json");
      console.log(
        "You can now manually add these events through the admin dashboard"
      );
    } catch (error) {
      console.error("Error processing events:", error);
    }
  });
