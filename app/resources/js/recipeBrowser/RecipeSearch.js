import { searchRecipe } from "./RecipeSearchAPI.js";
import { outputRecipes } from "./RecipeVisualOutput.js";

const   RECIPE_SEARCH_BUTTON = document.getElementById("recipeSearchButton"),
        RECIPE_SEARCH_INPUT = document.getElementById("recipeSearchInput");

function initRecipeSearch(){
    RECIPE_SEARCH_BUTTON.addEventListener("click", async function () {
        console.log("conga lads");
        let recipeSearch = RECIPE_SEARCH_INPUT.value;
        console.log(recipeSearch);
        let recipeReturn = await searchRecipe(recipeSearch);
        console.log(recipeReturn);
        outputRecipes(recipeReturn);
    });
}

export {initRecipeSearch};