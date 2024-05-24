import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

//Correspondence
const correspondence = new Category("Correspondence");

//Fields
const f_sender = new Field(def_fields.author);
f_sender.set_name("Sender");

const f_year = new Field(def_fields.year);
f_year.set_description("Year the letter was sent");

const f_subject = new Field({
  name: "Subject line",
  type: "text",
  description: "Subject line or short description, if more appropriate",
  debug: "Hi, how are you?",
});

const f_sent_to = new Field(def_fields.author);
f_sent_to.set_parameters({
  name: "Sent to",
  parser: def_parsers.author_reverse,
});

const f_date = new Field({
  name: "Day and month",
  type: "date",
  description: "Day and month the letter was sent",
  parser: def_parsers.date_long,
});

const f_place = new Field(def_fields.location);
f_place.set_parameters({
  name: "Location of collection (optional)",
  type: "text",
  description: "If a letter is in a collection put location of collection",
  debug: "Cahersiveen",
  required: false,
});

const f_publisher = new Field(def_fields.publisher);
f_publisher.set_parameters({
  name: "Publisher (optional)",
  description: "Name of the collection (if applicable) or publisher",
  required: false,
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

//Modules
const m_email = new Module(
  [f_sender, f_year, f_subject, f_sent_to, f_date],
  ["#0", "#1", "i#2", "_[email]._", "_Sent to _#3_,_", "#4_._"]
);

const m_letter = new Module(
  [f_sender, f_year, f_subject, f_sent_to, f_date, f_place, f_publisher, f_url, f_accessed],
  ["#0", "#1", "i#2", "_[letter]._", "_Sent to _#3_,_", "#4_._", "+5+6#5_:_", "+6#6_._", "+7#7", "+7#8"]
);

correspondence.add_subcategory("Email", m_email);
correspondence.add_subcategory("Letter", m_letter);

export default correspondence;
