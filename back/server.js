const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const habitRoutes = require("./api/routes/habitRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/habits", habitRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
