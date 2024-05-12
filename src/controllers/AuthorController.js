const AuthorService = require("../services/AuthorService");

const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name) {
      return res.status(404).json({
        status: "ERROR",
        message: "The input is required!",
      });
    }
    const respone = await AuthorService.createAuthor(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllAuthor = async (req, res) => {
  try {
    const respone = await AuthorService.getAllAuthor();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The author id is required!",
      });
    }

    const respone = await AuthorService.getAuthorById(authorId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const data = req.body;

    if (!authorId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The author id is required!",
      });
    }

    const respone = await AuthorService.updateAuthor(authorId, data);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The author id is required!",
      });
    }

    const respone = await AuthorService.deleteAuthor(authorId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyAuthor = async (req, res) => {
  try {
    const authorIds = req.body;
    const respone = await AuthorService.deleteManyAuthor(authorIds);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAuthor = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await AuthorService.getAuthor(
      Number(page) || 1,
      Number(limit) || 10
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getAuthor,
  createAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  deleteManyAuthor,
};
