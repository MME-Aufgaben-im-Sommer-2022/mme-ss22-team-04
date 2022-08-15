const   RECIPE_OUTPUT = document.getElementById("recipeOutput");

function outputRecipes(jsonInput){
    let string = "";

    string = string + jsonInput.hits[0].recipe.label + "\n";
    string = string + jsonInput.hits[0].recipe.url;

    //jsonInput.hits.forEach(element => {
    //    string = string + element.recipe.label + "\n";
    //});
    RECIPE_OUTPUT.innerHTML = string;
}

export { outputRecipes }