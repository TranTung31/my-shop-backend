const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, confirmPassword } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser !== null) {
        resolve({
          status: "ERROR",
          message: "The email is already!",
        });
      }

      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        email,
        password: hash,
        confirmPassword: hash,
      });

      if (createdUser) {
        resolve({
          status: "OK",
          message: "Create the user successfully!",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The email is not definded",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }

      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "Login system successfully!",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user not found!",
        });
      }

      const dataUpdateUser = await User.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update the user successfully!",
        data: dataUpdateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined!",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Delete the user successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.find();
      resolve({
        status: "OK",
        message: "Get all users successfully!",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });

      if (user === null) {
        resolve({
          status: "ERROR",
          message: "The user not found!",
        });
      }

      resolve({
        status: "OK",
        message: "Get user detail successfully!",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids });

      resolve({
        status: "OK",
        message: "Delete many the user successfullt!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getCountUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.count();

      resolve({
        status: "OK",
        message: "Get count user successfully!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUser = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalUser = await User.count();

      resolve({
        status: "OK",
        message: "Get users successfully!",
        data: result,
        totalUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  deleteManyUser,
  getUser,
  getCountUser,
};
