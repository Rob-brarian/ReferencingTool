import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const official = new Category("Official Publication");

// Fields
const f_act_title = new Field({
  name: "Title of the act",
  type: "text",
  description: "Title of the act, including year",
  debug: "Example Act Title",
});

const f_place = new Field({
  name: "Place",
  type: "text",
  description: "Place of publication",
  debug: "City, Country",
});

const f_publisher = new Field({
  name: "Publisher",
  type: "text",
  description: "Publisher's name",
  debug: "Publisher Co",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

const f_si_title = new Field({
  name: "SI Title",
  type: "text",
  description: "Title of the SI, including year",
  debug: "Example SI Title",
});

const f_si = new Field({
  name: "Number and Year",
  type: "text",
  description: "Number and year of SI divided by forward slash. Example: 32/2018",
  debug: "32/2018",
});

const f_author = new Field({
  name: "Author",
  type: "text",
  description: "Author of the official document",
  debug: "Counsil of the EU",
});

const f_year = new Field(def_fields.year);

const f_eu_title = new Field({
  name: "EU Title",
  type: "text",
  description: "Full title including the type of document",
  debug: "EU Document Title",
});

const f_name = new Field({
  name: "Name",
  type: "text",
  description: "Name of the official publication",
  debug: "Official Gazette",
});

const f_issue = new Field({
  name: "Issue",
  type: "text",
  description: "Issue number of the official publication",
  debug: "Issue #123",
});

const f_page = new Field({
  name: "Page",
  type: "text",
  description: "Page number(s) of the official document",
  parser: def_parsers.page,
  debug: "23-44",
});

const f_doc_ref = new Field({
  name: "Document Reference (optional)",
  type: "text",
  description: "Document reference (if available)",
  debug: "1245",
  required: false,
});

const f_tr_author = new Field({
  name: "Treaty Author",
  type: "text",
  description: "Author of the treaty",
  debug: "Jane Smith",
});

const f_tr_title = new Field({
  name: "Treaty Title",
  type: "text",
  description: "Title of the treaty",
  debug: "Treaty Title",
});

const f_identifiers = new Field({
  name: "Identifiers (optional)",
  type: "text",
  description: "Identifiers or codes associated with treaty",
  debug: "324",
  required: false,
});

const f_tr_date = new Field({
  name: "Treaty Date (optional)",
  type: "date",
  description: "Date when treaty was signed (if available)",
  parser: def_parsers.date_long,
  debug: "2023-08-15",
  required: false,
});

// Act Module
const m_act = new Module(
  [f_act_title, f_place, f_publisher, f_url, f_accessed],
  ["i#0_._", "#1_:_", "#2_._", "+3#3", "+3#4"]
);

// Statutory Module
const m_statutory = new Module(
  [f_si_title, f_si, f_place, f_publisher, f_url, f_accessed],
  ["i#0_,_", "_SI. _#1_._", "#2_:_", "+3#3_._", "+4#4", "+4#5"]
);

// EU Module
const m_eu = new Module(
  [f_author, f_year, f_eu_title, f_name, f_issue, f_page, f_doc_ref, f_url, f_accessed],
  ["#0", "#1", "#2_._", "#3_,_", "#4_,_", "#5_._", "+6_(_#6_)._", "+7#7", "+7#8"]
);

// Treaty Module
const m_treaty = new Module(
  [f_tr_author, f_year, f_tr_title, f_identifiers, f_tr_date, f_url, f_accessed],
  ["#0", "#1", "i#2_._", "+3_(_#3_)_", "+4#4_._", "+5#5", "+5#6"]
);

// Adding the modules to the official category
official.add_subcategory("Act of the Oireachtas", m_act);
official.add_subcategory("Statutory Instrument", m_statutory);
official.add_subcategory("EU decision/directive/regulation", m_eu);
official.add_subcategory("Treaty", m_treaty);

// Exporting the "official" category with the associated modules and fields
export default official;
