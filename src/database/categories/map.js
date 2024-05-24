import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";

// Category
const map = new Category("Map");

// Fields
const f_cartographer = new Field({
  name: "Cartographer",
  type: "text",
  description: "Name of the map's cartographer or creator",
  debug: "Smith John",
});

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title or name of the map",
  debug: "World Map",
});

const f_series = new Field({
  name: "Series (optional)",
  type: "text",
  description: "Series to which the map belongs (if applicable)",
  debug: "Geography Series",
  required: false,
});

const f_number = new Field({
  name: "Sheet number (optional)",
  type: "text",
  description: "Number of the map within the series (if applicable)",
  debug: "Map #5",
  required: false,
});

const f_scale = new Field({
  name: "Scale (optional)",
  type: "text",
  description: "Scale of the map",
  debug: "1:1,000,000",
  required: false,
});

const f_place = new Field({
  name: "Place (optional)",
  type: "text",
  description: "City or location where the map was published",
  debug: "Dublin",
  required: false,
});

const f_publisher = new Field({
  name: "Publisher (optional)",
  type: "text",
  description: "Name of the publisher of the map",
  debug: "Map Publishing Co",
  required: false,
});

const f_url = new Field(def_fields.url);
const f_accessed = new Field(def_fields.accessed);

// Map Module
const m_map = new Module(
  [f_cartographer, f_year, f_title, f_series, f_number, f_scale, f_place, f_publisher, f_url, f_accessed],
  ["#0", "#1", "i#2", "_[map]._", "+3#3_,_", "+4#4_,_", "+5#5_._", "+6+7#6_:_", "+7#7_._", "+8#8", "+8#9"]
);

// Adding the module to the map category
map.add_subcategory("Map", m_map);

// Exporting the "map" category with the associated module and fields
export default map;
