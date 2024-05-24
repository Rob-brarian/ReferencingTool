import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const newspaper = new Category("Newspaper");

// Fields
const f_journalist = new Field({
  name: "Journalist",
  type: "text",
  description: def_fields.author.description,
  parser: def_parsers.author,
  debug: "Doe John",
});

const f_year = new Field(def_fields.year);

const f_headline = new Field({
  name: "Headline",
  type: "text",
  description: "Headline of the newspaper article",
  debug: "Breaking News: Important Event",
});

const f_name = new Field({
  name: "Newspaper title",
  type: "text",
  description: "Title of the newspaper or publication",
  debug: "Daily News",
});

const f_date = new Field({
  name: "Date",
  type: "date",
  description: "Day and month when the newspaper article was published",
  parser: def_parsers.date_long,
  debug: "2023-08-10",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

const f_page = new Field({
  name: "Page",
  type: "text",
  description: "Page number(s) of the article in the newspaper",
  parser: def_parsers.page,
  debug: "12-20",
});

// Online Module
const m_online = new Module(
  [f_journalist, f_year, f_headline, f_name, f_date, f_url, f_accessed],
  ["#0", "#1", "#2_._", "i#3_,_", "#4_._", "+5#5", "+5#6"]
);

// Print Module
const m_print = new Module(
  [f_journalist, f_year, f_headline, f_name, f_date, f_page],
  ["#0", "#1", "#2_._", "i#3_,_", "#4_._", "#5_._"]
);

// Adding the modules to the newspaper category
newspaper.add_subcategory("Online", m_online);
newspaper.add_subcategory("Print", m_print);

// Exporting the "newspaper" category with the associated modules and fields
export default newspaper;
