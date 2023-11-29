const mongoose = require("mongoose")
const config = require('../Config/configuracion')

mongoose.connect(config.dbUrl(), {
    useNewUrlParser:true
}).then(() => {
    console.log("Conected to db");
}).catch(err => {
    console.log("Not connected to db", err);
});

module.exports = {mongoose}