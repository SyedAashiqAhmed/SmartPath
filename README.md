📍 Location Receiver - Live Customer Journey Tracker
A real-time location sharing and verification tool built using React and Firebase. It enables businesses (e.g., taxi services, delivery agents, field workers) to receive live customer locations, verify journeys using OTP, and view live maps of source and destination.

🚀 Features
🔄 Real-time Firebase integration

📍 Google Maps embedding for live location & destination

🔐 OTP-based journey verification

🟢 Status tracking (pending, started, accepted, rejected)

💡 Clean and responsive UI with map previews

🛠️ Tech Stack
React.js (Frontend)

Firebase Realtime Database (Backend)

Google Maps Embed API

🔧 Installation & Setup
Clone this repository:

bash
Copy
Edit
git clone https://github.com/your-username/location-receiver.git
cd location-receiver
Install dependencies:

bash
Copy
Edit
npm install
Configure Firebase:

Create a firebaseConfig.js file in the src directory:

js
Copy
Edit
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
Run the app:

bash
Copy
Edit
npm start
📦 Folder Structure
bash
Copy
Edit
src/
├── firebaseConfig.js       # Firebase setup
├── LocationReceiver.js     # Main component
├── App.js                  # Entry point
├── index.js                # React DOM render
📈 Future Enhancements
Role-based login (admin/agent)

Export journey reports as PDF

Notifications via SMS or Email

Route optimization using Maps API



