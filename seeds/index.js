const mongoose = require('mongoose');
const studentDetails = require('./studentDetails');
const { places,descriptors } = require('./seedHelpers')
const Student = require('../models/student');

mongoose.connect('mongodb://localhost:27017/schoolapp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open', () => {
    console.log('Database Connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Student.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const student = new Student({
            firstN: `${studentDetails[random1000].firstN}`,
            lastN:`${studentDetails[random1000].lastN}`,
            admin: '5fe97bad0720851eef7fe061',
            age: `${studentDetails[random1000].age}`,
            // lastN: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    "url" : "https://res.cloudinary.com/data-james/image/upload/v1609575855/SchoolApp/kqkeqpqnvjhuhhcadtu2.png",
                    "filename" : "SchoolApp/kqkeqpqnvjhuhhcadtu2" 
                }, 
                {
                    "url" : "https://res.cloudinary.com/data-james/image/upload/v1609575856/SchoolApp/yuzbib07wmls3wzlmmvs.png",
                    "filename" : "SchoolApp/yuzbib07wmls3wzlmmvs"
                }
            ]
            
        })
        await student.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close();  // closes the database once run and validated
})