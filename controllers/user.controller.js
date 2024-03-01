const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User =  require("../models/user.model.js")
//@desc Register a user
// @route POST /api/users/register
// @access public 
const registerUser = asyncHandler(async(req,res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandotory!")
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("user already registered!")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(401).json({
            message : "user data is not valid"
        })
    }
    res.json({message: "Register the user"});
});

//@desc login a user
// @route POST /api/users/login
// @access public 
const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandotory!")
    }
    const user = await User.findOne({email});
    // compare password with hashedPassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"}
        );
        res.status(200).json({
            accessToken
        })
    }else{
        res.status(401)
        throw new Error("email and password not valid")
    }
});

//@desc information of a current user 
// @route get /api/users/current
// @access private 
const currentUserInfo = asyncHandler(async(req,res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUserInfo
}
