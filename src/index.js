/* global document, console, bootstrap */
import reference_db from "./database/reference_db";

//Initialise addon global variables
const ref_DB = [...reference_db]; //copy database into addon global variable
let selected_type = 0; //default value
let selected_subtype = 0; //default value
let module = null;

const ref_type_element = document.getElementById("reference_type_select");
const ref_subtype_element = document.getElementById("reference_subtype_select");
const ref_fields_element = document.getElementById("reference_fields");
const ref_create_element = document.getElementById("create_reference_button");
const ref_form = document.getElementById("reference_form");
const ref_result_element = document.getElementById("ref_results");
const ref_copy_element = document.getElementById("copy_ref_button");

//init UI using default values
load_ref_types();
load_ref_subtypes();
load_ref_fields();

//init event handlers
ref_type_element.onchange = ref_type_onchange;
ref_subtype_element.onchange = ref_subtype_onchange;
ref_create_element.onclick = ref_create_onclick;
ref_result_element.onclick = ref_select_text_onclick;
ref_copy_element.onclick = ref_copy_text_onclick;
console.log("App Initialized");

//Load data from DB and update "types" UI element
function load_ref_types() {
  let types = ref_DB;
  let id = 0;
  ref_type_element.innerHTML = "";

  types.forEach((option) => {
    let optionElement = document.createElement("option");
    optionElement.value = id++;
    optionElement.textContent = option.name;
    ref_type_element.appendChild(optionElement);
  });
}

//Load data from DB and update "subtypes" UI element
function load_ref_subtypes() {
  let subtypes = ref_DB[selected_type].subtypes;
  let id = 0;
  ref_subtype_element.innerHTML = "";

  subtypes.forEach((option) => {
    let optionElement = document.createElement("option");
    optionElement.value = id++;
    optionElement.textContent = option.name;
    ref_subtype_element.appendChild(optionElement);
  });
}

//Load data from DB and update "fields" UI element
function load_ref_fields() {
  module = ref_DB[selected_type].subtypes[selected_subtype].module;
  module.create_html_code(ref_fields_element);
  // Init bootstrap popovers
  let popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
}

//create and print reference using user data
function create_reference() {
    let reference_array = module.create_ref_array();
    let result = "";
    reference_array.forEach((element) => {
      if (element.italic == true) result += "<i>" + element.text + "</i>";
      else result += element.text;
      result += " ";
    });
    ref_result_element.innerHTML = result;
}

//EVENT HANDLERS
function ref_type_onchange(event) {
  selected_type = event.target.value;
  selected_subtype = 0;
  load_ref_subtypes();
  load_ref_fields();
}

function ref_subtype_onchange(event) {
  selected_subtype = event.target.value;
  load_ref_fields();
}

function ref_create_onclick(event) {
  event.preventDefault();
  if (ref_form.checkValidity()) {
    create_reference();
  } else ref_form.reportValidity();
}

function ref_select_text_onclick(event) {
  let selection = window.getSelection();
  let range = document.createRange();

  range.selectNodeContents(ref_result_element);
  selection.removeAllRanges();
  selection.addRange(range);
}

function ref_copy_text_onclick(event) {
  const originalText = ref_result_element.innerText;
  const boldText = ref_result_element.innerHTML;
  const blobHtml = new Blob([boldText], { type: "text/html" });
  const blobText = new Blob([originalText], { type: "text/plain" });
  const data = [new ClipboardItem({
    ["text/plain"]: blobText,
    ["text/html"]: blobHtml,
  })];
  navigator.clipboard.write(data);
}