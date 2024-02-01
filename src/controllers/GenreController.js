const GenreService = require("../services/GenreService");

const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).json({
        status: "ERROR",
        message: "The name is required!",
      });
    }
    const respone = await GenreService.createGenre(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllGenre = async (req, res) => {
  try {
    const respone = await GenreService.getAllGenre();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getGenre = async (req, res) => {
  try {
    const genreId = req.params.id;

    if (!genreId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The genre id is required!",
      });
    }

    const respone = await GenreService.getGenre(genreId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const data = req.body;

    if (!genreId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The genre id is required!",
      });
    }

    const respone = await GenreService.updateGenre(genreId, data);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;

    if (!genreId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The genre id is required!",
      });
    }

    const respone = await GenreService.deleteGenre(genreId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyGenre = async (req, res) => {
  try {
    const genreIds = req.body;
    const respone = await GenreService.deleteManyGenre(genreIds);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createGenre,
  getAllGenre,
  getGenre,
  updateGenre,
  deleteGenre,
  deleteManyGenre,
};
