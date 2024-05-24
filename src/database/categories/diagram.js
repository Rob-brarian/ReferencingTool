import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";

//Category
const diagram = new Category("Diagrams/Images/Tables");

//Fields
const f_author = new Field(def_fields.author);

const f_year = new Field(def_fields.year);

const f_title = new Field(def_fields.title);

const f_edition = new Field(def_fields.b_edition);

const f_place = new Field(def_fields.location);

const f_publisher = new Field(def_fields.publisher);

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

//Modules
const m_diagram = new Module(
  [f_author, f_year, f_title, f_edition, f_place, f_publisher, f_url, f_accessed],
  ["+0#0", "+0#1", "i+2-3#2_._", "i+2+3#2_,_", "+2+3#3", "-0#1", "+4#4_:_", "+5#5_._", "+6#6", "+6#7"]
);

diagram.add_subcategory("Diagrams/Images/Tables", m_diagram);

export default diagram;
