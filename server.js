require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_VERIFY_SERVICE_SID,
  PORT,
} = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
  console.warn(
    "Warning: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN or TWILIO_VERIFY_SERVICE_SID is missing. " +
    "Set them in a .env file before sending real SMS. See .env.example."
  );
}

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// POST /api/send-code  { phone: "+37411234567" }
// Sends a one-time SMS code via Twilio Verify.
app.post("/api/send-code", async (req, res) => {
  const { phone } = req.body || {};
  if (!phone || typeof phone !== "string") {
    return res.status(400).json({ error: "phone is required, e.g. +37411234567" });
  }
  try {
    await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });
    res.json({ ok: true });
  } catch (err) {
    console.error("Twilio send-code error:", err.message);
    res.status(500).json({ error: "Could not send code", details: err.message });
  }
});

// POST /api/verify-code  { phone: "+37411234567", code: "1234" }
// Checks the code the user typed in against Twilio Verify.
app.post("/api/verify-code", async (req, res) => {
  const { phone, code } = req.body || {};
  if (!phone || !code) {
    return res.status(400).json({ error: "phone and code are required" });
  }
  try {
    const check = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });
    res.json({ verified: check.status === "approved" });
  } catch (err) {
    console.error("Twilio verify-code error:", err.message);
    res.status(500).json({ error: "Could not verify code", details: err.message });
  }
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

const port = PORT || 3001;
app.listen(port, () => console.log(`Twilio SMS backend running on port ${port}`));
