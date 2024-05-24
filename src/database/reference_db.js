//Library with all reference types and subtypes
import advertisement from "./categories/advertisement";
import art from "./categories/art";
import book from "./categories/book";
import case_study from "./categories/case";
import conference from "./categories/conference";
import correspondence from "./categories/correspondence";
//import diagram from "./categories/diagram";
import film from "./categories/film";
import interview from "./categories/interview";
import journal from "./categories/journal";
import law from "./categories/law";
import lecture from "./categories/lecture";
import life from "./categories/live";
import map from "./categories/map";
import music from "./categories/music";
import newspaper from "./categories/newspaper";
import official from "./categories/official";
import patent from "./categories/patent";
import social from "./categories/social";
import software from "./categories/software";
import thesis from "./categories/thesis";
import translation from "./categories/translation";
import verbal from "./categories/verbal";
import web from "./categories/web";

let reference_db = [];

add_element(web);
add_element(book);
add_element(social);
add_element(advertisement);
add_element(art);
add_element(case_study);
add_element(conference);
add_element(correspondence);
//add_element(diagram);
add_element(film);
add_element(interview);
add_element(journal);
add_element(law);
add_element(lecture);
add_element(life);
add_element(map);
add_element(music);
add_element(newspaper);
add_element(official);
add_element(software);
add_element(patent);
add_element(thesis);
add_element(translation);
add_element(verbal);

function add_element(element) {
  reference_db.push(element);
}

export default reference_db;
