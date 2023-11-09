require('dotenv').config()

const mongoose = require('mongoose');

const adminDbConnectionString = process.env.AdminDbConnectionString
const CategoryDbConnectionString = process.env.CategoryDbConnectionString


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  };

  // Connect to the 'adminDb' database
const adminDb = mongoose.createConnection(adminDbConnectionString, options);
adminDb.on('error', console.error.bind(console, 'Admin database connection error:'));
adminDb.once('open', () => {
  console.log('Connected to adminDb database!');
});

const categoryDb = mongoose.createConnection(CategoryDbConnectionString, options);
categoryDb.on('error', console.error.bind(console, 'categoryDb database connection error:'));
categoryDb.once('open', () => {
  console.log('Connected to categoryDb database!');
});





const newSchema = mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
   
})

const categorySchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    image: {
        filename: String,
        contentType: String,
        data: Buffer
    }

   
})




const AdminModel = adminDb.model('Admin', newSchema);
const categoryModel = categoryDb.model('item' , categorySchema)

module.exports = {
    AdminModel,
    categoryModel

}