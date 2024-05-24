//The support object Category is used in "reference_db" and contains name of
//reference category and list of subcategories with their modules
//use it as an argumert in function "reference_db.add_category()"

function Category(name) {
  this.name = name;
  this.subtypes = [];

  this.add_subcategory = function (name, module) {
    this.subtypes.push({ name: name, module: module });
  };
}

export default Category;
