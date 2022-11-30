const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors());



// parse application/json
app.use(bodyParser.json())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//app.use(express.raw())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

require("./routes/todo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  /*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });*/




