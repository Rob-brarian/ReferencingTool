//The support object Field is used in "Category" objects and contains information
//about different aspects of a field that will be shown in program
//For example: Author, Year, Title, etc.

//Default constructor
function Field(name_or_obj, type, parser) {
  if (typeof name_or_obj === "object") {
    const { name, type, parser, description, debug, values, required } = name_or_obj;
    this.name = name ? name : "";
    this.type = type ? type : "text";
    this.parser = parser ? parser : (data) => data.trim(); //doesn't work for checkbox types
    this.description = description ? description : "";
    this.debug = debug ? debug : "";
    this.values = values ? values : [""];
    this.required = required != undefined ? required : true;
  } else {
    this.name = name_or_obj;
    this.type = type;
    this.parser = parser ? parser : (data) => data.trim(); //doesn't work for checkbox types
    this.description = "";
    this.debug = "";
    this.values = [""];
    this.required = true;
    //console.log(this);
  }

  this.set_name = function (name) {
    this.name = name;
  };
  this.set_description = function (description) {
    this.description = description;
  };
  this.set_parser = function (parser) {
    this.parser = parser;
  };
  this.set_debug_text = function (text) {
    this.debug = text;
  };
  this.set_option_values = function (values) {
    this.values = values;
  };
  this.set_required = function (required) {
    this.required = required;
  };

  this.set_parameters = function (obj) {
    const { name, type, parser, description, debug, values, required } = obj;
    this.name = name ? name : this.name;
    this.type = type ? type : this.type;
    this.parser = parser ? parser : this.parser;
    this.description = description ? description : this.description;
    this.debug = debug ? debug : this.debug;
    this.values = values ? values : this.values;
    this.required = required != undefined ? required : this.required;
  };
}

export default Field;
