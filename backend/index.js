const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db.js')
const taskrouter = require('./Routes/TaskRouter.js')
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send("Hello from server")
})

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', taskrouter);

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
});
