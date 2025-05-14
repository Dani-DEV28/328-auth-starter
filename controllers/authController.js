//register
import passport from "passport";
import { createUser } from "../model/user.js";

const registerPage = (req, res) => res.status(200).render("register.pug", {
    error: req.query.error
});

const register = async (req, res) => {
    const {username, password, confirm} = req.body;
    if(password === confirm) {
        const user = await createUser(username, password);
        console.log(`Created a new user: ${username}`);

        res.redirect("/login");
    }else{
        res.redirect("/register?error=Password and confirm don't match!");
    }
}

//login
const loginPage = (req, res) => res.status(200).render("login.pug", {
    error: req.query.error
});

const login = passport.authenticate("local", {    
    succeedRedirect: "/user",
    failureRedirect: "/login?error=invalid"
})

//logout
const logout = (req, res) => {
    
}

//middleware to protect routes
const isLoggedIn = (req, res, next) => {

}

const hasRole = (req, res, next) => {

}

export default { registerPage, register, loginPage, login, logout, isLoggedIn, hasRole }