# API Documentation

## Overview

The MHK Karate website uses a RESTful API built with Express.js and MongoDB. This document covers all available endpoints, request/response formats, and authentication requirements.

## Base URL

- Development: `http://localhost:3001/api`
- Production: TBD

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user with an access code.

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "accessCode": "string"
}
```

**Response:**
```json
{
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "role": "student",
    "createdAt": "ISO_date_string"
  }
}
```

#### POST /api/auth/login
Authenticate existing user.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "role": "student|instructor|admin",
    "createdAt": "ISO_date_string"
  }
}
```

#### GET /api/auth/profile
Get current user profile (requires authentication).

**Response:**
```json
{
  "id": "user_id",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "role": "student|instructor|admin",
  "createdAt": "ISO_date_string"
}
```

### Events Endpoints

#### GET /api/events
Get all events with optional filtering.

**Query Parameters:**
- `month` (optional): Filter by month (1-12)
- `year` (optional): Filter by year (YYYY)
- `type` (optional): Filter by event type

**Response:**
```json
[
  {
    "id": "event_id",
    "title": "string",
    "description": "string",
    "date": "ISO_date_string",
    "time": "HH:MM",
    "duration": "number (minutes)",
    "type": "class|seminar|tournament|belt_test|special",
    "level": "all|beginner|intermediate|advanced",
    "instructor": "string",
    "maxCapacity": "number",
    "registeredUsers": ["user_id"],
    "location": "string",
    "createdAt": "ISO_date_string"
  }
]
```

#### GET /api/events/:id
Get specific event by ID.

**Response:**
```json
{
  "id": "event_id",
  "title": "string",
  "description": "string",
  "date": "ISO_date_string",
  "time": "HH:MM",
  "duration": "number (minutes)",
  "type": "class|seminar|tournament|belt_test|special",
  "level": "all|beginner|intermediate|advanced",
  "instructor": "string",
  "maxCapacity": "number",
  "registeredUsers": [
    {
      "id": "user_id",
      "firstName": "string",
      "lastName": "string",
      "username": "string"
    }
  ],
  "location": "string",
  "createdAt": "ISO_date_string"
}
```

#### POST /api/events/:id/register
Register current user for an event (requires authentication).

**Response:**
```json
{
  "message": "Successfully registered for event",
  "event": {
    "id": "event_id",
    "title": "string",
    "registeredUsers": ["user_id"]
  }
}
```

#### DELETE /api/events/:id/register
Unregister current user from an event (requires authentication).

**Response:**
```json
{
  "message": "Successfully unregistered from event",
  "event": {
    "id": "event_id",
    "title": "string",
    "registeredUsers": ["user_id"]
  }
}
```

### Admin Endpoints

#### POST /api/events
Create a new event (requires admin authentication).

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "duration": "number (minutes)",
  "type": "class|seminar|tournament|belt_test|special",
  "level": "all|beginner|intermediate|advanced",
  "instructor": "string",
  "maxCapacity": "number",
  "location": "string"
}
```

#### PUT /api/events/:id
Update an event (requires admin authentication).

**Request Body:** Same as POST /api/events

#### DELETE /api/events/:id
Delete an event (requires admin authentication).

#### GET /api/admin/users
Get all users (requires admin authentication).

**Response:**
```json
[
  {
    "id": "user_id",
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "role": "student|instructor|admin",
    "createdAt": "ISO_date_string"
  }
]
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## Rate Limiting

Currently no rate limiting is implemented, but consider adding it for production deployment.

## CORS

CORS is configured to allow all origins in development. Update for production deployment.

## Database Models

### User Model
- `username` (String, unique, required)
- `password` (String, hashed, required)
- `firstName` (String, required)
- `lastName` (String, required)
- `email` (String, unique, required)
- `phone` (String, required)
- `role` (String, enum: student/instructor/admin, default: student)

### Event Model
- `title` (String, required)
- `description` (String, required)
- `date` (Date, required)
- `time` (String, required)
- `duration` (Number, default: 60)
- `type` (String, enum: class/seminar/tournament/belt_test/special)
- `level` (String, enum: all/beginner/intermediate/advanced)
- `instructor` (String, required)
- `maxCapacity` (Number, default: 20)
- `registeredUsers` (Array of User ObjectIds)
- `location` (String, default: "MHK Karate Academy")

### AccessCode Model
- `code` (String, unique, required)
- `isActive` (Boolean, default: true)
- `expiresAt` (Date, optional)
- `usageCount` (Number, default: 0)
- `maxUsage` (Number, optional)
