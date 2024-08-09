import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    auth user & get the token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async(req, res)=>{
    res.send('auth user');
}); 

// @desc    register user & get the token
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res)=>{
    res.send('register user');
}); 


// @desc    logout user & clear the cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async(req, res)=>{
    res.send('logout user');
}); 

// @desc    get user profile
// @route   GET /api/users/profile
// @access  PRIVATE
const getUserProfile = asyncHandler(async(req, res)=>{
    res.send('get user profile');
}); 

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  PRIVATE
const updateUserProfile = asyncHandler(async(req, res)=>{
    res.send('update user profile');
}); 

// @desc    get all user profile
// @route   GET /api/users
// @access  PRIVATE admin
const getUsers = asyncHandler(async(req, res)=>{
    res.send('get users');
}); 

// @desc    delete user 
// @route   DELETE /api/users/:id
// @access  PRIVATE admin
const deleteUser = asyncHandler(async(req, res)=>{
    res.send('delete users');
}); 

// @desc    delete user 
// @route   GET /api/users/:id
// @access  PRIVATE admin
const getUserById = asyncHandler(async(req, res)=>{
    res.send('delete users');
}); 

// @desc    UPDATE user 
// @route   PUT /api/users/:id
// @access  PRIVATE admin
const updateUser = asyncHandler(async(req, res)=>{
    res.send('delete users');
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