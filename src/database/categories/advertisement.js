import Category from "../utilites/Category";
import Module from "../utilites/Module";
import Field from "../utilites/Field";

import def_fields from "../utilites/default_fields";
import def_parsers from "../utilites/default_parsers";

//Category
const advertisement = new Category("Advertisement");

//Fields
const f_advertiser = new Field({ name: "Advertiser", type: "text", description: "Advertiser", debug: "Fox Corp" });

const f_year = new Field(def_fields.year);

const f_desc = new Field({
  name: "Short description",
  type: "text",
  description: "Headline of the advertisement or a short description if more appropriate",
  debug: "How to create Word Addon in 5 steps",
});

const f_url = new Field(def_fields.url);

const f_accessed = new Field(def_fields.accessed);

const f_pub_title = new Field({
  name: "Title of publication",
  type: "text",
  description: "Title of the publication where you found the advert",
  debug: "Programming and development",
});

const f_pub_date = new Field({
  name: "Day and month (optional)",
  type: "date",
  parser: def_parsers.date_long,
  description: "Day and month of publication (if given)",
  required: false,
});

const f_vol_num = new Field({
  name: "Volume number (optional)",
  type: "text",
  description: "Valume number (only if there is no part/issue/month/season)",
  debug: "36",
  required: false,
});

const f_issue = new Field({
  name: "Part/issue/month/season (optional)",
  type: "text",
  parser: (value) => (value.trim() ? "(" + value.trim() + ")" : ""),
  description: "If exists, put part/issue/month/season",
  debug: "2nd issue",
  required: false,
});

const f_page_num = new Field({ name: "Page number", type: "text", description: "Page number", debug: "89" });

const f_channel = new Field({
  name: "Broadcast channel",
  type: "text",
  description: "Broadcast chanell where you saw/heard the advertisement",
  debug: "Shy Fox Channel",
});

const f_ch_ad_date = new Field({
  name: "Day and month of broadcast",
  type: "date",
  parser: def_parsers.date_long,
  description: "Day and month of broadcast",
});

const f_ch_ad_time = new Field({
  name: "Time of broadcast (optional)",
  type: "time",
  description: "Time of broadcast (if relevant)",
  required: false,
});

//Modules
const m_online = new Module(
  [f_advertiser, f_year, f_desc, f_url, f_accessed],
  ["#0", "#1", "i#2", "_[advertisement]._", "+3#3", "+3#4"]
);

const m_print = new Module(
  [f_advertiser, f_year, f_desc, f_pub_title, f_pub_date, f_vol_num, f_issue, f_page_num],
  ["#0", "#1", "#2", "_[advertisement]._", "i#3_,_", "+4#4", "-6+5#5_,_", "+5+6#5", "+6#6", "+7_p._#7_._"]
);

const m_broadcast = new Module(
  [f_advertiser, f_year, f_desc, f_channel, f_ch_ad_date, f_ch_ad_time],
  ["#0", "#1", "i#2", "_[advertisement]._", "#3_,_", "+5#4_,_", "-5#4_._", "+5#5_._"]
);

advertisement.add_subcategory("Online", m_online);
advertisement.add_subcategory("Print", m_print);
advertisement.add_subcategory("Broadcast", m_broadcast);

export default advertisement;
