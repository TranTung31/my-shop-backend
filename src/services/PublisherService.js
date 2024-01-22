const Publisher = require("../models/PublisherModal");

const createPublisher = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, address } = data;
    try {
      const checkPublisher = await Publisher.findOne({
        name: name,
      });

      if (checkPublisher !== null) {
        resolve({
          status: "ERROR",
          message: "The publisher's name already exists!",
        });
      }

      const createNewPublisher = await Publisher.create({
        name: name,
        address: address,
      });

      if (createNewPublisher) {
        resolve({
          status: "OK",
          message: "Create publisher success!",
          data: createNewPublisher,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllPublisher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allPublisher = await Publisher.find();
      resolve({
        status: "OK",
        message: "Get all publisher success!",
        data: allPublisher,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updatePublisher = (publisherId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPublisher = await Publisher.findOne({
        _id: publisherId,
      });

      if (checkPublisher === null) {
        resolve({
          status: "ERROR",
          message: "The publisher is not defined!",
        });
      }

      const updatePublisher = await Publisher.findByIdAndUpdate(
        publisherId,
        data,
        { new: true }
      );

      resolve({
        status: "OK",
        message: "Update the publisher success!",
        data: updatePublisher,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deletePublisher = (publisherId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPublisher = await Publisher.findOne({
        _id: publisherId,
      });

      if (checkPublisher === null) {
        resolve({
          status: "ERROR",
          message: "The publisher is not defined!",
        });
      }

      await Publisher.findByIdAndDelete(publisherId);

      resolve({
        status: "OK",
        message: "Delete the publisher success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyPublisher = (publisherIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Publisher.deleteMany({ _id: publisherIds });

      resolve({
        status: "OK",
        message: "Delete many the publisher success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createPublisher,
  getAllPublisher,
  updatePublisher,
  deletePublisher,
  deleteManyPublisher,
};
