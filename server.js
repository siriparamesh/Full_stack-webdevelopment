const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true
}));
app.use(express.json());


mongoose.set('strictQuery',false);
mongoose.connect('mongodb://127.0.0.1:27017/testDB',()=>{
    console.log("connected to DB");
});

const credSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
      
  },
  name:{
    type: String,
    required: true
  },

    password:{
        type: String,
        required: true
    },

    club:{
        type: String,
        required: true
      },

    branch:{
        type: String,
        required: true
      },

    phone:{
        type: String,
        required: true
      },
      
      query:{
        type: String,
        required: true
      },
});
 

 
const Cred = mongoose.model('Cred', credSchema);

app.get('/', async (req,res)=>{
   try{ res.render('index.ejs');
    res.sendFile(__dirname + 'sath.css');
   
    }
    catch(err){
        console.log(err);
        res.send("error");
    }

});
 
app.get('/signin',(req,res)=>{
    try{
        res.render('signin.ejs');
    }
    catch(err){
        console.log(err);
        res.send("error");
    }
});

app.post('/signin',async (req,res)=>{
    try{
        console.log(req.body);
        const cred = new Cred({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            club: req.body.club,
            branch: req.body.branch,
            phone: req.body.phone,
            query: req.body.query
        });

        await cred.save();
        res.send('success');
        
    }
    catch(err){
        console.log(err);
        res.send("error");
    }
});


app.listen(5000, ()=>{ 
    console.log("server is running on port 5000"); 

}); 