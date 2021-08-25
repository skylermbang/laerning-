const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('../../key')
const User = require('../../models/user')


//serialize
// get info -> put it in cookie
passport.serializeUser((user, done) => {

    done(null, user.id);
})

//deserialize
// get cookie and find the user 
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})


passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        //passport callback function

        console.log("fuckkkkk")
        console.log(profile.emails[0].value)

        // check if user already exist in our db 
        const foundUser = await User.findOne({ googleId: profile.Id })

        if (foundUser) {
            // already have user in our db
            console.log("user is", foundUser)
            done(null, foundUser)

        } else {
            // new user to create in our db
            console.log(profile.email)
            new User({
                username: profile.displayName,
                googleId: profile.Id
            }).save().then((newUser) => {
                console.log(`new user created:   ${newUser}`)
                done(null, newUser)
            })
        }

    })
)
