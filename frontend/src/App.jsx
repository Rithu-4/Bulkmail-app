import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async () => {
    const recipientArray = emails
      .split(",")
      .map(email => email.trim())
      .filter(email => email !== "");

    if (!subject || !message || recipientArray.length === 0) {
      setStatus(" Please fill all fields correctly");
      return;
    }

    try {
      setLoading(true);
      setStatus("Sending emails...");

      const res = await axios.post(
        "https://bulkmail-app-1-b34h.onrender.com/sendemail",
        {
          subject,
          message,
          recipients: recipientArray
        }
      );

      console.log("Response:", res.data);

      if (res.data.success) {
        setStatus(" Emails Sent Successfully");
        setSubject("");
        setMessage("");
        setEmails("");
      } else {
        setStatus(" Failed to Send Emails");
      }

    } catch (error) {
      console.log("Error:", error);

      if (error.response) {
        console.log("Backend Error:", error.response.data);
      }

      setStatus("❌ Server Error / Network Issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Bulk Mail Application</h1>

      <input
        type="text"
        placeholder="Enter Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        placeholder="Enter Email Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <textarea
        placeholder="Enter Emails separated by commas"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      ></textarea>

      <button onClick={sendMail} disabled={loading}>
        {loading ? "Sending..." : "Send Emails"}
      </button>

      <p>{status}</p>
    </div>
  );
}

export default App;