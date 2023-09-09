const bcrypt = require("bcryptjs");
const { transformUser } = require("./merge");
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async (args) => {
    try {
      const foundUser = await User.findOne({ email: args.userInput.email });
      if (foundUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      return user.save();
    } catch (err) {
      throw err;
    }
  },

  user: async (args) => {
    try {
      const user = await User.findById(args.id);
      return transformUser(user);
    } catch (error) {
      throw error;
    }
  },
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return transformUser(user);
      });
    } catch (error) {
      throw error;
    }
    },
    login: async (args) => { 
        const foundUser = await User.findOne({ email: args.loginInput.email });
        if (!foundUser) { 
            throw new Error(`User ${args.loginInput.email} does not exist`);
        }
        const isEqual = await bcrypt.compare(
          args.loginInput.password,
          foundUser.password
        );
        if (!isEqual) { 
            throw new Error('incorrect credentials')
        }
        const token = await jwt.sign({
            userId: foundUser.id, email: foundUser.email
        }, 'supersecretkeywithsuperstrength', { expiresIn: '1h' })
        return {userId: foundUser.id, token: token, tokenExpiresIn: 1}
    },
};
