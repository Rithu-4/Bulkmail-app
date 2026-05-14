import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");

  const sendMail = async () => {

    const recipientArray = emails
      .split(",")
      .map(email => email.trim());

    try {

      const res = await axios.post(
        "https://bulkmail-app-l9g6.onrender.com/sendemail",
        {
          subject,
          message,
          recipients: recipientArray
        }
      );

      if (res.data.success) {

        setStatus("Emails Sent Successfully");

      } else {

        setStatus("Failed to Send Emails");
      }

    } catch (error) {

      console.log(error);

      setStatus("Server Error");
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

      <button onClick={sendMail}>
        Send Emails
      </button>

      <p>{status}</p>

    </div>
  );
}

export default App;