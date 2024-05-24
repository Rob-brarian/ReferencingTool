import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const life = new Category("Life performance");

// Fields
const f_artist = new Field(def_fields.author);
f_artist.set_name("Artist's name or stage name");
f_artist.set_description(
  "Artist(s) Surname and First Name(s). If multiple artists, separate with commas. " +
    "Example: Smith John, O'Connell Daniel. " +
    "If performer uses a stage name, enclose it in quotation marks. " +
    'Example: "The Machine"'
);

const f_year = new Field(def_fields.year);
f_year.set_parameters({
  description: "Year of performance",
});

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title or short description of performance",
  debug: "Concert Performance",
});

const f_performed = new Field({
  name: "Performed by (optional)",
  type: "text",
  description: "For dance and dramatic perfomances put the name of the performer",
  debug: "Smith John",
  required: false,
});

const f_place = new Field({
  name: "Place",
  type: "text",
  description: "Place of performance",
  debug: "New York",
});

const f_venue = new Field({
  name: "Venue",
  type: "text",
  description: "Venue of the performance",
  debug: "Madison Square Garden",
});

const f_date = new Field({
  name: "Date",
  type: "date",
  description: "Date of the performance",
  parser: def_parsers.date_long,
  debug: "2023-08-15",
});

// Module
const m_life = new Module(
  [f_artist, f_year, f_title, f_performed, f_place, f_venue, f_date],
  ["#0", "#1", "i#2", "_[live performance]._", "+3_Performed by _#3_._", "#4_:_", "#5_,_", "#6_._"]
);

// Adding the module to the life category
life.add_subcategory("Life performance", m_life);

// Exporting the "life" category with the associated module and fields
export default life;
