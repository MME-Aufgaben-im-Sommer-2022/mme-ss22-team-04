//i know those are technically meant to be constants but hush I have my reasons
var RECIPE_OUTPUT_NAME = document.getElementById("recipeOutputName"),
    RECIPE_OUTPUT_INGREDIENTS = document.getElementById("recipeOutputIngredients"),
    RECIPE_OUTPUT_STEPS = document.getElementById("recipeOutputSteps");

function outputRecipes(jsonInput, page){
    getNewElements();

    let string = "";
    let activeRecipe = jsonInput.hits[page].recipe;

    activeRecipe.ingredientLines.forEach(element => {
        string = string + element + "\n";
    });

    RECIPE_OUTPUT_NAME.innerHTML = activeRecipe.label;
    RECIPE_OUTPUT_INGREDIENTS.innerHTML = string;
    RECIPE_OUTPUT_STEPS.innerHTML = activeRecipe.url;
}

function getNewElements(){
    RECIPE_OUTPUT_NAME = document.getElementById("recipeOutputName");
    RECIPE_OUTPUT_INGREDIENTS = document.getElementById("recipeOutputIngredients");
    RECIPE_OUTPUT_STEPS = document.getElementById("recipeOutputSteps");
}

export { outputRecipes }