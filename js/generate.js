/* generate ingredients List */
export function generateIngList(recipeList) {
    let ingredients = []
    recipeList.forEach(recipe => {
        recipe.ingredients.some(ingredientItem => {
            let ingredient = ingredientItem.ingredient.toLowerCase()
            ingredients.push(ingredient)
        })
    })
    return [...new Set(ingredients)]
}

/* generate appliances List */
export function generateAppList(recipeList) {
    let appliances = []
    recipeList.forEach(recipe => {
        let appliance = recipe.appliance.toLowerCase()
        appliances.push(appliance)
    })
    return [...new Set(appliances)].sort()
}

/* generate ustensils List */
export function generateUstList(recipeList) {
    let ustensils = []
    recipeList.forEach(recipe => {
        recipe.ustensils.forEach(ustensilItem => {
            let ustensil = ustensilItem.toLowerCase()
            ustensils.push(ustensil)
        })
    })
    return [...new Set(ustensils)].sort()
}









// /* Array of ingredients */
// export let ingredientList = []
// for (let i = 0; i < recipes.length; i++) {
//     const ingredientArray = recipes[i].ingredients

//     for (let j = 0; j < ingredientArray.length; j++) {
//         const ingredientItem = ingredientArray[j].ingredient.toLowerCase()
//         ingredientList.push(ingredientItem)
//     }
// }

// /* Array of appliances */
// export let applianceList = []
// for (let i = 0; i < recipes.length; i++) {
//     const applianceItem = recipes[i].appliance.toLowerCase()
//     applianceList.push(applianceItem)
// }

// /* Array of ustensils */
// export let ustensilList = []
// for (let i = 0; i < recipes.length; i++) {
//     const ustensilArray = recipes[i].ustensils

//     for (let j = 0; j < ustensilArray.length; j++) {
//         const ustensilItem = ustensilArray[j].toLowerCase()
//         ustensilList.push(ustensilItem)
//     }
// }