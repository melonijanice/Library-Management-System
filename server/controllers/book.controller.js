const BookManager = require("../model/books.model");

module.exports.createBook = (request, response) => {
  console.log(request.body)

  BookManager.BookModel.create(request.body)
    .then((book) => response.json(book))
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.getBooks = (request, response) => {
  BookManager.BookModel.find({}).populate('authors').populate('Borrowed_by').populate('Hold_by')
    .then((books) => response.json(books))
    .catch((err) => response.json(err));
};

module.exports.getBooksforAuthor = (request, response) => {
  BookManager.BookModel.find({ authors: request.params.id })
    .then((books) => response.json(books))
    .catch((err) => response.json(err));
};


module.exports.getUserBorrowedBooks = (request, response) => {
  BookManager.BookModel.find({ Borrowed_by: request.params.id })
    .then((books) => response.json(books))
    .catch((err) => response.json(err));
};

module.exports.getUserHeldBooks = (request, response) => {
  BookManager.BookModel.find({ Hold_by: request.params.id })
    .then((books) => response.json(books))
    .catch((err) => response.json(err));
};


module.exports.findBook = (request, response) => {
  BookManager.BookModel.findOne({ _id: request.params.id }).populate('authors').populate('Borrowed_by').populate('Hold_by')
    .then((book) => {
      response.json(book)
      
    })
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.update = (request, response) => {

  BookManager.BookModel.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true } //return updated objects and run the validators that were used for update
  )

    .then((updatedBook) => 
    
    {
     
      response.json(updatedBook)})
    .catch((err) => {
      response.status(400).json(err);
      console.log("Error adding to DB at API");
      response.json(err);
    });
};

module.exports.delete = (request, response) => {
  BookManager.BookModel.findByIdAndDelete(request.params.id)
    .then((deletedBook) => response.json(deletedBook))
    .catch((err) => response.json(err));
};