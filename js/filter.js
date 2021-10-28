import { recipes } from "./recipes.js"



export const ingredientList = []

for (let i = 0; i < recipes.length; i++) {
    const ingredientArray = recipes[i].ingredients

    for (let j = 0; j < ingredientArray.length; j++) {
        const ingredientItem = ingredientArray[j].ingredient
        ingredientList.push(ingredientItem)
    }
}


/* filtering by name */
export function filterByName(value) {
    const result = recipes.filter(item => item.name.toLowerCase().match(value))

    let suggestion = ''
    result.forEach(resultRecipe => suggestion += `<div class="suggestion">${resultRecipe.name}</div>`)

    document.getElementById('suggestions').innerHTML = suggestion
}

/* filtering by description */
export function filterByDescription(value) {
    const result = recipes.filter(item => item.description.toLowerCase().match(value))

    let suggestion = ''
    result.forEach(resultRecipe => suggestion += `<div class="suggestion">${resultRecipe.name}</div>`)

    document.getElementById('suggestions').innerHTML = suggestion
}

/* filtering by ingredients */
export function filterByIngredient(value) {
    const result = ingredientList.filter(item => item.toLowerCase().includes(value))

    let suggestion = ''
    result.forEach(resultRecipe => suggestion += `<div class="suggestion">${resultRecipe}</div>`)

    document.getElementById('suggestions').innerHTML = suggestion
}



