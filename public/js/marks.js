//Safer to only run js code once the page is fully loaded
document.addEventListener("DOMContentLoaded", function(event) {
  var handlersAdded = []; //for keeping track of which buttons have had handlers added
  var sections = ['Students', 'Marks', 'Assesments', 'Events', 'Roster'] //store the different page sections NOTE: Make sure naming is consistent: buttons -> hide{section}, containers => {section}Container

  //Hide each page section based on the section list above
  var hideSections = function(){
    sections.forEach(element => {
      document.querySelector(`#${element}Container`).classList.add('invisible');
    });
  };
  //call it straight away to start off with a clean/blank page
  hideSections();

  //add the click listener to each of the section buttons
  document.querySelectorAll(".topToggleBtns button").forEach(btn =>{
    btn.addEventListener('click', thisbtn =>{
      hideSections();
      removeInvisible(`#${btn.id.replace('hide', '')}Container`);
    })
  });

  //Hides all tables
  var hideAllTables = function(){
    var sectionTypes = ['Avg', 'Marks'];

    sectionTypes.forEach(type => {
      document.querySelectorAll(`.grade${type}`).forEach(div => {
        //Adds the 'invisible' class to each div in order to hide it
        div.classList.add('invisible');
      })
    })
  };

  //call it straight away to hide all tables
  hideAllTables();

  //Removes the 'invisible' class for the element sent through in the selector parameter
  var removeInvisible = function(selector){
    document.querySelector(selector).classList.remove('invisible');
  }

  //This is the click handler we add to each button
  var addClickHandler = function(btn, type){
    btn.addEventListener("click", () => {
      //Set all tables to hidden initially
      hideAllTables();
      //Unhide only the specific table related to the button
      removeInvisible(`.${btn.name.replace('btn', '')}`);

    })
  }

  //Go through each type of button and add a handler for each
  var addHandlers = function(){
    var buttonTypes = ['Avg', 'Marks'];
    buttonTypes.forEach(type => {
      document.querySelectorAll(`.${type}btn`).forEach(btn =>{
        addClickHandler(btn, type);
      });
    });
  }

  //Call it right away to give the buttons handlers
  addHandlers();
  
  });