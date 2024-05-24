import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

//Category
const book = new Category("Book");

//Fields
const f_author = new Field(def_fields.author);
f_author.set_name("Author (optional)");
f_author.set_required(false);

const f_author_ed = new Field(def_fields.author);
f_author_ed.set_parser((value) => {
  if (value.split(",").length > 1) return def_parsers.author(value) + " (eds.)";
  else return def_parsers.author(value) + " (ed.)";
});

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title of book",
  type: "text",
  description: "Title (and subtitle if applicable) of book",
  debug: "My Cool Book",
});

const f_edition = new Field(def_fields.b_edition);

const f_publisher = new Field(def_fields.publisher);

const f_place = new Field(def_fields.location);

const f_ch_author = new Field(def_fields.author);
f_ch_author.set_name("Chapter author");

const f_ch_title = new Field({
  name: "Title of chapter",
  type: "text",
  description: "Title of chapter",
  debug: "First Chapter",
});

const f_ch_editor = new Field(def_fields.author);
f_ch_editor.set_name("Editor(s)");
f_ch_editor.set_parser((value) => {
  if (value.split(",").length > 1) return def_parsers.author_reverse(value) + " (eds.)";
  else return def_parsers.author_reverse(value) + " (ed.)";
});

const f_ch_page = new Field(def_fields.b_page);

const f_in_author = new Field(def_fields.author);
f_in_author.set_name("Introduction author");

const f_in_type = new Field({
  name: "Type of introduction",
  type: "select",
  description: "Introduction/Foreword/Afterword/Preface",
  values: ["Introduction", "Foreword", "Afterword", "Preface"],
});

const f_in_b_author = new Field(def_fields.author);
f_in_b_author.set_parser(def_parsers.author_reverse);

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

const f_s_version = new Field({
  name: "Version (optional)",
  type: "text",
  description: "Version of the sacret text (if applicable). Example: authorized King James version",
  debug: "authorized King James version",
  required: false,
});

const f_cl_author = new Field({
  name: "Author",
  type: "text",
  description: "Author of the text",
  debug: "Virgil",
});

const f_cl_translator = new Field(def_fields.author);
f_cl_translator.set_name("Translator's name");
f_cl_translator.set_parser(def_parsers.author_reverse);

//MODULES
const m_book = new Module(
  [f_author, f_year, f_title, f_edition, f_place, f_publisher],
  ["+0#0", "+0#1", "i+2-3#2_._", "i+2+3#2_,_", "+2+3#3", "-0#1", "+4#4_:_", "+5#5_._"]
);

const m_book_ed = new Module(
  [f_author_ed, f_year, f_title, f_edition, f_place, f_publisher],
  ["+0#0", "+0#1", "i+2-3#2_._", "i+2+3#2_,_", "+2+3#3", "-0#1", "+4#4_:_", "+5#5_._"]
);

const m_book_chapter = new Module(
  [f_ch_author, f_year, f_ch_title, f_ch_editor, f_title, f_edition, f_place, f_publisher, f_ch_page],
  ["#0", "#1", "#2_. In:_", "#3", "i+4-5#4_._", "i+4+5#4_,_", "+4+5#5", "+6#6_:_", "+7#7_,_", "#8_._"]
);

const m_intro_to_book = new Module(
  [f_in_author, f_year, f_in_type, f_in_b_author, f_title, f_edition, f_place, f_publisher],
  ["#0", "#1", "#2_. In:_", "#3", "i+4-5#4_._", "i+4+5#4_,_", "+4+5#5", "+6#6_:_", "+7#7_._"]
);

const m_e_book = new Module(
  [f_author, f_year, f_title, f_edition, f_place, f_publisher, f_url, f_accessed],
  [
    "+0#0",
    "+0#1",
    "i+2-3#2",
    "+2-3_[ebook]._",
    "i+2+3#2",
    "+2+3_[ebook], _#3",
    "-0#1",
    "+4#4_:_",
    "+5#5_._",
    "+6#6",
    "+6#7",
  ]
);

const m_e_book_ed = new Module(
  [f_author_ed, f_year, f_title, f_edition, f_place, f_publisher, f_url, f_accessed],
  [
    "+0#0",
    "+0#1",
    "i+2-3#2",
    "+2-3_[ebook]._",
    "i+2+3#2",
    "+2+3_[ebook], _#3",
    "-0#1",
    "+4#4_:_",
    "+5#5_._",
    "+6#6",
    "+6#7",
  ]
);

const m_sacred = new Module(
  [f_title, f_s_version, f_place, f_publisher],
  ["i-1#0_._", "i+1#0", "+1_[_#1_]._", "+2#2_:_", "#3_._"]
);

const m_classic = new Module(
  [f_cl_author, f_title, f_year, f_cl_translator, f_place, f_publisher],
  ["#0_,_", "i#1", "#2_._", "_Translated by _#3_._", "+4#4_:_", "+5#5_._"]
);

book.add_subcategory("Book or Booklet", m_book);
book.add_subcategory("Edited Book or Booklet", m_book_ed);
book.add_subcategory("Chapter in an edited book", m_book_chapter);
book.add_subcategory("Introduction to a book", m_intro_to_book);
book.add_subcategory("Ebook", m_e_book);
book.add_subcategory("Edited Ebook", m_e_book_ed);
book.add_subcategory("Sacred text", m_sacred);
book.add_subcategory("Classical or anchient text", m_classic);

export default book;
