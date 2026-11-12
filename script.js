const GOOGLE_SCRIPT_URL= "https://script.google.com/macros/s/AKfycbwNmGyxISCdpOf40q2FzEKCdIMuxyPm225lWgiAq7JIwte_HEebW3bd5Rc_l1Vd2Dfr/exec";

/* TASKS
1. MAKE THE TOGGLE THEME BUTTON WORK
2.MAKE THE ADMIN LOGIN BUTTON WORK
3. MAKE THE ADMIN LOGIN SECTION WORK. CHECK THE CREDENTIALS AND GIVE/RESTRICT ACCES TO USER MESSAGES.
4. MAKE CONTACT ME SECTION WORK- STORE THE USER RESPONSE IN YOUR DATABASE. 
5.DISPLAY USER MESSAGES IN THE USER-RESPONSES SECTION. */
//toggle theme
let control_of_toggle_btn= document.getElementById("toggletheme");
control_of_toggle_btn.addEventListener("click", function(){
  document.body.classList.toggle("light-theme");
}
  );
//welcome heading
const welcomeHeading = document.getElementById("welcome-text");
const currentHour = new Date().getHours();
let greeting = "Welcome";

if (currentHour < 12) {
    greeting = "Good Morning ☀️";
} else if (currentHour < 18) {
    greeting = "Good Afternoon ☕";
} else {
    greeting = "Good Evening 🌙";
}

const fullText = `${greeting}, I am Manbir Kaur.......`;
let index = 0;

function typeEffect() {
    if (index < fullText.length) {
        welcomeHeading.textContent += fullText.charAt(index);
        index++;
        setTimeout(typeEffect, 100); 
    }
}
window.addEventListener("DOMContentLoaded", typeEffect);
//event listener magic at coordination-a skill
const skillCoord = document.getElementById("skill-coordination");
if (skillCoord) {
    skillCoord.addEventListener("click", () => {
      if (skillCoord.textContent.includes("Patience and Coordination")) {
            skillCoord.innerHTML = "Engineering Mindset: Crucial for isolating complex code bugs and resolving git merge conflicts smoothly. 🛠️";
            skillCoord.style.color = "#34A853"; // Google Green
            skillCoord.style.fontWeight = "bold";
        } else {
            skillCoord.innerHTML = 'Patience and Coordination <span class="click-badge">(Click Me)</span>';
            skillCoord.style.color = ""; 
            skillCoord.style.fontWeight = "";
        }
    });
}
//Making admin login button work 
let control_of_admin_section= document.getElementById("Admin");
function ShowAdminLogin()
{
control_of_admin_section.style.display="block";
//Making the admin section work.
//1. Get the control of the form - because we have to put a SUBMIT event on it.
//2. Get the data which is written on the username and password fields.
//3. set the submit button as type "submit" so that your listener will be able to catch. it.
}   
let control_of_adminform=document.getElementById("adminform");
let control_of_usermessages= document.getElementById("user");

control_of_adminform.addEventListener("submit", async function(event) {
// By default, submitting an HTML form reloads the page.
// We prevent that because we want JavaScript to handle
// the login request.   
  event.preventDefault();
  let username= document.getElementById("usernameid").value;
  let password= document.getElementById("passwordid").value;
/*let stored_username="manbirk";
let stored_password="@Radha2";
if(username==stored_username && password==stored_password) { 
  alert("ACCESS GRANTED");
  control_of_admin_section.style.display="none"; //HIDE
  control_of_usermessages.style.display="block"; //VISIBLE
  
  get_messages();
  //CALLS THE FUNCTION TO GET MESSAGES FROM THE LOCAL STORAGE
}
else{
  alert("ACCESS DENIED")
}
  });*/
// Previously, the username and password were checked
// directly inside this JavaScript file.
//
// Now JavaScript sends the login information to the
// Google Apps Script backend using fetch().
try {

  let response = await fetch(
    GOOGLE_SCRIPT_URL,
    {

      method: "POST",

      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },

      body: JSON.stringify({

        action: "login",

        username: username,

        password: password

      })

    }
  );


  let result = await response.json();


  if (result.success) {

    alert("Access granted!");

    control_of_admin_section.style.display =
      "none";


    control_of_usermessages.style.display =
      "block";


    get_messages();

  }

  else {

    alert("Access Denied!");

  }


}

catch(error) {

  console.error(error);

  alert(
    "Something went wrong while logging in."
  );

}


}

);

