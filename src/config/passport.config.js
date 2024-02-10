import passport from 'passport';
import local from 'passport-local';
import GithubStrategy  from 'passport-github2';
import userModel from "../dao/models/userModel.js"; 
import { createHash} from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy

export const initializePassport = () => {   


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById({_id: id})
        done(null, user)
    })

//App ID: 824655

//Client ID: Iv1.54c990ebe6832162

//client secret: 7774a1736930d6b854f2944e26677c13cf2651f0 


    passport.use('github', new GithubStrategy({
        clientID:'Iv1.54c990ebe6832162',
        clientSecret: '7774a1736930d6b854f2944e26677c13cf2651f0',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('profile: ', profile)
        try {
                let user = await userModel.findOne({email: profile._json.email})
                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: profile._json.name,
                        email: profile._json.email,
                        password: ''
                    }

                    let result = await userModel.create(newUser)
                    return done(null, result)
                }

                return done(null, user)
        } catch (error) {
            done(error)
        }
    }))
}


