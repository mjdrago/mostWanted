/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    var foundPerson = searchByName(people);
    mainMenu(foundPerson[0],people);
    break;
    case 'no':
    // TODO: search by traits
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
      displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + uppercaseWords(person.gender) + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Age: " + getAge(person.dob) + "\n";
  personInfo += "Height: " + convertToFeetandInches(person.height) + "\n";
  personInfo += "Weight: " + person.weight + " lbs\n";
  personInfo += "Eye Color: " + uppercaseWords(person.eyeColor) + "\n";
  personInfo += "Occupation: " + uppercaseWords(person.occupation) + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function searchByCharacteristics(argument) {
  // body...
}

function uppercaseWords(phrase) {
  var phraseLength = phrase.length;
  var upperCasePhrase = "";
  for(var x in phrase){
    if (x==0||phrase.charAt(x-1)===" ") {
      upperCasePhrase = upperCasePhrase + phrase.charAt(x).toUpperCase();
    }
    else{
      upperCasePhrase = upperCasePhrase + phrase.charAt(x);
    }
  }
  return upperCasePhrase;
}

function convertToFeetandInches(height) {
  var feet = Math.floor(height / 12);
  var inches = height % 12;
  return feet + "'" + inches + "\"";
}

function getAge(stringDob) {
  var currentDate = new Date();
  var dateDob = new Date(stringDob);
  var currentDateBreakdown = breakdownDate(currentDate);
  var dateDobBreakdown = breakdownDate(dateDob);
  var age;
  if (currentDateBreakdown.month === dateDobBreakdown.month) {
    if (currentDateBreakdown.day >= dateDobBreakdown.day) {
      age = currentDateBreakdown.year - dateDobBreakdown.year;
    }
    else {
      age = currentDateBreakdown.year - dateDobBreakdown.year - 1;
    }
  }
  else if (currentDateBreakdown.month > dateDobBreakdown.month) {
    age = currentDateBreakdown.year - dateDobBreakdown.year;
  }
  else if (currentDateBreakdown.month < dateDobBreakdown.month) {
    age = currentDateBreakdown.year - dateDobBreakdown.year - 1;
  }


  return age;
}

function breakdownDate(date) {
  var dateBreakdown = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  }
  return dateBreakdown;
}