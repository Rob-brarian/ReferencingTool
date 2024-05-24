/* global document*/
const debug = false; // if enabled, fills values of fields with default info

//Class "Module" creates a separate module with its own logic and list of fields
//-----------------------
//How to use "logic" variable:
//["#0"] - value from first element in array "fields_array"
//["_text_"] - will print text
//["+0_text_"] - will print text only if first element in array "fields_array" has value
//["-0_text_"] - will print text only if first element in array "fields_array" doesn't have value
//Examples of use: ["+1#1_Text_"], [_(_#0_)_], ["-0-1#1#2"]
//-----------------------
function Module(fields, logic) {
  const id_prefix = "field_id_";
  this.fields = fields;
  this.logic = logic; //example [?1=1:2], [i2], [3_text_]
  this.parent_div = null; //link to parent div
  this.fields_array = []; //array of created field inputs

  //Takes div element and creates inside html code
  this.create_html_code = (parent_div) => {
    this.parent_div = parent_div;
    this.parent_div.innerHTML = "";
    this.fields_array = [];
    let iterator = 0;

    this.fields.forEach((field) => {
      let wrap_container = document.createElement("div");
      let main_container = document.createElement("div");
      let form_container = document.createElement("div");
      let field_id = id_prefix + iterator;

      let label_element = document.createElement("label");
      label_element.htmlFor = field_id;
      label_element.innerHTML = field.name;

      // Create element
      let input_element = null;
      if (field.type === "select") {
        input_element = document.createElement("select");
        field.values.forEach((value) => {
          let optionElement = document.createElement("option");
          optionElement.value = value;
          optionElement.textContent = value;
          input_element.appendChild(optionElement);
        });
      } else {
        input_element = document.createElement("input");
        input_element.type = field.type;
        input_element.required = field.required;
        if (debug) input_element.value = field.debug;
        input_element.placeholder = field.debug; // For debugging
      }

      input_element.id = field_id;
      input_element.get_value =
        field.type === "checkbox" ? () => input_element.checked : () => field.parser(input_element.value);
      this.fields_array.push(input_element);

      // Create help popover
      let desc_button = document.createElement("span");
      desc_button.role = "button";
      desc_button.tabIndex = "-1";
      desc_button.innerHTML = "?";
      desc_button.dataset.bsContainer = "body";
      desc_button.dataset.bsToggle = "popover";
      desc_button.dataset.bsPlacement = "left";
      desc_button.dataset.bsContent = field.description;
      desc_button.dataset.bsTrigger = "focus";

      // Add classes to components
      wrap_container.classList.add("col-12", "col-md-4");
      main_container.classList.add("input-group", "mb-1", "has-validation", "justify-content-end");
      if (field.type !== "checkbox") form_container.classList.add("form-floating");
      //TODO: fix vertical aligh for checkbox
      else form_container.classList.add("align-middle");
      desc_button.classList.add("input-group-text");
      switch (field.type) {
        case "text":
        case "date":
        case "time":
          label_element.classList.add("form-label", "text-secondary");
          input_element.classList.add("form-control", "fw-semibold");
          break;
        case "checkbox":
          label_element.classList.add("form-check-label", "me-3");
          input_element.classList.add("form-check-input", "me-3");
          break;
        case "select":
          label_element.classList.add("form-label");
          input_element.classList.add("form-select", "fw-semibold");
          break;
        default:
          break;
      }
      form_container.appendChild(input_element);
      form_container.appendChild(label_element);
      main_container.appendChild(form_container);
      main_container.appendChild(desc_button);
      wrap_container.appendChild(main_container);
      this.parent_div.appendChild(wrap_container);

      iterator++;
    });
  };

  //Creates a list of formatted reference values using "logic" array
  //It reads special code elements to create text
  //Example: ["#0", "#1", "i#2", "_[advertisement]._", "+3#3", "+3#4"]
  this.create_ref_array = () => {
    let ref_array = [];
    let values_array = [];
    for (let i = 0; i < fields.length; i++) {
      values_array.push(this.fields_array[i].get_value());
    }
    this.logic.forEach((element) => {
      let ref_part = { text: "", italic: false };
      if (element[0] == "i") {
        ref_part.italic = true;
        element = element.substring(1, element.length);
      }
      ref_part.text = parser("", element, values_array);
      if (ref_part.text) ref_array.push(ref_part);
    });
    return ref_array;
  };
}

//Supportive function for create_ref_array that parse logic code
function parser(init_value, logic, values_array) {
  let result = init_value;
  for (let i = 0; i < logic.length; i++) {
    const element = logic[i];
    switch (element) {
      case "#": {
        let field_id = [];
        for (i++; i < logic.length; i++) {
          if (/^[0-9]$/.test(logic[i])) field_id.push(logic[i]);
          else break;
        }
        result += values_array[field_id.join("")];
        i--;
        break;
      }
      case "_": {
        let text = "";
        for (i++; i < logic.length; i++) {
          if (logic[i] === "_") break;
          else text += logic[i];
        }
        result += text;
        break;
      }
      case "+": {
        let field_id = [];
        for (i++; i < logic.length; i++) {
          if (/^[0-9]$/.test(logic[i])) field_id.push(logic[i]);
          else break;
        }
        if (values_array[field_id.join("")]) result += parser(result, logic.substring(i, logic.length), values_array);
        i = logic.length;
        break;
      }
      case "-": {
        let field_id = [];
        for (i++; i < logic.length; i++) {
          if (/^[0-9]$/.test(logic[i])) field_id.push(logic[i]);
          else break;
        }
        if (!values_array[field_id.join("")]) result += parser(result, logic.substring(i, logic.length), values_array);
        i = logic.length;
        break;
      }
      default:
        break;
    }
  }
  return result;
}

export default Module;
