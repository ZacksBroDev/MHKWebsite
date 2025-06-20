import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static("public"));

app.post("/api/add-event", (req, res) => {
  const { date, title, time, type } = req.body;

  // Validate data
  if (!date || !title || !time || !type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Format time for display (convert from 24h to 12h format)
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formattedTime = formatTime(time);
  const newRow = `\n${date},${title},${formattedTime},${type}`;

  // Path to CSV file
  const csvPath = path.join(__dirname, "public", "data", "schedule.csv");

  // Append to CSV file
  fs.appendFile(csvPath, newRow, (err) => {
    if (err) {
      console.error("Error writing to CSV:", err);
      return res.status(500).json({ error: "Failed to add event" });
    }

    res.json({ success: true, message: "Event added successfully" });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});