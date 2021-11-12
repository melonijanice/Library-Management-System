const AuthorManager = require("../model/books.model");

module.exports.createAuthor = (request, response) => {
  const {
    firstName,
    lastName,
    bio,
    wiki,
    openLibraryDumpData,
    apiKey
  } = request.body;
  console.log(request.body)
  AuthorManager.AuthorModel.create({
    firstName,
    lastName,
    bio,
    wiki,
    openLibraryDumpData,
    apiKey
  })
    .then((author) => response.json(author))
    .catch((err) => {
      response.status(400).json(err);
    });
};


module.exports.getAuthors = (request, response) => {
  AuthorManager.AuthorModel.find({})
    .then((authors) => response.json(authors))
    .catch((err) => response.json(err));
};

module.exports.getAuthor = (request, response) => {
  AuthorManager.AuthorModel.findOne({ _id: request.params.id })
    .then((author) => response.json(author))
    .catch((err) => response.json(err));
};

module.exports.update = (request, response) => {
  AuthorManager.AuthorModel.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true } //return updated objects and run the validators that were used for update
  )
    .then((updatedAuthor) => response.json(updatedAuthor))
    .catch((err) => {
      response.status(400).json(err);
      console.log("Error adding to DB at API");
      response.json(err);
    });
};

module.exports.delete = (request, response) => {
  AuthorManager.AuthorModel.findByIdAndDelete(request.params.id)
    .then((deletedAuthor) => response.json(deletedAuthor))
    .catch((err) => response.json(err));
};