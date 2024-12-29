import { information } from "../models/models.js";

export const getInformation = (req, res) => {
  information.find().then((result) => {
    res.send(result);
  });
};

export const createInformation = (req, res) => {
  information.create(req.body).then((result) => {
    res.send(result);
  });
};

export const updateInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await information.findByIdAndUpdate(id, req.body);
    if (update) {
      res.status(200).send(update);
    } else {
      res.status(404).send("No data found");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await information.findByIdAndDelete(id);
    if (del) {
      res.status(200).send("deleted successfully");
    } else {
      res.status(404).send("No data found");
    }
  } catch (err) {
    console.log(err);
  }
};
