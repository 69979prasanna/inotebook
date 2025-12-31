☁️ iNotebook Cloud Drive

iNotebook Cloud Drive is a secure cloud-based storage and notes platform that allows users to upload, manage, and access their files and notes from anywhere.
The application focuses on authentication, data security, and scalability, making it suitable as a full-stack portfolio project.

🚀 Features

🔐 User Authentication & Authorization

Secure login & signup using JWT

Protected routes for authenticated users

☁️ Cloud File Storage

Upload and store files securely

Access files anytime from the dashboard

📝 Notes Management

Create, edit, and delete personal notes

Notes linked securely to individual user accounts

🗂️ User-Specific Data Isolation

Each user can only access their own files & notes

🛡️ Security First

Encrypted passwords

Token-based authentication

Secure API endpoints

🛠️ Tech Stack
Frontend

React

Bootstrap / CSS

Axios / Fetch API

Backend

Node.js

Express.js

Database

MongoDB

Mongoose

Authentication & Security

JSON Web Tokens (JWT)

bcrypt.js

Middleware-based route protection

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/inotebook-cloud-drive.git
cd inotebook-cloud-drive

2️⃣ Backend setup:

cd backend

npm install

Run backend server:

npm start

3️⃣ Frontend setup
cd frontend
npm install
npm start

🔐 Authentication Flow:

User registers or logs in

Server generates JWT token

Token stored securely on client

Protected routes validate token using middleware

Authorized access granted to files & notes

🧠 Key Learnings

Full-stack development with MERN

Secure authentication using JWT

Middleware-based authorization

API design & route protection

Handling cloud storage logic

Real-world error handling & validation

🌱 Future Enhancements

Folder-based file organization

File size & storage limits per user

Subscription-based storage plans

Forgot password / email verification

File sharing with access control

Cloud provider integration (AWS / Supabase / Firebase)

🤝 Contributing

Contributions are welcome!
Fork the repository and submit a pull request to improve features or security.