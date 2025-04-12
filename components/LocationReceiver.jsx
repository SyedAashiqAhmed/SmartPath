import React, { useEffect, useState } from 'react';
import { ref, onValue, update } from "firebase/database";
import { database } from "../firebaseConfig";

export default function LocationReceiver() {
  const [requests, setRequests] = useState([]);
  const [enteredOTPs, setEnteredOTPs] = useState({});
  const [matchError, setMatchError] = useState({});

  useEffect(() => {
    const reqRef = ref(database, "requests");
    const unsubscribe = onValue(reqRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setRequests(formatted.reverse());
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOTPChange = (id, value) => {
    setEnteredOTPs((prev) => ({ ...prev, [id]: value }));
  };

  const verifyOTP = async (req) => {
    const input = enteredOTPs[req.id]?.trim();
    if (!input || input.length < 4) {
      setMatchError((prev) => ({ ...prev, [req.id]: "Please enter a valid code" }));
      return;
    }

    if (input === String(req.matchCode)) {
      const reqRef = ref(database, `requests/${req.id}`);
      await update(reqRef, { status: "started" });
      setMatchError((prev) => ({ ...prev, [req.id]: "" }));
    } else {
      setMatchError((prev) => ({ ...prev, [req.id]: "❌ Code does not match" }));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🚨 Customer Location Requests</h1>

      {requests.length === 0 ? (
        <p style={styles.emptyText}>No location shared yet.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} style={styles.card}>
            <p><span style={styles.label}>Latitude:</span> {req.latitude}</p>
            <p><span style={styles.label}>Longitude:</span> {req.longitude}</p>
            <p><span style={styles.label}>Destination:</span> {req.destination}</p>
            <p><span style={styles.label}>Time:</span> {new Date(req.timestamp).toLocaleString()}</p>
            <p><span style={styles.label}>Status:</span>
              <span style={{
                color:
                  req.status === 'started' ? '#007bff' :
                  req.status === 'accepted' ? 'green' :
                  req.status === 'rejected' ? 'red' : '#f57c00',
                fontWeight: 'bold',
                marginLeft: 6
              }}>
                {req.status}
              </span>
            </p>

            {req.latitude && req.longitude && (
              <iframe
                title="Current Location"
                width="100%"
                height="250"
                style={styles.map}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${req.latitude},${req.longitude}&z=15&output=embed`}
              ></iframe>
            )}

            {req.destination && (
              <iframe
                title="Destination"
                width="100%"
                height="250"
                style={{ ...styles.map, marginTop: 10 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(req.destination)}&z=15&output=embed`}
              ></iframe>
            )}

            {req.status === "pending" && (
              <div style={{ marginTop: 20 }}>
                <p><strong>🔐 Enter Journey Code (OTP):</strong></p>
                <input
                  type="text"
                  placeholder="Enter OTP shown to customer"
                  value={enteredOTPs[req.id] || ""}
                  onChange={(e) => handleOTPChange(req.id, e.target.value)}
                  style={styles.input}
                />
                {matchError[req.id] && (
                  <p style={{ color: "red", fontWeight: 500 }}>{matchError[req.id]}</p>
                )}
                <button
                  onClick={() => verifyOTP(req)}
                  style={{ ...styles.button, ...styles.accept, marginTop: 10 }}
                >
                  ▶ Start Journey
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    color: "#2c3e50",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  map: {
    marginTop: 15,
    borderRadius: 10,
    border: "1px solid #ccc"
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: 6,
  },
  button: {
    padding: "10px 18px",
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s ease",
  },
  accept: {
    backgroundColor: "#4caf50",
    color: "#fff",
  },
  reject: {
    backgroundColor: "#e74c3c",
    color: "#fff",
  },
};
