import { getBackupJSON } from "./RecipeBackupList.js";

const   API_KEY = "95247c6eee7e47eeb006804e2da7f79d",
        API_CALL = "https://api.spoonacular.com/recipes/complexSearch?query=$QUERY&number=10&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&apiKey=$API_KEY"
// NOTE: Since we are using the free plan of this API the requests are limited to 150 points a day,
// equaling to ~125 requests a day (I didn't do the math but each request adds extra points for the bonus info returned)

// turns query to API address
function getSearchString(searchInput){
    let searchString = API_CALL.replace(/\$API_KEY/, API_KEY).replace(/\$QUERY/, searchInput);
    return searchString
}

// catches API error
function errorHandle(response){
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

// runs the API call, returning the json document
async function searchRecipe(searchInput){
    let returnData;
    let searchString = getSearchString(searchInput);
    await fetch(searchString) // You can force an api error by changing the searchString value into something else
    .then(errorHandle)
    .then(response => {
        return response.json();
    })
    .then(data => {
        returnData = data;
    })
    .catch(error => {
        console.log(error)
        alert("Something went wrong with the API, so here's a backup list instead (check the console for more details)") 
        returnData = getBackupJSON();
    })
    return returnData;
}
export { searchRecipe };