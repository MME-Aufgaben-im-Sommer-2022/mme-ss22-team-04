/*const   API_ID = "76767d88",
        API_KEYS = "fe841675e107c4239d0f79d82227fede",
        API_TYPE = "public",
        API_CALL = "https://api.edamam.com/api/recipes/v2?type=$TYPE&q=$QUERY&app_id=$ID&app_key=$KEY";
        */
//That is the old one, just in case. Delete it, or don't

const   API_KEY = "95247c6eee7e47eeb006804e2da7f79d",
        API_CALL = "https://api.spoonacular.com/recipes/complexSearch?query=$QUERY&number=10&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&apiKey=$API_KEY"
// NOTE: Since we are using the free plan of this API the requests are limited to 150 points a day,
// equaling to ~125 requests a day (I didn't do the math but each request adds extra points for the bonus info returned)
// Just saying that because that limit is **REALLY LOW FOR SO MUCH TESTING WE MAY END UP DOING**

function getSearchString(searchInput){
    let searchString = API_CALL.replace(/\$API_KEY/, API_KEY).replace(/\$QUERY/, searchInput);
    return searchString
}

async function searchRecipe(searchInput){
    let returnData;
    let searchString = getSearchString(searchInput);
    await fetch(searchString).then(response => {
        return response.json();
    }).then(data => {
        returnData = data;
    })
    return returnData;
}

export { searchRecipe };