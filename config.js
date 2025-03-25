require("dotenv").config()

const OpenAI=require("openai")

const openai=new OpenAI({
    baseURL:process.env.DEEPSEEK_BASE_URL,
    apiKey:process.env.KEY
})

module.exports=openai;