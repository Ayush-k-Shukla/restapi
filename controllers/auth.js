import mongoose from 'mongoose';
import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'user does not exist' });
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.SECRET_JWT_STRING,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ meassage: 'something went wrong' });
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (password !== confirmPassword) {
      res.status(400).json('password and confirm password not matches');
    }
    if (isUser) {
      res.status(400).json('Email is already taken');
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email: email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.SECRET_JWT_STRING,
      { expiresIn: '1h' }
    );

    res.status(201).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
    console.log(error);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET_JWT_STRING);
      req.userId = decodedData?.id;
    }

    res.status(200).json({ data: 'Valid token' });
  } catch (error) {
    res.status(500).json({ data: 'Invalid token' });
    console.log(error);
  }
};
