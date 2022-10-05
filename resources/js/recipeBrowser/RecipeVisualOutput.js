//these are vars because running these as constants will cause issues with the system
var RECIPE_OUTPUT_NAME = document.getElementById("recipeOutputName"),
    RECIPE_OUTPUT_INGREDIENTS = document.getElementById("recipeOutputIngredients"),
    RECIPE_OUTPUT_STEPS = document.getElementById("recipeOutputSteps");

function outputRecipes(jsonInput, page){
    getNewElements();

    let ingredientString = "",
     recipeString = "",
     activeRecipe = jsonInput.results[page];

    // generates the ingredients for the return page
    activeRecipe.extendedIngredients.forEach(element => {
        ingredientString = ingredientString + element.original + "\n";
    }); 

    // generates the recipe steps for the return page
    activeRecipe.analyzedInstructions.forEach(partOfRecipe => {
        recipeString = recipeString + partOfRecipe.name + "\n";
        partOfRecipe.steps.forEach(instructionStep => {
            recipeString = recipeString + instructionStep.number + ": "+ instructionStep.step + "\n";
        });
        recipeString = recipeString + "\n";
    });

    // writes the return values into the return page
    RECIPE_OUTPUT_NAME.innerHTML = activeRecipe.title;
    RECIPE_OUTPUT_INGREDIENTS.innerHTML = ingredientString;
    RECIPE_OUTPUT_STEPS.innerHTML = recipeString;
}

function getNewElements(){
    RECIPE_OUTPUT_NAME = document.getElementById("recipeOutputName");
    RECIPE_OUTPUT_INGREDIENTS = document.getElementById("recipeOutputIngredients");
    RECIPE_OUTPUT_STEPS = document.getElementById("recipeOutputSteps");
}

export { outputRecipes };