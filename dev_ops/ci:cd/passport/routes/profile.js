const router = require('express').Router()

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login")
    } else {
        //if logged in
    } next()
}

router.get('/', authCheck, (req, res) => {
    //res.send(" you are beautiful like a space goat")
    res.render("profile", { user: req.user })
})
module.exports = router