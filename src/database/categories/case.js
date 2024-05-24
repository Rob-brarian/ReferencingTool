import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

//Category
const case_study = new Category("Case study or report");

//Fields
const f_author = new Field(def_fields.author);

const f_author_ed = new Field(def_fields.author);
f_author_ed.set_parser(def_parsers.author_editor);

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title of book",
  type: "text",
  description: "Title (and subtitle if applicable) of study",
  debug: "My Cool Report",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

const f_publisher = new Field(def_fields.publisher);
f_publisher.set_name("Publisher (optional)");
f_publisher.set_required(false);

const f_place = new Field(def_fields.location);

//Modules
const m_case_study = new Module(
  [f_author, f_year, f_title, f_place, f_publisher, f_url, f_accessed],
  ["#0", "#1", "i#2_._", "+3+4#3_:_", "+4#4_._", "+5#5", "+5#6"]
);

const m_case_study_ed = new Module(
  [f_author_ed, f_year, f_title, f_place, f_publisher, f_url, f_accessed],
  ["#0", "#1", "i#2_._", "+3+4#3_:_", "+4#4_._", "+5#5", "+5#6"]
);

case_study.add_subcategory("Case study or report", m_case_study);
case_study.add_subcategory("Edited Case study", m_case_study_ed);

export default case_study;
