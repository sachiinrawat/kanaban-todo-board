const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

dotenv.config();



mongoose
  .connect(
    "mongodb+srv://oncetechiene:uffwLeVETIvftLf1@kanban-board.zmpwbnx.mongodb.net/?retryWrites=true&w=majority&appName=kanban-board"
  )
  .then(() => console.log("Conected to Database"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(3000, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", 3000);
});
