// Importing necessary classes and utilities
import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";

// Category
const web = new Category("Website");

// Fields
// const f_p_body = new Field({
//   name: "Professional Body",
//   type: "text",
//   description: "Company, Organisation or professional body",
//   debug: "Fox Corp",
// });

const f_author = new Field(def_fields.author);

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title of the web page",
  debug: "Introduction to Web Design",
});

const f_place = new Field({
  name: "Place (optional)",
  type: "text",
  description: "Place of publication (if known)",
  debug: "Dublin",
  required: false,
});

const f_publisher = new Field({
  name: "Publisher (optional)",
  type: "text",
  description: "Publisher or organization (if known)",
  debug: "ABC Publishing",
  required: false,
});

const f_url = new Field(def_fields.url);
f_url.set_name("Web adress");
f_url.set_required(true);

const f_accessed = new Field(def_fields.accessed);

// Modules
// const m_organisation = new Module(
//   [f_p_body, f_year, f_title, f_place, f_publisher, f_url, f_accessed],
//   ["#0", "#1", "i#2_._", "+3#3_:_", "+4#4_._", "#5", "#6"]
// );

const m_personal = new Module(
  [f_author, f_year, f_title, f_place, f_publisher, f_url, f_accessed],
  ["#0", "#1", "i#2_._", "+3#3_:_", "+4#4_._", "#5", "#6"]
);

// Adding modules to the web category
//web.add_subcategory("Organisation", m_organisation);
web.add_subcategory("Website", m_personal);

// Exporting the "web" category with the associated modules and fields
export default web;
