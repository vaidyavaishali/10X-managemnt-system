const express = require('express')
const app = express()
const  mongoose  = require('mongoose');
const bodyParser = require("body-parser");
const router = require("./routes/student")
const port = 8000
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/STUDENTDATA',()=>{
    console.log("connect to the server");
})

app.use('/',router)

app.listen(port, () => console.log(`App listening on port ${port}!`))

// module.exports = app;   