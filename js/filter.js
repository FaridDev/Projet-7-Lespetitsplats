import { recipes } from "./recipes.js"



const searchInput = document.getElementById("search")

/* filtering by name */
export function filterByName() {
    const input = searchInput.value
    const name = recipes.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
    console.log(name)

    /* display name results on the screen */
    let suggestion = ''
    result.forEach(resultRecipe => suggestion += `<div class="suggestion">${resultRecipe.name}</div>`)

    document.getElementById('suggestions').innerHTML = suggestion
}

/* filtering by ingredients */
export function filterByIngredient() {
    const input = searchInput.value
    
    const ingredient = recipes.filter(item => item.ingredient.toLowerCase().includes(input.toLowerCase()))
    console.log(ingredient)

    /* display ingredient results on the screen */
    let suggestion = ''
    result.forEach(resultRecipe => suggestion += `<div class="suggestion">${resultRecipe.ingredient}</div>`)

    document.getElementById('suggestions').innerHTML = suggestion
}

/* filtering by description */
export function filterByDescription() {
    const input = searchInput.value
    const description = recipes.filter(item => item.description.toLowerCase().includes(input.toLowerCase()))
    console.log(description)

    /* display description results on the screen */
    let suggestion = ''
    result.forEach(resultRecipe => suggestion += `<div class="suggestion">${resultRecipe.description}</div>`)

    document.getElementById('suggestions').innerHTML = suggestion
}

