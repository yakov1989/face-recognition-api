const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "720b4c71d4bf448093cf867ba2c33891",
});

//hiding the api key using call from the backend
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with api!"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((er) => res.status(400).json("Unable to get entries!"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
