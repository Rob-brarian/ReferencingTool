import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_parsers from "../utilites/default_parsers";

// Category
const law = new Category("Law");

// Fields
const f_p_names = new Field({
  name: "Party Names",
  type: "text",
  description: "Names of the parties separated by a v. Example: Plaintiff v Defendant",
  debug: "Plaintiff v Defendant",
});

const f_year = new Field({
  name: "Year",
  type: "text",
  description: "Year when the case was heard",
  debug: "2023",
});

const f_volume = new Field({
  name: "Volume (optional)",
  type: "text",
  description: "Volume number of the law report",
  debug: "55",
  required: false,
});

const f_abbreviation = new Field({
  name: "Abbreviation",
  type: "text",
  description: "Abbreviation of the law report. Example: I.R.L.M.",
  debug: "X.Y.Z.",
});

const f_page = new Field({
  name: "Page",
  type: "text",
  description: "Page number/case number",
  debug: "112",
});

const f_court = new Field({
  name: "Court",
  type: "text",
  description: "Name of the court where the case was decided",
  debug: "Supreme Court",
});

const f_date = new Field({
  name: "Date",
  type: "date",
  description: "Date when the case was decided",
  parser: def_parsers.date_long,
  debug: "2023-07-15",
});

const f_square = new Field({
  name: "Year in Square brackets",
  type: "checkbox",
  description: "Should year to be put in square brackets - follow the style given in the Law Report",
  required: false,
});

// Case Module
const m_case = new Module(
  [f_p_names, f_year, f_volume, f_abbreviation, f_page, f_square],
  ["i#0", "+5_[_#1_]_", "-5_(_#1_)_", "+2#2", "#3", "#4_._"]
);

// Unreported Case Module
const m_unreported_case = new Module(
  [f_p_names, f_year, f_court, f_date],
  ["i#0", "_(_#1_) [unreported]_", "#2_,_", "#3_._"]
);

law.add_subcategory("Case (Law Report)", m_case);
law.add_subcategory("Unreported Case", m_unreported_case);

export default law;
