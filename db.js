mongoose = require("mongoose");

function connectDB(){
    mongoose.connect("mongodb+srv://Ariamsr:1234@cluster0.hsrtk.mongodb.net/web", {useUnifiedTopology: true, useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on("connected",() => {
        console.log("Mongo DB conecction sucessful")
    })

    connection.on("error",() => {
        console.log("error conection")
    })
}

connectDB()

module.exports = mongoose;