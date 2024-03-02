const Author = require("../models/AuthorModal");

const createAuthor = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, bio } = data;
    try {
      const checkAuthor = await Author.findOne({
        name,
      });

      if (checkAuthor !== null) {
        resolve({
          status: "ERROR",
          message: "The name author is definded!",
        });
      }

      const createNewAuthor = await Author.create({
        name,
        bio,
      });

      if (createNewAuthor) {
        resolve({
          status: "OK",
          message: "Create author success!",
          data: createNewAuthor,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllAuthor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allAuthor = await Author.find();
      resolve({
        status: "OK",
        message: "Get all author success!",
        data: allAuthor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAuthor = (authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuthor = await Author.findOne({
        _id: authorId,
      });

      if (checkAuthor === null) {
        resolve({
          status: "ERROR",
          message: "The author is not defined!",
        });
      }

      const author = await Author.findById(authorId);

      resolve({
        status: "OK",
        message: "Get detail author success!",
        data: author,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateAuthor = (authorId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, bio } = data;

      const checkAuthor = await Author.findOne({
        _id: authorId,
      });

      if (checkAuthor === null) {
        resolve({
          status: "ERROR",
          message: "The author is not defined!",
        });
      }

      const dataUpdateAuthor = await Author.findByIdAndUpdate(authorId, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update the author success!",
        data: dataUpdateAuthor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteAuthor = (authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuthor = await Author.findOne({
        _id: authorId,
      });

      if (checkAuthor === null) {
        resolve({
          status: "ERROR",
          message: "The author is not defined!",
        });
      }

      await Author.findByIdAndDelete(authorId);

      resolve({
        status: "OK",
        message: "Delete the author success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyAuthor = (authorIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Author.deleteMany({ _id: authorIds });

      resolve({
        status: "OK",
        message: "Delete many the author success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createAuthor,
  getAllAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  deleteManyAuthor,
};
