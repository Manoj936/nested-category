const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
var cors = require("cors");
const Routes = require("./routes");
require('dotenv').config();
app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200,
    })
  );

  mongoose
  .connect(
    `mongodb+srv://${process.env.db_username}:${process.env.db_password}@hrm-cluster.rllnokq.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`
  )
  .then(async (data) => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection failed!", e);
  });
app.listen(3000 , ()=>{
    console.log('App is running at 3000')
})

app.use(Routes);