/******************   FILTER RECIPES BY VALUE   ******************/

/* research recipes by name, description & ingredient with forEach */

export function forEachRecByValue(recipeList, value) {
    let recipeResult = []
    recipeList.forEach((recipe) => {
        let recipeByName = recipe.name.toLowerCase().match(value)
        let recipeByDesc = recipe.description.toLowerCase().match(value)
        let recipeByIng = recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().match(value))
        
        if (recipeByName || recipeByDesc || recipeByIng) {
            recipeResult.push(recipe)
        }        
    })
    return recipeResult
}

/******************   FILTER RECIPES BY TAGS LIST   ******************/

/* filter recipes from ingredients tags */
export function filterByIng(recipeList, value) {
    return recipeList.filter(recipe => recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(value)))
}

/* filter recipes from appliances tags */
export function filterByApp(recipeList, value) {
    return recipeList.filter(recipe => recipe.appliance.toLowerCase().match(value))
}

/* filter recipes from ustensils tags */
export function filterByUst(recipeList, value) {
    return recipeList.filter(recipe => recipe.ustensils.some((ustensil) => ustensil.toLowerCase().match(value)))
}

/* filter recipes by search tags while tag is checked with data-attribute */
export function filterRecByTag(recipeList) {
    let tempRecipeList = [...recipeList]
    const searchTags = document.querySelectorAll('.tag')
    searchTags.forEach(searchTag => { // loop on each tag and and filter by type
        let viewedTag = searchTag.textContent
        const type = searchTag.getAttribute('data-type')

        if (`${type}` === 'ing') {
            tempRecipeList = filterByIng(tempRecipeList, viewedTag)
        }
        else if (`${type}` === 'app') {
            tempRecipeList = filterByApp(tempRecipeList, viewedTag)
        }
        else if (`${type}` === 'ust') {
            tempRecipeList = filterByUst(tempRecipeList, viewedTag)
        }
    })
    return tempRecipeList;
}

/******************   FILTER TAG LIST BY VALUE   ******************/

/* filter tag list by writting an item in input */
export function filterTagList(tagList, value) {
    return tagList.filter(tag => tag.match(value))
}
