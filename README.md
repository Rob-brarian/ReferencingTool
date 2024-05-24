# Referencing KERRY FET
#### Video Demo:  https://youtu.be/OqO4xLKhNkc
#### Description:

**Referencing KERRY FET** is an web application that helps create references using guidelines from **"Referencing Handbook Kerry FET"**
(more details about guidelines can be found here: https://library.etbi.ie/referencing/others)

The application was created by using html and javascript. For CSS I used **Bootstrap** library (https://getbootstrap.com/).
To initiate local web-server and for testing and debugging I used **ViteJs** (https://vitejs.dev/)

How to install and use this application:
1. Copy files into separate folder;
2. In the new folder in console type: `npm install`;
3. Use `npm run dev` to run the application in developer mode;
4. Use `npm run build` to build the application;

The structure of the application:

The application consists of the next parts:
- `index.html` and `index.js` which contain main logic and main UI-design of the application;
- `database` folder, which contains referencing types database and logic related to parsing and creating references:
  - `reference_db.js`contains list of all reference categories, used in this application;
  - `utilites` folder contains:
    - `Category.js` - constructor. Its objects store all information about a reference category;
    - `Module.js` consturctor. Its objects store information about list of fields for a subcategory and how to process them;
    - `Field.js` constructor. Its objects store information about field, its type, parser, etc.;
    - `default_fields.js` contains fields that can be used multiple times in different modules;
    - `default_parsers.js` contains parsers that can be used multible times in different fields;
  - `categories` actual database. Contains files each of one represent separate category(Website, Book, Ads, etc.);

How application works:

When the application starts, `index.html` creates all UI-elements, initialises Bootstrap, and launches code from `index.js`. `index.js` is responcible for event-handling and application processing. But itself `index.js` doesn't have any information about what reference categories exists and how to process them. This information is in `reference_db.js` which `index.js` downloads during initialisation.

`reference_db.js` contains a list of several .js modules, each of which represent one separate category (Website, Book, etc.).

Lets take a look at one of these files - `book.js`. This file contains all actual data about how to process web-references and what fields it needs.

After importing nessesary classes `Category`, `Module`, and `Field` it creates `Category` with name 'Books'.

Then it creates all nessesary `Field`s for all subcategories. `Field` contains information about what text should it show, description, type, and how to read data from it.

Then this file creates all requiered `Module`s, which represent different subcategories (Electronic books, Sacred text, Edited books, etc.). Each `Module` consists of two parts: list of all nessesary fields, and special encoded textual list that tells the module how to process these fields.

After that the file register all these `Module`s to created category and exports it.

`index.js` reads all this information and renders all nessesary fields. After user fills in all fields with requiered data abd press confirm button, the application sends request to current module to process information. Then it uses processed information to create a reference which it renders in designated field.

The reference then can be copied and used in any other application.