const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/userModel');

const passportConfig = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.NODE_ENV === 'production' ? `${process.env.PRODUCTION_URL}/api/v1/auth/google/callback` : '/api/v1/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await User.findOne({ email:profile.emails[0].value });
                    if (!user) {
                        user = await User.create({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            avatar: profile.photos[0].value,
                        });
                    }else{
                        if(!user.googleId){
                            user.googleId = profile.id;
                            user.name = profile.displayName;
                            user.email = profile.emails[0].value;
                            user.avatar = profile.photos[0].value;
                            user.isVerified = true;
                            await user.save({validateBeforeSave:false});
                        }
                    }
                    done(null, user);
                } catch (err) {
                    done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id); // Use async/await instead of a callback
            done(null, user); // Pass the user object to Passport
        } catch (err) {
            done(err, null); // Handle errors
        }
    });
};

module.exports = passportConfig; 