function generateTags(recipeObject){
    let returnString = "";

    // inefficient but no easier method I know of
    if(recipeObject.vegetarian) returnString += "vegetarian, ";
    if(recipeObject.vegan) returnString += "vegan, ";
    if(recipeObject.glutenFree) returnString += "gluten free, ";
    if(recipeObject.dairyFree) returnString += "dairy free, ";
    if(recipeObject.veryHealthy) returnString += "healthy, ";
    if(recipeObject.cheap) returnString += "cheap, ";
    if(recipeObject.veryPopular) returnString += "popular, ";
    if(recipeObject.sustainable) returnString += "sustainable, ";
    if(recipeObject.lowFodmap) returnString += "low fodmap, "; //what does that even mean

    recipeObject.cuisines.forEach(element => {
        returnString += element + ", "
    });
    
    recipeObject.dishTypes.forEach(element => {
        returnString += element + ", "
    });
    
    recipeObject.diets.forEach(element => {
        returnString += element + ", "
    });
    
    recipeObject.occasions.forEach(element => {
        returnString += element + ", "
    });

    return returnString;
}

export {generateTags}