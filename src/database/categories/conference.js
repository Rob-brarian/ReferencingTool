import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

//Category
const conference = new Category("Conference");

//Fields
const f_author = new Field(def_fields.author);
f_author.set_name("Author");

const f_year = new Field(def_fields.year);
f_year.set_description("Year of conference");

const f_title = new Field(def_fields.title);
f_title.set_name("Title of the paper");

const f_publisher = new Field(def_fields.publisher);

const f_place = new Field(def_fields.location);

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

const f_con_editor = new Field(def_fields.author);
f_con_editor.set_name("Editor(optional)");
f_con_editor.set_parser(def_parsers.author_editor_reverse);
f_con_editor.set_required(false);

const f_con_title = new Field({
  name: "Title of the conference",
  type: "text",
  description: "Title of the conference",
  debug: "My Cool Conference",
});

const f_con_place = new Field(def_fields.location);
f_con_place.set_parameters({
  name: "Place of conference",
  description: "Place of conference",
});

const f_con_date = new Field({
  name: "Day and month of conference",
  type: "date",
  description: "Day and month of conference",
  parser: def_parsers.date_long,
});

const f_con_page = new Field(def_fields.b_page);

//Modules
const m_paper = new Module(
  [
    f_author,
    f_year,
    f_title,
    f_con_editor,
    f_con_title,
    f_con_place,
    f_con_date,
    f_place,
    f_publisher,
    f_con_page,
    f_url,
    f_accessed,
  ],
  ["#0", "#1", "#2_. In:_", "+3#3", "i#4_,_", "#5_,_", "#6_._", "+7#7_:_", "#8_,_", "#9_._", "+10#10", "+10#11"]
);

const m_poster = new Module(
  [f_author, f_year, f_title, f_con_title, f_con_place, f_con_date, f_url, f_accessed],
  ["#0", "#1", "#2_. In:_", "i#3_,_", "#5_,_", "#4_._", "+6#6", "+6#7"]
);

conference.add_subcategory("Conference paper", m_paper);
conference.add_subcategory("Conference poster or presentation", m_poster);

export default conference;
