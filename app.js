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
    findMenu(people);
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
      getFamily(person, people);
      break;
    case "descendants":
    // TODO: get person's descendants
      displayPeople(getDescendants(person,people));
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
function findMenu(people) {
  var displayOption = prompt("Enter which trait you would like to search for (type the word in parantheses):\n" +
                             "- Age (age)\n" +
                             "- Height in inches (height)\n" +
                             "- Weight in pounds (weight)\n" +
                             "- Occupation (occupation)\n" +
                             "- Eye Color (color)\n" +
                             "When all criteria have been entered type 'done' to view results.\n" +
                             "Otherwise type 'restart' or 'quit'")
  switch(displayOption){
    case "age":
      break;
    case "height":
    case "weight":
    case "occupation":
    case "color":
    case "done":
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return findMenu(people);
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

function getFamily(person, people) {
  var familyValues = getFamilyIds(person);
  var familyInfoArray = [];
  for (var familyIndex in familyValues) {
    var potentialFamilyMembers = searchForFamily(familyValues[familyIndex],people);
    var newFamilyMembers = checkNewFamilyMembers(potentialFamilyMembers,person,getAllIds(familyInfoArray));
    familyInfoArray = familyInfoArray.concat(newFamilyMembers);
  }
  displayPeople(familyInfoArray);  
}

function getFamilyIds(person) {
  var familyValues = [];
  familyValues.push(person.id);
  if (person.parents.length != 0) {
    for (var parentIndex in person.parents) {
      familyValues.push(person.parents[parentIndex]);
    }
  }
  return familyValues;
}

function searchForFamily(familyId,people) {
  var potentialFamilyMembers = people.filter(function(person){
    if (person.id === familyId ||
        person.currentSpouse === familyId ||
        person.parents.indexOf(familyId) > -1
      ) {
      return true;
    }
    else {
      return false;
    }
  })
  return potentialFamilyMembers;
}

function getAllIds(people) {
  var allIds = [];
  for (var personIndex in people) {
    allIds.push(people[personIndex].id);
  }
  return allIds;
}

function checkNewFamilyMembers(potentialFamilyMembers,person,listOfFamilyMembers) {
  var newFamilyMembers = potentialFamilyMembers.filter(function(familyMember){
    if (familyMember.id === person.id ||
        listOfFamilyMembers.indexOf(familyMember.id) > -1) {
      return false;
    }
    else {
      return true;
    }
  })
  return newFamilyMembers;
}

function getDescendants(person,people) {
  var descendants = people.filter(function(individual){
    if (individual.parents.indexOf(person.id) > -1) {
      return true;
    }
    else {
      return false;
    }
  })


  if (descendants.length == 0) {
    return descendants;
  }
  else {
    for (var descendantsIndex in descendants) {
      descendants = descendants.concat(getDescendants(descendants[descendantsIndex],people));
    }
    return descendants;
  }
  // displayPeople(descendants);
}