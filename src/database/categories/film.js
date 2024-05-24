import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

//Category
const film = new Category("Film");

// Fields
const f_director = new Field(def_fields.author);
f_director.set_name("Director(s)");
f_director.set_parser((value) => {
  if (value.split(",").length > 1) return def_parsers.author(value) + " (dirs.)";
  else return def_parsers.author(value) + " (dir.)";
});

const f_year = new Field(def_fields.year);
f_year.set_description("Year of release");

const f_title = new Field(def_fields.title);

const f_type = new Field({
  name: "Format",
  type: "text",
  description: "The format on which you viewed the film/series. Example: DVD or download etc.)",
  debug: "DVD",
});

const f_location = new Field(def_fields.location);
f_location.set_parameters({
  name: "Location (optional)",
  description: "Location of distributor",
  required: false,
});

const f_distributor = new Field({
  name: "Distributor (optional)",
  type: "text",
  description: "Name of the film's distributor (if known)",
  debug: "Fox Film",
  required: false,
});

const f_url = new Field(def_fields.url);
f_url.set_name("Web address (optional)");
f_url.set_required(false);

const f_accessed = new Field(def_fields.accessed);

const f_s_type = new Field({
  name: "Television/Radio",
  type: "select",
  description: "Radio or television",
  values: ["television", "radio"],
});

const f_channel = new Field({
  name: "Channel",
  type: "text",
  description: "Broadcast channel",
  debug: "Fox Film",
});

const f_channel_ser = new Field({
  name: "Channel (optional)",
  type: "text",
  description: "Broadcast channel (if available)",
  debug: "Fox Film",
  required: false,
});

const f_date = new Field({
  name: "Date",
  type: "date",
  description: "Day, month, and year of transmission",
  parser: def_parsers.date_full,
});

const f_time = new Field({
  name: "Time (optional)",
  type: "time",
  description: "Time of transmission (if relevant)",
  required: false,
});

const f_season = new Field({
  name: "Season (optional)",
  type: "text",
  description: "Season by the number (if applicable)",
  debug: "3",
  required: false,
});

const f_episode = new Field({
  name: "Episode (optional)",
  type: "text",
  description: "Episode by the number (if applicable)",
  debug: "6",
  required: false,
});

//Modules
const m_film = new Module(
  [f_director, f_year, f_title, f_type, f_location, f_distributor, f_url, f_accessed],
  ["#0", "#1", "i#2", "_[_#3_]._", "+4+5#4_:_", "+5#5_._", "+6#6", "+6#7"]
);

const m_radio_programme = new Module(
  [f_title, f_year, f_s_type, f_channel, f_date, f_time],
  ["i#0", "#1", "_[_#2_]._", "#3_._", "+5#4_,_", "-5#4_._", "+5#5_._"]
);

const m_radio_series = new Module(
  [f_title, f_year, f_type, f_channel_ser, f_season, f_episode, f_url, f_accessed],
  [
    "i#0",
    "#1",
    "_[_#2_]._",
    "+4+5+3#3_,_",
    "-4+5+3#3_,_",
    "+4-5+3#3_,_",
    "-4-5+3#3_._",
    "+4+5_Season _#4_,_",
    "+4-5_Season _#4_._",
    "+5_episode _#5_._",
    "+6#6",
    "+6#7",
  ]
);

const m_recorded = new Module(
  [f_title, f_year, f_s_type, f_season, f_episode, f_channel, f_date, f_time, f_url, f_accessed],
  [
    "i#0",
    "#1",
    "_[_#2_]._",
    "+3+4_Season _#3_,_",
    "+3-4_Season _#3_._",
    "+4_episode _#4_._",
    "#5_._",
    "+7#6_,_",
    "-7#6_._",
    "+7#7_._",
    "+8#8",
    "+8#9",
  ]
);

film.add_subcategory("Film", m_film);
film.add_subcategory("Radio or television programme", m_radio_programme);
film.add_subcategory("Radio or television series", m_radio_series);
film.add_subcategory("Recorded programme in an online archive", m_recorded);

export default film;
