import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    auth user & get the token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && await user.matchPassword(password)){
        //create token
        generateToken(res, user._id);

        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
        });
    } else{
        res.status(401);
        throw new Error('invalid email or password');
    }
    
}); 

// @desc    register user & get the token
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });
  


// @desc    logout user & clear the cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie('jwt', '' ,{
        httpOnly : true,
        expires : new Date(0),
    } );
    res.status(200).json({message : 'logged out successfully'});
}); 

// @desc    get user profile
// @route   GET /api/users/profile
// @access  PRIVATE
const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        })
    } else{
        res.status(401);
        throw new Error('user not found');
    }
}); 

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  PRIVATE
const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        
        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('user not found')
    }
}); 

// @desc    get all user profile
// @route   GET /api/users
// @access  PRIVATE admin
const getUsers = asyncHandler(async(req, res)=>{
    const users = await User.find({});
    res.status(200).json(users);
}); 

// @desc    delete user 
// @route   DELETE /api/users/:id
// @access  PRIVATE admin
const deleteUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(user&& !user.isAdmin){
        user.remove();
        res.status(200).json({message : 'User Removed'});
    }else{
        if(user&& user.isAdmin){
            throw new Error('cannot delete admin');
        }else{
            res.status(404);
            throw new Error('user not found')
        }
    }
}); 

// @desc    delete user 
// @route   GET /api/users/:id
// @access  PRIVATE admin
const getUserById = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
}); 

// @desc    UPDATE user 
// @route   PUT /api/users/:id
// @access  PRIVATE admin
const updateUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin) || user.name;
        
        const updatedUser = await user.save();
        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin
        })
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
}); 


export {
    updateUser,
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById
};