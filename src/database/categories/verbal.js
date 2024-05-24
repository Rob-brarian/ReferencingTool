// Importing necessary classes and utilities
import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const verbal = new Category("Verbal Communication");

// Fields
const f_speaker = new Field(def_fields.author);
f_speaker.set_name("Speaker");

const f_year = new Field(def_fields.year);
f_year.set_description("Year of the verbal communication");

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title or topic of the speech",
  debug: "Public Speaking Tips",
});

const f_place = new Field({
  name: "Place",
  type: "text",
  description: "Place where speech was delivered",
  debug: "Conference Hall A",
});

const f_date = new Field({
  name: "Date",
  type: "date",
  description: "Date of the verbal communication",
  parser: def_parsers.date_long,
  debug: "2023-08-15",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

const f_caller = new Field(def_fields.author);
f_caller.set_name("Caller");

const f_description = new Field({
  name: "Description",
  type: "text",
  description: "Short description of the telephone call",
  debug: "Key points from the speech",
});

const f_recipient = new Field(def_fields.author);
f_recipient.set_parameters({
  name: "Recipient",
  parser: def_parsers.author_reverse,
});

// Modules
const m_speech = new Module(
  [f_speaker, f_year, f_title, f_place, f_date, f_url, f_accessed],
  ["#0", "#1", "i#2", "_[speech]._", "#3_,_", "#4_._", "+5#5", "+5#6"]
);

const m_telephone = new Module(
  [f_caller, f_year, f_description, f_recipient, f_date],
  ["#0", "#1", "i#2", "_[telephone call]._", "_Conversation with _#3_,_", "#4_._"]
);

// Adding modules to the verbal category
verbal.add_subcategory("Speech", m_speech);
verbal.add_subcategory("Telephone/Skype/Conference/Video call", m_telephone);

// Exporting the "verbal" category with the associated modules and fields
export default verbal;
