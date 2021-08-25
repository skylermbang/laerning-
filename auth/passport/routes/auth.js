const router = require('express').Router()
const passport = require('passport')



//auth login

router.get('/login', (req, res) => {
    res.render('login',)
})

// auth with google 
router.get('/logout', (req, res) => {
    //handle with 
    req.logout()
    res.redirect('/',)

})


router.get('/google', passport.authenticate('google', {
    scope: ["profile", "email"]
}))


//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user)
    //res.send('you fucking reached here bitch ')
    res.redirect('/profile/')
})
module.exports = router
