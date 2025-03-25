const express=require("express")
const openai=require("./config.js");
const { route } = require("./routes/routes.js");

const router=express.Router()

router.post("/deepseek", async(requestAnimationFrame,res)=>{
  try {
    const {query}=requestAnimationFrame.body;
    if(!query) return  res.status(400).json({message:"Query is required"})


      const completion= await openai.chat.completions.create({
        model:"deepseek/deepseek-r1:free",
        messages:[
          {
            role:"user", 
            content:query
          }
        ]
      })

      res.json(completion.choices[0].message.content)

  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

module.exports=router;