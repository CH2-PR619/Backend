const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

router.get("/",(req,res)=>{
    res.send("testingg")
})


module.exports = router;