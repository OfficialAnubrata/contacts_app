const express = require("express");
const errorHandeler = require("./middlewares/errorHandeler.middleware.js");
const connectDb = require("./config/db.connection.js");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", require("./routes/contact.routes.js"))
app.use("/api/users", require("./routes/user.routes.js"))
app.use(errorHandeler)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})