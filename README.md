# Cloud Task Manager 🚀

A professional MERN stack Task Manager application featuring a modern UI, dark mode, and cloud-synchronized data storage.

## 🌐 Live Demo
* **Frontend:** [https://reena-10.github.io/Cloud-Task-Manager/](https://reena-10.github.io/Cloud-Task-Manager/)
* **Backend API:** [https://cloud-task-manager-1519.onrender.com/api/tasks](https://cloud-task-manager-1519.onrender.com/api/tasks)

## ✨ Features
* **Full CRUD Operations:** Create, Read, Update, and Delete tasks in real-time.
* **Professional UI:** Clean "Glassmorphism" dashboard with **Inter** typography.
* **Persistent Dark Mode:** Theme preference is saved using browser `localStorage`.
* **Cloud Database:** Data is persisted globally using **MongoDB Atlas**.
* **Cross-Origin Enabled:** Fully configured with `CORS` for secure cloud communication.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Variables & Flexbox), JavaScript (ES6+)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (NoSQL)
* **Deployment:** GitHub Pages (Frontend), Render (Backend)

## 🏗️ Architecture
The project follows a distributed cloud architecture:
1. The **User** interacts with the UI hosted on **GitHub Pages**.
2. Requests are sent to the **Node.js/Express** server hosted on **Render**.
3. Data is stored and retrieved from a **MongoDB Atlas** cluster.

## 🚀 Local Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/reena-10/Cloud-Task-Manager.git](https://github.com/reena-10/Cloud-Task-Manager.git)
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file and add your connection string:
   ```bash
   MONGO_URI=your_mongodb_atlas_uri
   PORT=3000
4. Run the server:
   ```bash
   npm run dev
 ## 🔒 Security Note
This project uses Environment Variables to protect sensitive credentials. The .env file is included in .gitignore to prevent database passwords from being exposed on public repositories.
