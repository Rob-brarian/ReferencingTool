import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const lecture = new Category("Lecture/Seminar/Class Handout");

// Fields
const f_lecturer = new Field(def_fields.author);
f_lecturer.set_name("Lecturer");

const f_year = new Field(def_fields.year);
f_year.set_description("Year when the lecture was presented");

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title or short description of the lecture/seminar/class handout",
  debug: "Introduction to Artificial Intelligence",
});

const f_m_title = new Field({
  name: "Module Title and code",
  type: "text",
  description: "Title of the module or course and code",
  debug: "CS101",
});

const f_institut = new Field({
  name: "Institute",
  type: "text",
  description: "Name of the institute or university where the lecture was delivered",
  debug: "XYZ University",
});

const f_date = new Field({
  name: "Date (optional)",
  type: "date",
  description: "Date of when the lecture",
  parser: def_parsers.date_long,
  debug: "2023-08-01",
  required: false,
});

const f_type = new Field({
  name: "Type of lecture",
  type: "select",
  description: "Type of lecture",
  parser: (data) => "[" + data + "].",
  values: ["lecture", "seminar", "class handout"],
});
const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

// Lecture Module
const m_lecture = new Module(
  [f_lecturer, f_year, f_title, f_type, f_m_title, f_institut, f_date, f_url, f_accessed],
  ["#0", "#1", "i#2", "#3", "#4_,_", "+6#5_,_", "-6#5_._", "+6#6_._", "+7#7", "+7#8"]
);

// Adding the module to the lectures category
lecture.add_subcategory("Lecture", m_lecture);

// Exporting the "lectures" category with the associated module and fields
export default lecture;
