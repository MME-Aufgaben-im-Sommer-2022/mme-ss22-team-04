//i know those are technically meant to be constants but hush I have my reasons
var RECIPE_OUTPUT_NAME = document.getElementById("recipeOutputName"),
    RECIPE_OUTPUT_INGREDIENTS = document.getElementById("recipeOutputIngredients"),
    RECIPE_OUTPUT_STEPS = document.getElementById("recipeOutputSteps");

//can and should still be modified depending on needs

function outputRecipes(jsonInput, page){
    getNewElements();

    let ingredientString = "";
    let recipeString = "";
    let activeRecipe = jsonInput.results[page];

    activeRecipe.extendedIngredients.forEach(element => {
        ingredientString = ingredientString + element.original + "\n";
    }); //if this returns strange words blame the api

    activeRecipe.analyzedInstructions.forEach(partOfRecipe => {
        recipeString = recipeString + partOfRecipe.name + "\n";
        partOfRecipe.steps.forEach(instructionStep => {
            recipeString = recipeString + instructionStep.number + ": "+ instructionStep.step + "\n";
        })
        recipeString = recipeString + "\n";
    });

    RECIPE_OUTPUT_NAME.innerHTML = activeRecipe.title;
    RECIPE_OUTPUT_INGREDIENTS.innerHTML = ingredientString;
    RECIPE_OUTPUT_STEPS.innerHTML = recipeString;
}

function getNewElements(){
    RECIPE_OUTPUT_NAME = document.getElementById("recipeOutputName");
    RECIPE_OUTPUT_INGREDIENTS = document.getElementById("recipeOutputIngredients");
    RECIPE_OUTPUT_STEPS = document.getElementById("recipeOutputSteps");
}

export { outputRecipes }