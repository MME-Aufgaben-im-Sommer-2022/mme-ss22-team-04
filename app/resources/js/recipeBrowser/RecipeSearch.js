import { searchRecipe } from "./RecipeSearchAPI.js";
import { outputRecipes } from "./RecipeVisualOutput.js";

const   RECIPE_SEARCH_BUTTON = document.getElementById("recipeSearchButton"),
        RECIPE_SEARCH_INPUT = document.getElementById("recipeSearchInput"),
        RECIPE_SEARCH_PREV = document.getElementById("recipeSearchPrev"),
        RECIPE_SEARCH_NEXT = document.getElementById("recipeSearchNext"),
        RECIPE_OUTPUT = document.getElementById("recipeOutput"),
        RECIPE_INVITE = document.getElementById("recipeInvite");

var activeRecipe,
    currentPage = 0;

function initRecipeSearch(){
    RECIPE_SEARCH_BUTTON.addEventListener("click", async function () {
        startSERPPage();
        console.log("started search");

        let recipeSearch = RECIPE_SEARCH_INPUT.value;
        console.log(recipeSearch);

        let recipeReturn = await searchRecipe(recipeSearch);
        console.log(recipeReturn);
        
        //tried making it catch error codes but I guess I'm too stupid for that as of right now

        if(recipeReturn.hits.length === 0){
            console.log("no content");
            createSERPErrorNoRecipe();
            return;
        }

        activeRecipe = recipeReturn;
        currentPage = 0;
        createSERPResult();

        outputRecipes(activeRecipe, currentPage);
        testForPageChange();
    });

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

function createSERPResult(){
    RECIPE_OUTPUT.innerHTML = '<h1 class="name-of-receipt" id="recipeOutputName"></h1><h2 class="ingredients">Ingredients</h2><span id="recipeOutputIngredients"></span><h2 class="steps">Steps</h2><span id="recipeOutputSteps"></span>'
    RECIPE_SEARCH_BUTTON.removeAttribute("disabled");
    RECIPE_INVITE.removeAttribute("disabled");
}

function startSERPPage(){
    RECIPE_OUTPUT.innerHTML = '<h1 class="name-of-receipt">Please wait for the API Response...</h1>'
    RECIPE_SEARCH_BUTTON.setAttribute("disabled","");
    RECIPE_SEARCH_PREV.setAttribute("disabled","");
    RECIPE_SEARCH_NEXT.setAttribute("disabled","");
    RECIPE_INVITE.setAttribute("disabled","");
}

function createSERPErrorNoRecipe(){
    RECIPE_OUTPUT.innerHTML = '<h1 class="name-of-receipt">Error: No recipes found.</h1>'
    RECIPE_SEARCH_BUTTON.removeAttribute("disabled");
}

function testForPageChange(){
    if(currentPage <= 0)
        RECIPE_SEARCH_PREV.setAttribute("disabled","");
    else RECIPE_SEARCH_PREV.removeAttribute("disabled");

    if(currentPage >= activeRecipe.hits.length-1)
        RECIPE_SEARCH_NEXT.setAttribute("disabled","");
    else RECIPE_SEARCH_NEXT.removeAttribute("disabled");
}

function returnCurrentRecipe (){
    return activeRecipe.hits[currentPage];
} //how does this actually work

initRecipeSearch();

export {returnCurrentRecipe};