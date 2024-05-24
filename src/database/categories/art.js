import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

//Category
const art = new Category("Art");

//Fields
const f_artist = new Field(def_fields.author);
f_artist.set_name("Artist");

const f_year = new Field(def_fields.year);
f_year.set_name("Year of composition");
f_year.set_description("Year of composition. If the exact date is not knows use c. for circa e.g. (c.1986)");

const f_title = new Field({
  name: "Title of artwork",
  type: "text",
  description: "Title of composition, or a description if more appropriate",
  debug: "The Fox Hunt",
});

const f_format = new Field({
  name: "Format (optional)",
  type: "text",
  description: "If you viewed the artwork offline, provide information about the format. For example: oil on canvas",
  debug: "oil on canvas",
  required: false,
});

const f_location = new Field({
  name: "Location (optional)",
  type: "text",
  description: "Location if known",
  debug: "Cahersiveen",
  required: false,
});

const f_gallery = new Field({
  name: "Gallery/collection/museum name",
  type: "text",
  description: "Name of gallery/collection/museum",
  debug: "Green Gallery",
});

const f_url = new Field(def_fields.url);
f_url.set_name("Web address (optional)");
f_url.set_required(false);

const f_accessed = new Field(def_fields.accessed);
f_accessed.set_name("Accessed (optional)");
f_accessed.set_required(false);

const f_b_year = new Field(def_fields.year);
f_b_year.set_name("Year of book publication");

const f_b_editor = new Field(def_fields.author);
f_b_editor.set_name("Book editor(s)");
f_b_editor.set_parser((value) => {
  if (value.split(",").length > 1) return def_parsers.author_reverse(value) + " (eds.)";
  else return def_parsers.author_reverse(value) + " (ed.)";
});

const f_b_title = new Field({
  name: "Title of book",
  type: "text",
  description: "Title (and subtitle if applicable) of book",
  debug: "Pictures and Arts",
});

const f_b_edition = new Field(def_fields.b_edition);

const f_b_location = new Field(def_fields.location);

const f_b_publisher = new Field(def_fields.publisher);

const f_b_page = new Field(def_fields.b_page);

//Modules]
const m_art = new Module(
  [f_artist, f_year, f_title, f_format, f_location, f_gallery, f_url, f_accessed],
  ["#0", "#1", "i-3#2_._", "i+3#2", "+3_[_#3_]._", "+4#4_:_", "#5_._", "+6#6", "+6#7"]
);

const m_art_book = new Module(
  [
    f_artist,
    f_year,
    f_title,
    f_b_editor,
    f_b_year,
    f_b_title,
    f_b_edition,
    f_b_location,
    f_b_publisher,
    f_b_page,
    f_url,
    f_accessed,
  ],
  [
    "#0",
    "#1",
    "#2_. In:_",
    "#3",
    "#4",
    "i+5-6#5_._",
    "i+5+6#5_,_",
    "+5+6#6",
    "+7#7_:_",
    "+8#8_,_",
    "#9_._",
    "+10#10",
    "+10#11",
  ]
);

art.add_subcategory("Art", m_art);
art.add_subcategory("Art in books", m_art_book);

export default art;
