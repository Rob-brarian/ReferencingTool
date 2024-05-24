import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

// Category
const social = new Category("Social media");

// Fields
const f_contributor = new Field({
  name: "Contributor",
  type: "text",
  description: "Name of the contributor or creator",
  debug: "Jane Doe",
});

const f_year = new Field(def_fields.year);

const f_title = new Field({
  name: "Title",
  type: "text",
  description: "Title or short desctiption of post or content",
  debug: "Interesting Post",
});

const f_type = new Field({
  name: "Type",
  type: "select",
  description: "Type of post",
  parser: (data) => "[" + data + "].",
  values: ["blog", "vlog", "podcast", "vidcast", "vodcast", "Twitter", "Facebook"],
});

const f_v_type = new Field({
  name: "Type",
  type: "select",
  description: "Type of content",
  parser: (data) => "[" + data + "].",
  values: ["image", "video"],
});

const f_date = new Field({
  name: "Date",
  type: "date",
  description: "Date of the social media post or content",
  parser: def_parsers.date_long,
  debug: "2023-08-20",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

// Social Module
const m_social = new Module(
  [f_contributor, f_year, f_title, f_type, f_date, f_url, f_accessed],
  ["#0", "#1", "i#2", "#3", "#4_._", "+5#5", "+5#6"]
);

// Video Module
const m_video = new Module(
  [f_contributor, f_year, f_title, f_v_type, f_url, f_accessed],
  ["#0", "#1", "i#2", "#3", "+4#4", "+4#5"]
);

// Adding the modules to the social category
social.add_subcategory("Social media", m_social);
social.add_subcategory("Video or Image service", m_video);

// Exporting the "social" category with the associated modules and fields
export default social;
