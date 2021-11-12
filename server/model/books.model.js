const mongoose = require("mongoose");
const UserManager = require("../model/user.model");
const Schema = mongoose.Schema;

const AuthorSchema = new mongoose.Schema(
  {
    firstName: { type: String,
      required: [true, "First name is required"] },
    lastName: { type: String,
      required: [true, "Last name is required"] },
    bio: { type: String },
    wiki: { type: String },
    openLibraryDumpData:{ type: String },
    apiKey:{ type: String }
  },
  { timestamps: true }
);
module.exports.AuthorModel = mongoose.model("AuthorManager", AuthorSchema);

const BooksSchema = new mongoose.Schema(
  {
    description: {
      type: String
    },
    title: {
      type: String,
      required: [true, "Title is required"] 
    },
    subjects: [{ type: String }],
    authors: [
      {
        type: Schema.Types.ObjectId,
        ref: mongoose.model("AuthorManager", AuthorSchema),
      },
    ],
    coversImg: { type: String },
    ISBN: { type: String },
    publish_date: { type: Date },
    number_of_pages: { type: Number },
    languages: [{ type: String }],
    publisher: { type: String },
    number_of_Copies: { type: Number },
    Borrowed_by: [
      {
        type: Schema.Types.ObjectId,
        ref: UserManager,
      },
      { type: Date }
    ],
    Hold_by: [
      {
        type: Schema.Types.ObjectId,
        ref: UserManager,
      },
      { type: Date }
    ],
  },
  { timestamps: true }
);
module.exports.BookModel = mongoose.model("BookManager", BooksSchema);
