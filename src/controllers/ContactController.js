const ContactService = require("../services/ContactService");

const createContact = async (req, res) => {
  try {
    const { userName, email, address, content, userId } = req.body;
    if (!userName || !email || !address || !content || !userId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The input is required!",
      });
    }
    const respone = await ContactService.createContact(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllContact = async (req, res) => {
  try {
    const respone = await ContactService.getAllContact();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!contactId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The contact id is required!",
      });
    }

    const respone = await ContactService.getContact(contactId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const data = req.body;

    if (!contactId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The contact id is required!",
      });
    }

    const respone = await ContactService.updateContact(contactId, data);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!contactId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The contact id is required!",
      });
    }

    const respone = await ContactService.deleteContact(contactId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyContact = async (req, res) => {
  try {
    const contactIds = req.body;
    const respone = await ContactService.deleteManyContact(contactIds);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createContact,
  getAllContact,
  getContact,
  updateContact,
  deleteContact,
  deleteManyContact,
};
