import { searchRecipe } from "./RecipeSearchAPI.js";
import { outputRecipes } from "./RecipeVisualOutput.js";

const RECIPE_SEARCH_BUTTON = document.getElementById("recipeSearchButton"),
        RECIPE_SEARCH_INPUT = document.getElementById("recipeSearchInput"),
        RECIPE_SEARCH_PREV = document.getElementById("recipeSearchPrev"),
        RECIPE_SEARCH_NEXT = document.getElementById("recipeSearchNext"),
        RECIPE_OUTPUT = document.getElementById("recipeOutput"),
        RECIPE_INVITE = document.getElementById("recipeInvite");

var activeRecipe,
    currentPage = 0;

function initRecipeSearch(){
    RECIPE_SEARCH_BUTTON.addEventListener("click", async function () {
        // main recipe search function
        startSERPPage();

        let recipeSearch = RECIPE_SEARCH_INPUT.value,

        //continues in RecipeSearchAPI.js
         recipeReturn = await searchRecipe(recipeSearch);

        if(recipeReturn.totalResults === 0){
            createSERPErrorNoRecipe();
            return;
        }

        activeRecipe = recipeReturn;
        currentPage = 0;
        createSERPResult();

        outputRecipes(activeRecipe, currentPage);
        testForPageChange();
    });

    // functions for previous and next buttons
    RECIPE_SEARCH_PREV.addEventListener("click", function () {
        currentPage--;
        outputRecipes(activeRecipe, currentPage);
        testForPageChange();
    });

    RECIPE_SEARCH_NEXT.addEventListener("click", function () {
        currentPage++;
        outputRecipes(activeRecipe, currentPage);
        testForPageChange();
    });
}

//Shows result text
function createSERPResult(){
    RECIPE_OUTPUT.innerHTML = "<h1 class=\"name-of-receipt\" id=\"recipeOutputName\"></h1><h2 class=\"ingredients\">Ingredients</h2><span id=\"recipeOutputIngredients\"></span><h2 class=\"steps\">Steps</h2><span id=\"recipeOutputSteps\"></span>";
    RECIPE_SEARCH_BUTTON.removeAttribute("disabled");
    RECIPE_INVITE.removeAttribute("disabled");
}

//Shows loading text
function startSERPPage(){
    RECIPE_OUTPUT.innerHTML = "<h1 class=\"name-of-receipt\">Please wait for the API Response...</h1>";
    RECIPE_SEARCH_BUTTON.setAttribute("disabled","");
    RECIPE_SEARCH_PREV.setAttribute("disabled","");
    RECIPE_SEARCH_NEXT.setAttribute("disabled","");
    RECIPE_INVITE.setAttribute("disabled","");
}

//Shows error - no recipes text
function createSERPErrorNoRecipe(){
    RECIPE_OUTPUT.innerHTML = "<h1 class=\"name-of-receipt\">Error: No recipes found.</h1>";
    RECIPE_SEARCH_BUTTON.removeAttribute("disabled");
}

function testForPageChange(){
    if(currentPage <= 0)
        {RECIPE_SEARCH_PREV.setAttribute("disabled","");}
    else {RECIPE_SEARCH_PREV.removeAttribute("disabled");}

    if(currentPage >= Math.min(activeRecipe.totalResults-1, activeRecipe.number-1))
        {RECIPE_SEARCH_NEXT.setAttribute("disabled","");}
    else {RECIPE_SEARCH_NEXT.removeAttribute("disabled");}
}

function returnCurrentRecipe (){
    return activeRecipe.results[currentPage];
}

initRecipeSearch();

export {returnCurrentRecipe};
