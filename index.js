const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const cors = require("cors"); // Import the cors middleware

dotenv.config();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Specify the origin(s) that are allowed to access the server
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the HTTP methods allowed
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongoose Connect");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("Backend server is running");
});
