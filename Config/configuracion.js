require('dotenv').config({path: '../.env'})

let dbConfig = {
    user: process.env.USER,
    password: process.env.PASS,
    dbName: "Cuentos",
    dbUrl: function (){
        return `mongodb+srv://${this.user}:${this.password}@cluster0.ui6e6mp.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
    },
    jwtSecret: process.env.JWT
}

module.exports = dbConfig;