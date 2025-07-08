import fs from "fs";
import fetch from "node-fetch";

// Read the events from JSON file
const events = JSON.parse(fs.readFileSync("./events-to-upload.json", "utf8"));

async function uploadEvents() {
  try {
    // First, login as admin to get token
    const loginResponse = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin@mhk.com",
        password: "admin123",
      }),
    });

    if (!loginResponse.ok) {
      console.error("Admin login failed");
      return;
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    const adminUserId = loginData.user.id;
    console.log("Admin login successful");

    // Upload each event
    let successCount = 0;
    let errorCount = 0;

    for (const event of events) {
      try {
        // Add the admin user ID to the event
        const eventWithCreator = {
          ...event,
          createdBy: adminUserId,
        };

        const response = await fetch("http://localhost:3001/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventWithCreator),
        });

        if (response.ok) {
          successCount++;
          if (successCount <= 5) {
            console.log(`✓ Added: ${event.title} on ${event.date}`);
          }
        } else {
          errorCount++;
          const errorText = await response.text();
          console.error(
            `✗ Failed to add ${event.title}: ${response.status} - ${errorText}`
          );
        }
      } catch (error) {
        errorCount++;
        console.error(`✗ Error adding ${event.title}:`, error.message);
      }
    }

    console.log(`\nUpload completed:`);
    console.log(`✓ Successfully added: ${successCount} events`);
    console.log(`✗ Failed: ${errorCount} events`);
  } catch (error) {
    console.error("Error during upload:", error);
  }
}

uploadEvents();
