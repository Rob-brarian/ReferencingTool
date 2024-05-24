//List of default fields that can be used in many different reference categories
//Use it to save time and reduce copy-pasting
import def_parsers from "./default_parsers";

const def_fields = {};

//Author
def_fields.author = {
  name: "Author",
  description:
    "For individual authors, use Surname First Name(s). If multiple authors, separate with commas. " +
    "Example: Smith John, O'Connell Daniel. " +
    "To preserve company names, enclose them in quotation marks. " +
    'Example: "ABC Company"',
  type: "text",
  parser: def_parsers.author,
  debug: "Smith John, O'Connell Daniel",
};

//Default year field
def_fields.year = {
  name: "Year (optional)",
  description: "Year of publication (if known)",
  type: "text",
  parser: def_parsers.year,
  debug: "2023",
  required: false,
};

//Title
def_fields.title = {
  name: "Title",
  description: "Title (and subtitle if applicable)",
  type: "text",
  debug: "My Cool Work",
};

//Default location
def_fields.location = {
  name: "Place of publication (optional)",
  type: "text",
  description: "Place of publication (if known)",
  debug: "Cahersiveen",
  required: false,
};

//Publisher
def_fields.publisher = {
  name: "Publisher",
  type: "text",
  description: "Publisher",
  debug: "Fox Books",
};
//Url
def_fields.url = {
  name: "Web address (optional)",
  description: "Web address",
  type: "text",
  parser: def_parsers.url,
  debug: "www.fox.com",
  required: false,
};

//Accessed
def_fields.accessed = {
  name: "Accessed (optional)",
  description: "The date you accessed the resource, or leave the field empty to use today's date",
  type: "date",
  parser: def_parsers.accessed,
  required: false,
};

//Book edition
def_fields.b_edition = {
  name: "Edition (optional)",
  type: "text",
  parser: (value) => (value.trim() ? value.trim() + " edition." : ""),
  description: "Edition (only if not the first edition). Example: 2nd",
  debug: "2nd",
  required: false,
};

//Page range
def_fields.b_page = {
  name: "Page number/range",
  type: "text",
  parser: def_parsers.page,
  description: "Page number/range. Example: 46 or 20-50",
  debug: "13-50",
};

export default def_fields;
