const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/west', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
    res.render('index',{userinfo:req.user})
})
module.exports=router;