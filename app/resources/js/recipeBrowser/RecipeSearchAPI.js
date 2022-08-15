const   API_ID = "76767d88",
        API_KEYS = "fe841675e107c4239d0f79d82227fede",
        API_TYPE = "public",
        API_CALL = "https://api.edamam.com/api/recipes/v2?type=$TYPE&q=$QUERY&app_id=$ID&app_key=$KEY";

function getSearchString(searchInput){
    let searchString = API_CALL.replace(/\$ID/, API_ID).replace(/\$KEY/, API_KEYS).replace(/\$TYPE/, API_TYPE).replace(/\$QUERY/, searchInput);
    return searchString;
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