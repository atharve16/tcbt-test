const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
