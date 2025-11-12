const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["https://www.tcbtjaivikkisan.com", "http://localhost:3000"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/api/data", (req, res) => {
  const clientData = req.body;
  console.log("Data received from client:", clientData);

  res.status(200).json({
    message: "Data received successfully!",
    receivedData: clientData,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
