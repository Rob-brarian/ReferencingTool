import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Journal
const journal = new Category("Journal");

// Fields
const f_author = new Field(def_fields.author);

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Article title (optional)",
  type: "text",
  description: "Title of the journal article",
  debug: "The Study of Neural Networks",
  required: false,
});

const f_journal_title = new Field({
  name: "Journal title",
  type: "text",
  description: "Title of the journal",
  debug: "My Journal",
});

const f_volume = new Field({
  name: "Volume number (optional)",
  type: "text",
  description: "Volume number of the journal",
  debug: "12",
  required: false,
});

const f_issue = new Field({
  name: "Issue (optional)",
  type: "text",
  description: "If there is also a part/issue/month/season",
  debug: "123",
  required: false,
});

const f_range = new Field({
  name: "Page range",
  type: "text",
  description: "Page range of the journal article",
  parser: def_parsers.page,
  debug: "33-78",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

// Journal Module
const m_journal = new Module(
  [f_author, f_year, f_title, f_journal_title, f_volume, f_issue, f_range, f_url, f_accessed],
  ["#0", "#1", "+2#2_._", "i#3_,", "-5+4#4_,_", "+5+4#4", "+5_(_#5_)_", "#6_._", "+7#7", "+7#8"]
);

// Adding the module to the journal category
journal.add_subcategory("Journal article", m_journal);

export default journal;
