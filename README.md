# School Management System API

This project implements a Node.js API for managing school data using Express, Prisma ORM, and MySQL. The API allows users to add schools and fetch a list of schools sorted by proximity based on the user's location.

---

## **Project Overview**

### API Endpoints:
1. **POST /addSchool**: Adds a new school to the database.
2. **GET /listSchools**: Fetches a list of schools sorted by proximity to the user's location.

### Core Technologies:
- **Node.js**: JavaScript runtime environment for building the backend.
- **Express.js**: Framework for building the RESTful API.
- **Prisma**: ORM (Object-Relational Mapping) for interacting with MySQL.
- **MySQL**: Database used to store school data.
- **Joi**: Input validation library for API requests.
- **Winston**: Logger for error handling and important events.


---

### How to run the Node.js server:

1. **Clone the repository**:
   - `git clone https://github.com/saumyasingh003/Educase-India-assignment.git` 
   
2. **Install dependencies**:
   - `npm install`
   
3. **Set up the database**:
   - Create the MySQL database as described in the `Setup Instructions`.
   - Update the `.env` file with your database credentials `DATABASE_URL`.

4. **Run the server**:
   - `npm start`

After these steps, your server will be running locally at `http://localhost:3000`. Use Postman to test the APIs with the provided collection.

Let me know if you need any more adjustments!


## **API Endpoints**

### 1. **POST /addSchool**
Adds a new school to the database.

**Request Body**:
```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 19.0760,
  "longitude": 72.8777
}
