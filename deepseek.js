const express=require("express")
const openai=require("./config.js");
const { route } = require("./routes/routes.js");

const router=express.Router()

router.post("/deepseek", async(req,res)=>{
  try {
    const {query}=req.body;
    if(!query) return  res.status(400).json({message:"Query is required"})

 const prompt = `
You are a SaaS startup analyst AI.

Respond ONLY in this raw JSON format (no explanations, no markdown):

{
  "Problem Clarity": "85% - One-line reason",
  "Target Audience": "70% - One-line reason",
  "Market Opportunity": "90% - One-line reason",
  "Competition Summary": "60% - One-line reason",
  "Monetization Angle": "75% - One-line reason",
  "Validation Verdict": "Good Idea"
}

DO NOT return any markdown, headers, Python code, explanations, or setup guides. Only return valid JSON.

SaaS Idea: ${query}
`;
      const completion= await openai.chat.completions.create({
        model:"deepseek/deepseek-r1:free",
        messages:[
          {
            role:"user", 
            content:prompt
          }
        ]
      })

      res.json(completion.choices[0].message.content)

  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

module.exports=router;