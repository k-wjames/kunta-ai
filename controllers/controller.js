const openai=require("../deepseek.js")
require("dotenv/config")

// Test
const test = async (req, res) => {
    res.send("Halloooo")
};


// const KEY = process.env.KEY
// const configuration = new Configuration({
//     apiKey: process.env.KEY,
//     "HTTP-Referer": "https://www.safaricom.co.ke/", // Optional. Site URL for rankings on openrouter.ai.
//     "X-Title": "KUNTA AI", // Optional. Site title for rankings on openrouter.ai.
//     "Content-Type": "application/json"
// });
// const openai = new OpenAIApi(configuration);


const deepseek = async (req, res) => {

    const query=req.body

    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: "You are a powerful search engine. Return concise, factual answers."
                },
                { role: "user", content: query }
            ],
            temperature: 0.3,
            max_tokens: 150
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Search error:", error.message);
        throw error;
    }
}


module.exports = {
    test, deepseek
}