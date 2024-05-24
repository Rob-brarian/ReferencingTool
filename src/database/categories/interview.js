//TODO: finish it
import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const interview = new Category("Interview");

// Fields
const f_interviewee = new Field(def_fields.author);
f_interviewee.set_name("Inteerviewee");

const f_year = new Field(def_fields.year);

const f_interviewer = new Field(def_fields.author);
f_interviewer.set_name("Interviewed by");
f_interviewer.set_parser(def_parsers.author_reverse);

const f_programme = new Field({
  name: "Programme name",
  type: "text",
  description: "Name of the interview program or show",
  debug: "My programme",
});

const f_broadcast = new Field({
  name: "Broadcast",
  type: "text",
  description: "Broadcast channel",
  debug: "Fox channel",
});

const f_date = new Field({
  name: "Date",
  type: "date",
  description: "Date of the interview",
  parser: def_parsers.date_long,
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

const f_description = new Field({
  name: "Description",
  type: "text",
  description: "Short description of the interview",
  debug: "Short interview",
});

// Modules
const m_interview = new Module(
  [f_interviewee, f_year, f_interviewer, f_programme, f_broadcast, f_date, f_url, f_accessed],
  ["#0", "#1", "_Interviewed by _#2_._", "i#3_._", "#4_,_", "#5_._", "+6#6", "+6#7"]
);

const m_personal_interview = new Module(
  [f_interviewee, f_year, f_description, f_interviewer, f_date, f_url, f_accessed],
  ["#0", "#1", "i#2_._", "_Interviewed by _#3_,_", "#4_._", "+5#5", "+5#6"]
);

// Add modules to the interviewCategory
interview.add_subcategory("Interview on radio or television", m_interview);
interview.add_subcategory("Personal interview", m_personal_interview);

export default interview;
