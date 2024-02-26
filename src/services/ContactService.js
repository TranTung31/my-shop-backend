const Contact = require("../models/ContactModal");

const createContact = (data) => {
  return new Promise(async (resolve, reject) => {
    const { userName, email, address, content, userId } = data;
    try {
      const createNewContact = await Contact.create({
        userName,
        email,
        address,
        content,
        userId,
      });

      if (createNewContact) {
        resolve({
          status: "OK",
          message: "Create contact success!",
          data: createNewContact,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllContact = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allContact = await Contact.find();
      resolve({
        status: "OK",
        message: "Get all contact success!",
        data: allContact,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getContact = (contactId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkContact = await Contact.findOne({
        _id: contactId,
      });

      if (checkContact === null) {
        resolve({
          status: "ERROR",
          message: "The contact is not defined!",
        });
      }

      const contact = await Contact.findById(contactId);

      resolve({
        status: "OK",
        message: "Get detail contact success!",
        data: contact,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateContact = (contactId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkContact = await Contact.findOne({
        _id: contactId,
      });

      if (checkContact === null) {
        resolve({
          status: "ERROR",
          message: "The contact is not defined!",
        });
      }

      const updateContact = await Contact.findByIdAndUpdate(contactId, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update the contact success!",
        data: updateContact,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteContact = (contactId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkContact = await Contact.findOne({
        _id: contactId,
      });

      if (checkContact === null) {
        resolve({
          status: "ERROR",
          message: "The contact is not defined!",
        });
      }

      await Contact.findByIdAndDelete(contactId);

      resolve({
        status: "OK",
        message: "Delete the contact success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyContact = (contactIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Contact.deleteMany({ _id: contactIds });

      resolve({
        status: "OK",
        message: "Delete many the contact success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createContact,
  getAllContact,
  getContact,
  updateContact,
  deleteContact,
  deleteManyContact,
};
