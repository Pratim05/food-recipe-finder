require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const {AdminModel, categoryModel, } = require('./database.js')
const { MongoClient } = require('mongodb');

const cors = require('cors')


const session = require('express-session')
const fileUpload = require("express-fileupload");

const path = require('path')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("*",cors({
    origin:true,
    credentials : true,
}))

app.use(fileUpload());

app.get('/',cors(),(req,res)=>{
 
})

app.post('/adminpage', async(req,res) =>{
    const {username,password} = req.body

    try {
        const check = await AdminModel.findOne({username:username , password: password})
        

        if(check){
            res.json("exist")
        }else{
            res.json('Not exist')
        }
    } catch (error) {
        res.json('Not-exist')
        console.log(error)
    }
})



app.post('/dashboard/categoryadd', async (req, res) => {

    
    console.log(req.files['categoryData[itemImage]'].name)
   
   



    try {

        const imageData = {
            filename : req.files['categoryData[itemImage]'].name,
            contenttype : req.files['categoryData[itemImage]'].mimetype,
            data : req.files['categoryData[itemImage]'].data
        }
        
    const data ={
        name : req.body['categoryData[itemname]'],
        description : req.body['categoryData[desc]'],
        image : imageData
    }

       await categoryModel.insertMany([data])
       console.log("Success fully added")
       res.json("Success fully added")
    } catch (error) {
        console.log("error in inserting data ", error)
    }
})


app.post('/Dashboard', async (req, res) => {
    const { catId, action } = req.body;
  
    try {
      if (action === 'deletecat') {
        // Delete the cat's data from the database
        await categoryModel.findByIdAndDelete(catId);
        res.json({ message: 'cat data deleted successfully' });
      } else {
        // Fetch category data
        const category = await categoryModel.find();
       
        res.json(category);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
 


//static file
app.use(express.static(path.join(__dirname,'./food_reciepe_finder_client/build')))
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './food_reciepe_finder_client/build/index.html'))
})


app.listen(8000,()=>{
    console.log('Running on Port 8000')
})