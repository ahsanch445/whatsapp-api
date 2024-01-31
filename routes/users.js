const express = require("express")
const bodyParser = require('body-parser');
const User = require("../models/User")
const router = express.Router()
const  Users = require("../models/Converstion")
const Massage = require("../models/Massage")

require("../mongodb/db")
router.use(bodyParser.json());




router.get('/favicon.ico', function (req, res) {
  // Simply end the response without sending any content
  res.end();
})
router.post("/getUserData",async(req,res)=>{
      try {
       
   const exist = await User.findOne({name:req.body.name})
   if(exist){
     res.status(200).json({massage:"user alreay exist"})
     return;
   }
   const newUser = new User(req.body)
   await newUser.save()
   return res.status(200).json(newUser)
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }

})

router.get("/getuser",async (req,res)=>{
     try {
          const user = await User.find({})
     return res.status(200).json(user)
          
     } catch (error) {
          res.status(500).json(error.massage);
     }
})
router.post("/addConverstion", async (req, res) => {
     try {
       const sender = req.body.sender;
       const reciver = req.body.recive;
   
console.log('Sender:', sender, 'Receiver:', reciver);

       const existingConversation = await Users.findOne({ conver: { $all: [sender, reciver] } });
   
       if (existingConversation) {
         return res.status(200).json({ message: "User is already in conversation" });
       }
   
       const newConversation = new Users({
        conver: [sender, reciver]
       });
    
       await newConversation.save();
     


       return res.status(201).json({ message: "Conversation added successfully" });
     } catch (error) {
       console.error(error);
       return res.status(500).json({ message: 'Internal Server Error' });
     }
   });

   router.post("/Converstion/Massage", async (req, res) => {
    try {
      const sender = req.body.sender;
      const reciver = req.body.reciver;
  
    console.log( reciver)
    console.log(sender)
      const massage = await Users.findOne({ conver: { $all: [sender, reciver] } });
      if(massage){
        res.status(200).json({ massage: "have alreay massage", data: massage });
      }
     
    } catch (error) {
      console.error("Error in /Converstion/Massage route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.post("/Save/Massage",async(req, res)=>{

    try {
      
      var data = await new Massage({
        sender:req.body.sender,
        reciver:req.body.reciver,
        Converstion:req.body.Converstion,
        text:req.body.text,
        type:req.body.type
      })
      await data.save()
      await Users.findByIdAndUpdate(req.body.Converstion,{massage:req.body.text})
      console.log(data)
      if(data){
        return res.status(201).json({ message: "Massage added successfully" });
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    
    }

  })
  router.get("/Get/Massage/:id",async(req,res)=>{
    try {
     let data =  await Massage.find({Converstion:req.params.id})
    
      return res.status(201).json(data)
    } catch (error) {
      res.status(500).json(error.massage)
    }
  })


  



module.exports = router