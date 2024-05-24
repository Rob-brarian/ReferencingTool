// Importing necessary modules and data
import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const music = new Category("Music");

// Fields
const f_artist = new Field({
  name: "Artist",
  type: "text",
  description: "Artist's stage name",
  debug: "John Smith",
});

const f_year = new Field(def_fields.year);
f_year.set_name("Year of release");

const f_title = new Field({
  name: "Title of track",
  type: "text",
  description: "Title or name of the music piece",
  debug: "Song of Joy",
});

const f_source = new Field({
  name: "Source",
  type: "select",
  description: "Sourse where the track was taken",
  values: ["download", "CD"],
});

const f_length = new Field({
  name: "Length (optional)",
  type: "text",
  description: "Length of track in minutes and seconds. Example: 3 mins. 21 secs.",
  debug: "3 mins. 21 secs.",
  required: false,
});

const f_al_title = new Field({
  name: "Album Title (optional)",
  type: "text",
  description: "Title of the album (if applicable)",
  debug: "Melodies of Life",
  required: false,
});

const f_al_title_req = new Field({
  name: "Album Title",
  type: "text",
  description: "Title of the album",
  debug: "Melodies of Life",
});

const f_place = new Field({
  name: "Place (optional)",
  type: "text",
  description: "Place of recording or performance (if known)",
  debug: "New York City",
  required: false,
});

const f_record = new Field({
  name: "Record label",
  type: "text",
  description: "Recording label or company",
  debug: "Music Records Inc",
});

const f_url = new Field(def_fields.url);
const f_accessed = new Field(def_fields.accessed);

const f_composer = new Field({
  name: "Composer",
  type: "text",
  description: "Name of the composer of the music piece",
  parser: def_parsers.author,
  debug: "Doe Jane",
});

const f_performer = new Field({
  name: "Performer (optional)",
  type: "text",
  description: "If performer is significant put the name of the performer or artist",
  parser: def_parsers.author_reverse,
  debug: "Smith John",
  required: false,
});

const f_s_title = new Field({
  name: "Title of score",
  type: "text",
  description: "Title or name of score",
  debug: "Song of Joy",
});

const f_collection = new Field({
  name: "Collection (optional)",
  type: "text",
  description: "Name of the music collection or anthology",
  debug: "Greatest Hits",
  required: false,
});

const f_publisher = new Field(def_fields.publisher);

const f_p_range = new Field({
  name: "Page Range",
  type: "text",
  description: "Page range within a score or sheet music",
  parser: def_parsers.page,
  debug: "5-10",
});

// Track Module
const m_track = new Module(
  [f_artist, f_year, f_title, f_source, f_length, f_al_title, f_place, f_record, f_url, f_accessed],
  ["#0", "#1", "+5#2", "i-5#2", "_[_#3_]._", "+4#4", "i+5#5_._", "+6#6_:_", "+7#7_._", "+8#8", "+8#9"]
);

// Album Module
const m_album = new Module(
  [f_artist, f_year, f_al_title_req, f_source, f_place, f_record, f_url, f_accessed],
  ["#0", "#1", "i#2", "_[_#3_]._", "+4#4_:_", "#5_._", "+6#6", "+6#7"]
);

// Classical Track Module
const m_cl_track = new Module(
  [f_composer, f_year, f_title, f_source, f_length, f_al_title, f_performer, f_place, f_record, f_url, f_accessed],
  ["#0", "#1", "#2", "_[_#3_]._", "+4#4", "i+5#5_._", "+6_Performed by _#6_._", "+7#7_:_", "#8_._", "+9#9", "+9#10"]
);

// Classical Album Module
const m_cl_album = new Module(
  [f_composer, f_year, f_al_title_req, f_source, f_performer, f_place, f_record, f_url, f_accessed],
  ["#0", "#1", "i#2", "_[_#3_]._", "+4_Performed by _#4_._", "+5#5_:_", "#6_._", "+7#7", "+7#8"]
);

// Score Module
const m_score = new Module(
  [f_composer, f_year, f_s_title, f_collection, f_place, f_publisher, f_p_range, f_url, f_accessed],
  ["#0", "#1", "+3#2", "i-3#2", "_[score]._", "+3_In:_", "i+3#3_._", "+4#4_:_", "#5_,_", "#6_._", "+7#7", "+7#8"]
);

// Adding the modules to the music category
music.add_subcategory("Contemporary Track", m_track);
music.add_subcategory("Contemporary Album", m_album);
music.add_subcategory("Classical Track", m_cl_track);
music.add_subcategory("Classical Album", m_cl_album);
music.add_subcategory("Score", m_score);

// Exporting the "music" category with the associated modules and fields
export default music;
