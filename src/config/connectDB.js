const mongoose = require("mongoose")

exports.connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://menichinidinopaolo:Romi6282@cluster1.zr0m6.mongodb.net/?retryWrites=true&w=majority')
        // await mongoose.connect('mongodb://127.0.0.1:27017/c50010')
        console.log('Base de datos conectada')        
    } catch (error) {
        console.log(error)
    }
}