/* filtering by name, description & ingredient */
export function search(recipeList, value) {
    return recipeList.filter(recipe => recipe.name.toLowerCase().match(value) || recipe.description.toLowerCase().match(value) || recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(value)))
}

/* filtering by ingredients tags */
export function searchByIngredient(recipeList, value) {
    return recipeList.filter(recipe => recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(value)))
}

/* filtering by appliances tags */
export function searchByAppliance(recipeList, value) {
    return recipeList.filter(recipe => recipe.appliance.toLowerCase().match(value))
}

/* filtering by ustensils tags */
export function searchByUstensil(recipeList, value) {
    return recipeList.filter(recipe => recipe.ustensils.some((ustensil) => ustensil.toLowerCase().match(value)))
}