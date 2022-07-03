# Note-Taker

## Description

This project was an activity using express.js to create a server and backend functionality and link it to a front end note-taker application.  The goal of this project was to generate a note-taker application where the user could enter notes, save them, view notes previously entered, and delete notes.   

This project helped me understand how the back end is linked to the front through a series of GET and POST functions within the backend structure as well as FETCH structures in the front end javascript.  I learned how to require express, as well as modularize the code to make it easier to read. 

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Links](#links)
* [Questions](#questions)

## Installation

If the user already has node installed on their device, they can download this project and run "npm init" and then "npm i express" to download the express dependecy.  If they are interested in running the tests, enter "npm i --save-dev jest".  Next, the user should enter "npm start" to launch the server and then view the website at localhost:3001.

## Usage

When the user navigates to the server's page (localhost:3001), they will be presented with a title page. 

![Title Page](https://user-images.githubusercontent.com/64170123/177059433-513ab019-e128-4060-b3d2-b1e4e1c5e77c.jpg)


When they click on the "Get Started" button, it will take the user to the note-taker page.  From here, previous notes saved in the database will desplay on the left side of the page, with a delete button next to them.  The user is also given a "+" button at the top right of the page.  When they click on this "+" button, they can create a new note and save it using the POST functionality. 

Unfortunately, while I have set up the GET and POST functionality to get all the notes saved as well as locate individual notes and post new notes, I have not fully figured out what is missing in the front-end javascript to make it work.  The current project is displaying nothing on the note page and does not allow me to save new notes.  

Image of working "GET":

![Get all notes](https://user-images.githubusercontent.com/64170123/177059374-a4fa3be0-d35a-4274-af81-90baf0d9a4ed.jpg)

Image of working "GET single note":

![Get Single Note](https://user-images.githubusercontent.com/64170123/177059375-b0a24fc9-a323-49be-8cd4-956052a87d51.jpg)

Image of working "POST":

![Post New Note](https://user-images.githubusercontent.com/64170123/177059376-3bdcb661-165a-45bc-a599-fd71c22bcb0f.jpg)


## Links


Link to video of project: 

The link to the project is here: https://samantha-ruth.github.io/Note-Taker/

The url of the Git repository is here: https://github.com/Samantha-Ruth/Note-Taker


## Questions

If you have any questions about the repo, open an issue or you can find more of my work at (https://gitHub.com/Samantha-Ruth).


