const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bulkmail")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Schema
const emailSchema = new mongoose.Schema({
    subject: String,
    message: String,
    recipients: Array,
    status: String,
    date: {
        type: Date,
        default: Date.now
    }
});

// Model
const Email = mongoose.model("Email", emailSchema);

// Send Email API
app.post("/sendemail", async (req, res) => {

    const { subject, message, recipients } = req.body;

    try {

        // Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send emails
        for (let i = 0; i < recipients.length; i++) {

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: recipients[i],
                subject: subject,
                text: message
            });

            console.log("Sent to:", recipients[i]);
        }

        // Save Success Record
        const newMail = new Email({
            subject,
            message,
            recipients,
            status: "Success"
        });

        await newMail.save();

        res.send({
            success: true,
            message: "Emails sent successfully"
        });

    } catch (error) {

        console.log("Error:", error.message);

        // Save Failed Record
        const failedMail = new Email({
            subject,
            message,
            recipients,
            status: "Failed"
        });

        await failedMail.save();

        res.send({
            success: false,
            message: "Error sending emails"
        });
    }
});

// Email History API
app.get("/history", async (req, res) => {

    try {

        const history = await Email.find().sort({ date: -1 });

        res.send(history);

    } catch (error) {

        console.log(error.message);

        res.send([]);
    }
});

// Server
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});