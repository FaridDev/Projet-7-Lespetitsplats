/******************   FILTERED RECIPES   ******************/

/* research recipes by name, description & ingredient */
export function filterOnKey(recipeList, value) {
    return recipeList.filter(recipe => recipe.name.toLowerCase().match(value) || recipe.description.toLowerCase().match(value) || recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(value)))
}

/* research recipes from filtered tags */
export function filterOnClick(recipeList, tagString) {
    return recipeList.filter(recipe => recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(tagString)) || recipe.appliance.toLowerCase().match(tagString) || recipe.ustensils.some((ustensil) => ustensil.toLowerCase().match(tagString)))
}

/* research recipes from ingredients tags */
export function filterByIng(recipeList, value) {
    return recipeList.filter(recipe => recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(value)))
}

/* research recipes from appliances tags */
export function filterByApp(recipeList, value) {
    return recipeList.filter(recipe => recipe.appliance.toLowerCase().match(value))
}

/* research recipes from ustensils tags */
export function filterByUst(recipeList, value) {
    return recipeList.filter(recipe => recipe.ustensils.some((ustensil) => ustensil.toLowerCase().match(value)))
}


/******************   FILTERED TAGS LIST   ******************/

export function filterList(itemList, value) {
    return itemList.filter(tag => tag.match(value))
}

