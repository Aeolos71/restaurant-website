// Import the JSON file
import myRecipes from "./recipes.json" assert { type: "json" };

/******************************************************
 * HTML ELEMENTS
 *******************************************************/
// The number of downloads and likes on the top of the recipes list
const downloadNumberEl = document.getElementById("download-number");
const likesNumberEl = document.getElementById("likes-number");
// The list of the recipes
const recipesListEl = document.getElementById("recipes-list");
// The details of the chosen recipe
const recipeDetailsEl = document.getElementById("recipe-details");
// The title, the description and the method of the recipe
const recipeTitleEl = document.getElementById("recipe-title");
const recipeIngredientsEl = document.getElementById("recipe-ingredients");
const recipeMethodEl = document.getElementById("recipe-method");
// The buttons of the recipe details
const backToRecipesEl = document.getElementById("back-to-recipes");
const likeRecipeEl = document.getElementById("like-recipe");
const downloadRecipeEl = document.getElementById("download-recipe");

/******************************************************
 * CREATE SESSION STORAGE
 *******************************************************/
/*--------------------------------------------------------------------
| Check if the page has been loaded before.
|
| This check is performed every time the page is loading
|
| If not
|  set values to the sessionStorage
|  change the status of the page to hasBeenLoaded = true
|
| If yes
|  get values from the sessionStorage
--------------------------------------------------------------------*/
let downloads = 0; // Init the downloads
let likes = 0;
let sessionRecipes = []; // Init the downloaded recipes

// Event listener when the page load/reload to get the right session storage values
document.addEventListener("DOMContentLoaded", isFirstTime);

function isFirstTime() {
  if (sessionStorage.getItem("hasBeenLoaded") === null) {
    sessionStorage.setItem("downloads", Number(downloads));
    sessionStorage.setItem("likes", Number(likes));
    sessionStorage.setItem("recipes", JSON.stringify(sessionRecipes));
    sessionStorage.setItem("hasBeenLoaded", true);
    downloadNumberEl.innerHTML = downloads;
    likesNumberEl.innerHTML = likes;
  } else {
    downloads = Number(sessionStorage.getItem("downloads"));
    likes = Number(sessionStorage.getItem("likes"));
    sessionRecipes = JSON.parse(sessionStorage.getItem("recipes"));
    downloadNumberEl.innerHTML = downloads;
    likesNumberEl.innerHTML = likes;
  }
}
/******************************************************
 * GET THE DATA FROM THE FILE
 *******************************************************/
// async function getRecipes() {
//   const response = await fetch("./assets/js/recipes.json");
//   return response.json();
// }

/******************************************************
 * DISPLAY THE RECIPES LIST ON THE PAGE
 *******************************************************/
function recipesList() {
  // Loop over myRecipes object
  for (let i = 0; i < myRecipes.length; i++) {
    // Create a <p> element for each item
    let p = document.createElement("p");
    // Add a class name to each p element
    p.className = "recipes-list-item";
    // Display the recipe details
    p.innerHTML = `
      <a class="recipes-list-item--title">
        ${myRecipes[i].title}
      </a>
      <p class="recipes-list-item--description">
        ${myRecipes[i].description}
      </p>`;
    // Add the p element to the list
    recipesListEl.appendChild(p);

    // Event listener for each p element. We get the event innerText which is the recipe title
    // and pass it as an argument to the displayRecipe function to display the details of the recipe
    p.addEventListener("click", (e) => {
      displayRecipe(e.target.innerText);
    });
  }
}
// Display the recipes list on the page
recipesList();

/******************************************************
 * DISPLAY RECIPE DETAILS
 *******************************************************/
function displayRecipe(title) {
  recipesListEl.classList.toggle("hidden"); // add class hidden to the recipes list section
  recipeDetailsEl.classList.toggle("hidden"); // remove class hidden from the recipe details section

  // loop over the array
  for (let i = 0; i < myRecipes.length; i++) {
    // Check if the recipe has the same id
    if (myRecipes[i].title === title) {
      // Display the title of the recipe
      recipeTitleEl.innerHTML = myRecipes[i].title;

      // Display the ingredients of the recipe
      // loop over the ingredients array to create the list of ingredients
      myRecipes[i].ingredients.forEach((element) => {
        let li = document.createElement("li");
        li.innerHTML = element;
        recipeIngredientsEl.appendChild(li);
      });

      // Display the method steps of the recipe
      // loop over the methods array to create the list of method steps
      myRecipes[i].method.forEach((element, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
        <p class="recipe-method-step">Step ${index + 1}</p> 
        <p class="recipe-method-details">${element}</p>`;
        recipeMethodEl.appendChild(li);
      });
    }
  }
}

/******************************************************
 * HIDE THE RECIPE DETAILS
 *******************************************************/
function hideRecipe() {
  recipesListEl.classList.toggle("hidden"); // remove class hidden from the recipes list section
  recipeDetailsEl.classList.toggle("hidden"); // add class hidden to the recipe details section
  recipeTitleEl.innerHTML = "";
  recipeIngredientsEl.innerHTML = "";
  recipeMethodEl.innerHTML = "";
}
// Event listener for the "Back To Recipes" button
document
  .getElementById("back-to-recipes")
  .addEventListener("click", hideRecipe);

/******************************************************
 * DOWNLOAD RECIPE FUNCTION
 *******************************************************/
function downloadRecipe() {
  downloads = Number(sessionStorage.getItem("downloads")) + 1;
  downloadNumberEl.innerHTML = downloads;
  sessionStorage.setItem("downloads", Number(downloads));
}
// Event listener for the "Download Recipe" button
document
  .getElementById("download-recipe")
  .addEventListener("click", downloadRecipe);

/******************************************************
 * LIKE RECIPE FUNCTION
 *******************************************************/
function likeRecipe() {
  likes = Number(sessionStorage.getItem("likes")) + 1;
  likesNumberEl.innerHTML = likes;
  sessionStorage.setItem("likes", Number(likes));
}
// Event listener for the "Like REcipe" button
document.getElementById("like-recipe").addEventListener("click", likeRecipe);
