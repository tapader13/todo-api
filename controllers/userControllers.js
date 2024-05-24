import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import genToken from '../token/genToken.js';

//@ post
//@ api/users
//@ public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const existuser = await User.findOne({ email });
  if (existuser) {
    res.status(400);
    throw new Error(`${email} exists`);
  }
  const user = await User.create({ email, password, name });
  if (user) {
    genToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error('invalid data to store');
  }
});

//@ post
//@ api/users/auth
//@ public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    genToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(401);
    throw new Error('invalid email or password');
  }
});

//@ post
//@ api/users/logout
//@ public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'None',
    secure: true,
  });
  res.status(200).json({ message: 'user logout' });
});

//@ get
//@ api/users/profile
//@ private

const userProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  });
});

//@ post
//@ api/users/profile
//@ private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: 'user data not found' });
  }
});
export { registerUser, authUser, logoutUser, userProfile, updateProfile };
