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

app.post("/api/data", async (req, res) => {
  try {
    const {
      pickup_pincode,
      delivery_pincode,
      weight,
      order_amount,
      length,
      breadth,
      height,
    } = req.body;

    const payload = {
      pickup_pincode: pickup_pincode,
      delivery_pincode,
      payment_type: "PREPAID",
      shipment_type: "FORWARD",
      order_amount,
      type_of_package: "SPS",
      rov_type: "ROV_OWNER",
      weight,
      dimensions: [{ no_of_box: 1, length, width: breadth, height }],
    };

    const upstream = await fetch(
      "https://shipping-api.com/app/api/v1/rate-calculator",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "public-key":
            process.env.SHIPPING_PUBLIC_KEY || "s8f5WYvhS46ePKUD3Tti",
          "private-key":
            process.env.SHIPPING_PRIVATE_KEY || "5QEBoGF8S4i6xCPKJmth",
        },
        body: JSON.stringify(payload),
      }
    );

    const text = await upstream.text();
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "application/json"
    );
    res.writeHead(upstream.status);
    return res.end(text);
  } catch (err) {
    console.error("Parse/Proxy error:", err);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(400);
    return res.end(
      JSON.stringify({
        error: "Invalid request body or upstream error",
        detail: String(err),
      })
    );
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
