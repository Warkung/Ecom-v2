const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({limit:"50mb"}));

const port = process.env.PORT;

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
