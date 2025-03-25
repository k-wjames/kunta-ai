const express=require("express")
require("dotenv/config")

const routes=require("./deepseek.js")

const app = express();

app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT
 
// Server Startup

app.listen(PORT, ()=>{

    console.log(`########${ PORT}`)
    console.log(`************ KEY-----${process.env.KEY}`)
})