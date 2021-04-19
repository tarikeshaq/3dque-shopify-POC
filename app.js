const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.post("/order", (req, res) => {
  const { created_at, order_number, line_items } = req.body;
  console.log(
    `Recieved order for product id: ${line_items[0].product_id}, name: ${line_items[0].name} at: ${created_at}`
  );
  console.log("Notifying Printer....");
  const interval = setInterval(() => {
    console.log("Checking printer status...");
  }, 5000);
  setTimeout(() => {
    console.log("Printer status Updated!");
    console.log("Notifying shopify of updated status");
    clearInterval(interval);
  }, 15000);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