/*making the contact form work; OLD PATTERN, i.e. on local database
  
let control_of_contact_form= document.getElementById("contact_form");
control_of_contact_form.addEventListener("submit", function(event){
    event.preventDefault();
  let name= document.getElementById("name").value;
    let email= document.getElementById("email").value;
    let message= document.getElementById("message").value;
  let date= new Date().toLocaleString(); ///toLocaleString() includes both date and time's display in the result
  let response = {
    name, email, message, date
  }
  let dummy_database= JSON.parse(localStorage.getItem(`tempDB`)) || [];
  dummy_database.push(response);///not sending to DB, +1 to JS list
 localStorage.setItem("tempDB", JSON.stringify(dummy_database));//pushing updated list to DB
  alert("MESSAGE SUBMITTED");
  control_of_contact_form.reset();
});
//function to get messages
function get_messages() {
 let dummy_database = JSON.parse(localStorage.getItem("tempDB")) || []; ///created list to get responses from the local storage database and put it here in the list
 let control_of_usermessages_div= document.getElementById("usermsg");///gives control of the empty div in HTML(user messages section)
dummy_database.forEach(responses=>{ //variable name used-responses
/// appendChild will now put the newest at the top using .reverse()
let control_of_new_div =document.createElement('div'); /// creates a new element using the superpower of javascript,DOM
control_of_new_div.innerHTML= `
  <p> Name: ${responses.name} </p> 
  <p> Email: ${responses.email} </p>
  <p> Message : ${responses.message} </p>
  <p> Date: ${responses.date} </p>
  <hr>
  /// MAKES whatever is there in the curly braces, turn out to be a variable
control_of_usermessages_div.prepend(control_of_new_div); ///tells where exactly the newly created element to sit///

///MAKING THE CONTACT FORM WORK- actual

///Task - Make the contact form work.*/

let control_of_contact_form =
document.getElementById("contact_form");

// ==================================================
// CHANGED: CONTACT FORM NOW SAVES TO GOOGLE SHEETS
// ==================================================
// Previously:
//
// localStorage
//      ↓
// Browser-specific storage
//
// Now:
//
// JavaScript
//      ↓
// fetch()
//      ↓
// Google Apps Script
//      ↓
// Google Sheet
//
// This means messages submitted by different users
// and different computers can all go into the same
// Google Sheet.

control_of_contact_form.addEventListener(
"submit",
async function(event){


// ==================================================
// CHANGED: PREVENT PAGE RELOAD
// ==================================================

event.preventDefault();


let name =
  document.getElementById("name").value;


let email =
  document.getElementById("email").value;


let msg =
  document.getElementById("message").value;


try {


  // ==================================================
  // CHANGED: SEND DATA TO GOOGLE APPS SCRIPT
  // ==================================================

  let response = await fetch(

    GOOGLE_SCRIPT_URL,

    {

      method: "POST",

      headers: {

        "Content-Type":
          "text/plain;charset=utf-8"

      },

      body: JSON.stringify({

        // This tells the backend what operation
        // we want it to perform.

        action: "save_message",

        name: name,

        email: email,

        msg: msg

      })

    }

  );


  let result =
    await response.json();


  if (result.success) {


    alert(
      "Message Submitted"
    );


    // ==================================================
    // CHANGED: CLEAR THE FORM AFTER SUCCESS
    // ==================================================

    control_of_contact_form.reset();


  }

  else {

    alert(
      "Message could not be saved."
    );

  }


}

catch(error) {


  console.error(error);


  alert(
    "Something went wrong while submitting the message."
  );


}


}

);

