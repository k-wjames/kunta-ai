const openai = require("../deepseek.js")
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

    const query = req.body
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

SaaS Idea: ${idea}
`;

    const originalPrompt = "You are a powerful search engine. Return concise, factual answers."
    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 50
        });
        //return completion.choices[0].message.content;

        const result = response.data.choices[0].message.content;
        try {
            const json = JSON.parse(result);
            res.json({ result: json });
        } catch (err) {
            res.json({ result: "⚠️ Failed to parse result. Here's what we got:\n\n" + result });
        }
    } catch (error) {
        console.error("Search error:", error.message);
        throw error;
    }
}


module.exports = {
    test, deepseek
}