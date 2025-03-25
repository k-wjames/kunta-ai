const express = require("express")

const{test, deepseek}=require("../controllers/controller")

const router = express.Router()

router.get("/", test)

router .post("/deepseek", deepseek)

module.exports = router

