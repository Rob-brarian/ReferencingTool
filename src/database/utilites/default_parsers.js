//List of default parsers that can be used in many different fields
//Use it to save time and reduce copy-pasting

const def_parsers = {};

//default parser for "year" values
def_parsers.year = (value) => (value.trim() ? "(" + value.trim() + ")" : "(n.d.)");

//Parser for URL
def_parsers.url = (data) => {
  data = data.toLowerCase().trim();
  if (!data) return "";
  if (!(data.substring(0, 8) == "https://" || data.substring(0, 7) == "http://")) {
    data = "https://" + data;
  }
  return "Available from " + data;
};

//Parser for Accessed date
def_parsers.accessed = (data) => {
  let date;
  if (!data) date = new Date();
  else date = new Date(data);
  return (
    "[accessed " +
    date.getDate().toString() +
    " " +
    date.toLocaleString("english", { month: "long" }) +
    " " +
    date.getFullYear().toString() +
    "]."
  );
};

//Short date parser. Example: 25 Jun
def_parsers.date_short = (data) => {
  let date;
  if (!data) return "";
  date = new Date(data);
  return date.getDate().toString() + " " + date.toLocaleString("english", { month: "short" });
};

//Long date parser. Example: 25 Juny
def_parsers.date_long = (data) => {
  let date;
  if (!data) return "";
  date = new Date(data);
  return date.getDate().toString() + " " + date.toLocaleString("english", { month: "long" });
};

//Full date parser. Example: 12 February 2023
def_parsers.date_full = (data) => {
  let date;
  if (!data) return "";
  date = new Date(data);
  return date.getDate().toString() + " " + date.toLocaleString("english", { month: "long" }) + " " + date.getFullYear();
};

//Parser for authors. Put surnames then names
def_parsers.author = (data) => {
  if (!data.trim()) return "";
  let result = "";
  let authors = data.trim().split(",");
  let a = 1;
  authors.forEach((element) => {
    element = element.trim();
    if (element[0] === '"') {
      result += element.substring(1, element.length - 1);
    } else {
      let i = 0;
      let parts = element.split(" ");
      if (parts.length === 1 && authors.length === 1) result = result + parts[0];
      else
        parts.forEach((part) => {
          if (part) {
            if (i === 0) result = result + part + ", ";
            else result = result + part[0] + ".";
            i++;
          }
        });
    }
    if (a + 1 === authors.length) result = result + " and ";
    else if (a === authors.length) result = result + "";
    else result = result + ", ";
    a++;
  });
  return result;
};

//Parser for authors. Put names then surnames
def_parsers.author_reverse = (data) => {
  if (!data.trim()) return "";
  let result = "";
  let authors = data.trim().split(",");
  let a = 1;
  authors.forEach((element) => {
    element = element.trim();
    if (element[0] === '"') {
      result += element.substring(1, element.length - 1);
    } else {
      let i = 0;
      let parts = element.split(" ");
      parts.reverse();
      if (parts.length === 1 && authors.length === 1) result = result + parts[0];
      else
        parts.forEach((part) => {
          if (part) {
            if (i + 1 === parts.length) result = result + part;
            else result = result + part[0] + ". ";
            i++;
          }
        });
    }
    if (a + 1 === authors.length) result = result + " and ";
    else if (a === authors.length) result = result + "";
    else result = result + ", ";
    a++;
  });
  return result;
};

//Parser for page or page range
def_parsers.page = (data) => {
  if (!data.trim()) return "";
  let result = "";
  if (data.trim().split("-").length > 1 || data.trim().split(",").length > 1) result = "pp. ";
  else result = "p. ";
  result += data;

  return result;
};

//Parser for editors
def_parsers.author_editor = (value) => {
  if (value.split(",").length > 1) return def_parsers.author(value) + " (eds.)";
  else return def_parsers.author(value) + " (ed.)";
};

//Parser for editors reversed
def_parsers.author_editor_reverse = (value) => {
  if (!value.trim()) return value.trim();
  if (value.split(",").length > 1) return def_parsers.author_reverse(value) + " (eds.)";
  else return def_parsers.author_reverse(value) + " (ed.)";
};

export default def_parsers;
