const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGOURL;

mongoose.connect(DB)
 .then(() => {
    console.log("Database Connected!")
 }).catch((err) => {
    console.log("Error in database connection", err)
 });