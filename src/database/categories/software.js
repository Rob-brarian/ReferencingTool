import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";

// Category
const software = new Category("Software");

// Fields
const f_developer = new Field({
  name: "Developer",
  type: "text",
  description: "Name of the software developer or company",
  debug: "TechCo",
});

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title of the software",
  debug: "Awesome Software",
});

const f_type = new Field({
  name: "Type",
  type: "select",
  description: "Type of software",
  parser: (data) => "[" + data + "].",
  values: ["app", "game", "software"],
});

const f_version = new Field({
  name: "Version (optional)",
  type: "text",
  description: "Version of software (if available)",
  debug: "3.4.2",
  required: false,
});

const f_place = new Field({
  name: "Place (optional)",
  type: "text",
  description: "Place of software publication or distribution (if available)",
  debug: "City, Country",
  required: false,
});

const f_publisher = new Field({
  name: "Publisher",
  type: "text",
  description: "Publisher's name",
  debug: "Publisher Co",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

// Software Module
const m_software = new Module(
  [f_developer, f_year, f_title, f_type, f_version, f_place, f_publisher, f_url, f_accessed],
  ["#0", "#1", "i#2", "#3", "+4_Version _#4_._", "+5#5_:_", "#6_._", "+7#7", "+7#8"]
);

// Adding the module to the software category
software.add_subcategory("Software", m_software);

// Exporting the "software" category with the associated module and fields
export default software;
