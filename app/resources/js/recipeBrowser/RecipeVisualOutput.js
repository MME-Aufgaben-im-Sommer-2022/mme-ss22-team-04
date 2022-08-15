const   RECIPE_OUTPUT_NAME = document.getElementById("recipeOutputName"),
        RECIPE_OUTPUT_INGREDIENTS = document.getElementById("recipeOutputIngredients"),
        RECIPE_OUTPUT_STEPS = document.getElementById("recipeOutputSteps");

function outputRecipes(jsonInput){
    let string = "";

    jsonInput.hits[0].recipe.ingredientLines.forEach(element => {
        string = string + element + "\n";
    });

    RECIPE_OUTPUT_NAME.innerHTML = jsonInput.hits[0].recipe.label;
    RECIPE_OUTPUT_INGREDIENTS.innerHTML = string;
    RECIPE_OUTPUT_STEPS.innerHTML = jsonInput.hits[0].recipe.url;
}

export { outputRecipes }