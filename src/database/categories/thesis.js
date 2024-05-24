import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";

// Category
const thesis = new Category("Thesis/Dissertation");

// Fields
const f_author = new Field(def_fields.author);

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title of the thesis/dissertation",
  debug: "Exploring a Novel Idea",
});

const f_qualification = new Field({
  name: "Qualification",
  type: "text",
  description: "Qualification level. Example: PhD",
  debug: "PhD",
});

const f_institution = new Field({
  name: "Institution",
  type: "text",
  description: "Institution where the thesis was submitted",
  debug: "University of XYZ",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

// Thesis Module
const m_thesis = new Module(
  [f_author, f_year, f_title, f_qualification, f_institution, f_url, f_accessed],
  ["#0", "#1", "i#2_._", "#3_._", "#4_._", "+5#5", "+5#6"]
);

// Adding the module to the thesis category
thesis.add_subcategory("Thesis/Dissertation", m_thesis);

// Exporting the "thesis" category with the associated module and fields
export default thesis;