//Function to get messages

async function get_messages(){

// ==================================================
// CHANGED: FETCH MESSAGES FROM GOOGLE SHEETS
// ==================================================
//
// Previously:
//
// let dummy_database =
//   JSON.parse(localStorage.getItem('tempDB')) || [];
//
//
// Now:
//
// JavaScript sends a GET request to the Google
// Apps Script Web App.
//
// The Google Apps Script reads the Google Sheet
// and returns the rows as JSON.

try {


let response =
  await fetch(
    GOOGLE_SCRIPT_URL
  );


let result =
  await response.json();


if (!result.success) {

  alert(
    "Could not fetch messages."
  );

  return;

}


let control_of_usermessages_div =
  document.getElementById(
    "usermsg"
  );


// ==================================================
// CHANGED: CLEAR OLD DISPLAYED MESSAGES
// ==================================================
// If the admin logs in more than once or calls
// get_messages() again, this prevents duplicate
// messages from being displayed.

control_of_usermessages_div.innerHTML =
  "";


// ==================================================
// CHANGED: READ THE MESSAGES RETURNED BY THE API
// ==================================================

result.messages.forEach(
  responses => {


    let control_of_new_div =
      document.createElement(
        'div'
      );


    // ==================================================
    // CHANGED: USE textContent FOR USER DATA
    // ==================================================
    // Instead of directly placing user input into
    // innerHTML, we create separate elements.
    //
    // This is safer when displaying data submitted
    // by users.

    let nameParagraph =
      document.createElement(
        "p"
      );

    nameParagraph.textContent =
      "Name: " + responses.name;


    let emailParagraph =
      document.createElement(
        "p"
      );

    emailParagraph.textContent =
      "Email: " + responses.email;


    let messageParagraph =
      document.createElement(
        "p"
      );

    messageParagraph.textContent =
      "Message: " + responses.msg;


    let dateParagraph =
      document.createElement(
        "p"
      );

    dateParagraph.textContent =
      "Date: " + responses.date;


    let separator =
      document.createElement(
        "hr"
      );


    control_of_new_div.appendChild(
      nameParagraph
    );


    control_of_new_div.appendChild(
      emailParagraph
    );


    control_of_new_div.appendChild(
      messageParagraph
    );


    control_of_new_div.appendChild(
      dateParagraph
    );


    control_of_new_div.appendChild(
      separator
    );


    control_of_usermessages_div.appendChild(
      control_of_new_div
    );


  }

);


}

catch(error) {


console.error(error);


alert(
  "Something went wrong while fetching messages."
);


}

}
// Fetch Live GitHub Repositories via REST API
async function loadGitHubRepos() {
  const reposContainer = document.getElementById("github-repos");
  if (!reposContainer) return;

  try {
    const response = await fetch(
      "https://github.com"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    const repos = await response.json();
    reposContainer.innerHTML = "";

    repos.forEach((repo) => {
      const card = document.createElement("div");
      card.className = "repo-card";

      const language = repo.language || "HTML / CSS";
      const description = repo.description || "Personal development repository on GitHub.";
      const updatedDate = new Date(repo.updated_at).toLocaleDateString();

      card.innerHTML = `
        <h4><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name} ↗</a></h4>
        <p>${description}</p>
        <div class="repo-meta">
          <span class="repo-lang">${language}</span>
          <span>⭐ ${repo.stargazers_count} • Updated ${updatedDate}</span>
        </div>
      `;

      reposContainer.appendChild(card);
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    reposContainer.innerHTML = "<p>Unable to load live repositories right now.</p>";
  }
}

window.addEventListener("DOMContentLoaded", loadGitHubRepos);

