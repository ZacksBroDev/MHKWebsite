#!/bin/bash
# MongoDB Startup Script

echo "🚀 Starting MongoDB..."
mongod --dbpath ~/data/db --port 27017 --fork --logpath ~/data/db/mongod.log

echo "✅ MongoDB started successfully!"
echo "📊 Check status: lsof -i :27017"
echo "📝 Logs: tail -f ~/data/db/mongod.log"
