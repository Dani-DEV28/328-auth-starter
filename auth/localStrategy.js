//import necessary packages
import passport from "passport";
import { Strategy } from "passport-local";
import { schema, validatePass } from "../model/user.js";

//serialize user into session data

passport.serializeUser((userRecord, done) => {
    console.log(`Serializing user: ${userRecord.username}`);
    const userId = userRecord.userId;
    done(null, userId);
});

//deserialize user from session data

passport.deserializeUser( async (userId, done) => {
    console.log(`Deserialixing user: ${userId}`);

    const found = await schema.findByPk(userId);
    if(found){
        done(null, found);
    }else{
        done(new Error("User not found"), null)
    }
});

//add local strategy middleware provided by passport.js
passport.use(new Strategy( async (username, password, done) => {
    const found = await schema.findOne({
        where:{
            username
        }
    })

    if(!found) return done(new Error("User didn't exist"), null);

    const match = await validatePass(password, found.password);
    if(!match) return done(new Error("Password don't match"));

    console.log(`Validated user: ${username}`);
    done(null, found);
}));
