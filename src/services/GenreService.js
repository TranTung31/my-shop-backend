const Genre = require("../models/GenreModal");

const createGenre = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name } = data;
    try {
      const checkGenre = await Genre.findOne({
        name: name,
      });

      if (checkGenre !== null) {
        resolve({
          status: "ERROR",
          message: "The genre's name already exists!",
        });
      }

      const createNewGenre = await Genre.create({
        name: name,
      });

      if (createNewGenre) {
        resolve({
          status: "OK",
          message: "Create genre success!",
          data: createNewGenre,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllGenre = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allGenre = await Genre.find();
      resolve({
        status: "OK",
        message: "Get all genre success!",
        data: allGenre,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getGenre = (genreId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkGenre = await Genre.findOne({
        _id: genreId,
      });

      if (checkGenre === null) {
        resolve({
          status: "ERROR",
          message: "The genre is not defined!",
        });
      }

      const genre = await Genre.findById(genreId);

      resolve({
        status: "OK",
        message: "Get detail genre success!",
        data: genre,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateGenre = (genreId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkGenre = await Genre.findOne({
        _id: genreId,
      });

      if (checkGenre === null) {
        resolve({
          status: "ERROR",
          message: "The genre is not defined!",
        });
      }

      const updateGenre = await Genre.findByIdAndUpdate(genreId, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update the genre success!",
        data: updateGenre,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteGenre = (genreId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkGenre = await Genre.findOne({
        _id: genreId,
      });

      if (checkGenre === null) {
        resolve({
          status: "ERROR",
          message: "The genre is not defined!",
        });
      }

      await Genre.findByIdAndDelete(genreId);

      resolve({
        status: "OK",
        message: "Delete the genre success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyGenre = (genreIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Genre.deleteMany({ _id: genreIds });

      resolve({
        status: "OK",
        message: "Delete many the genre success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createGenre,
  getAllGenre,
  getGenre,
  updateGenre,
  deleteGenre,
  deleteManyGenre,
};
