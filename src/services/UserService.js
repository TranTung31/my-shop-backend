const User = require("../models/UserModel");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkEmail = await User.findOne({
        email: email,
      });
      if (checkEmail !== null) {
        resolve({
          status: "OK",
          message: "The email is already",
        });
      }
      const createUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
        phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
};
