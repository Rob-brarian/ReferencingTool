import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const patent = new Category("Standart/Patent");

// Fields
const f_author = new Field({
  name: "Author/inventor",
  description:
    "For individual authors, use Surname First Name(s). If multiple authors, separate with commas. " +
    "Example: Smith John, O'Connell Daniel. " +
    "To preserve corporate names, enclose them in quotation marks. " +
    'Example: "ABC Company"',
  type: "text",
  parser: def_parsers.author,
  debug: "John Doe",
});

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title of the patent/standart (and subtitle if applicable)",
  debug: "Innovative Patent",
});

const f_number = new Field({
  name: "Number",
  type: "text",
  description: "Number of the patent/standart",
  debug: "US1234567",
});

const f_place = new Field({
  name: "Place (optional)",
  type: "text",
  description: "Place of patent/standart issuance (if available)",
  debug: "City, Country",
  required: false,
});

const f_publisher = new Field({
  name: "Publisher (optional)",
  type: "text",
  description: "Publisher's name (if available)",
  debug: "Patent Office",
  required: false,
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

// Patent Module
const m_patent = new Module(
  [f_author, f_year, f_title, f_number, f_place, f_publisher, f_url, f_accessed],
  ["#0", "#1", "i+2#2_._", "#3_._", "+4+5#4_:_", "+5#5_._", "+6#6", "+6#7"]
);

// Adding the module to the patent category
patent.add_subcategory("Standart/Patent", m_patent);

// Exporting the "patent" category with the associated module and fields
export default patent;
