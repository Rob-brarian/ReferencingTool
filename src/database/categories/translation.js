import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const translation = new Category("Translation");

// Fields
const f_author = new Field(def_fields.author);

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title of the translated work",
  debug: "The Great Novel (Translated)",
});

const f_translator = new Field(def_fields.author);
f_translator.set_parameters({
  name: "Translator",
  parser: def_parsers.author_reverse,
});

const f_place = new Field({
  name: "Place",
  type: "text",
  description: "Place of translation publication",
  debug: "City, Country",
});

const f_publisher = new Field({
  name: "Publisher",
  type: "text",
  description: "Publisher of the translation",
  debug: "Translation Publisher Co",
});

// Translation Module
const m_translation = new Module(
  [f_author, f_year, f_title, f_translator, f_place, f_publisher],
  ["#0", "#1", "i#2_._", "_Translated by _#3_._", "+4#4_:_", "#5_._"]
);

// Adding the module to the translation category
translation.add_subcategory("Translated book", m_translation);

// Exporting the "translation" category with the associated module and fields
export default translation;
