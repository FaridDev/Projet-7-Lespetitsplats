import { recipes } from "./recipes.js"
import { search, searchByIngredient, searchByAppliance, searchByUstensil } from "./filter.js"
import { generateIngredientList, generateApplianceList, generateUstensilList } from "./generate.js"
import { renderRecipe, renderIngredients, renderAppliances, renderUstensils } from "./render.js"


let searchResult = [];
let ingredientList = [];
let applianceList = [];
let ustensilList = [];
// let filterList = [{value: "coco", type: 'ingredient'},{value: "four", type: 'appliance'}];


/***** recipes filtered by the searchbar *****/

const searchInput = document.getElementById("search")
searchInput.addEventListener("input", (event) => {

    const input = event.target.value.toLowerCase()

    if (input.length >= 3) {
        searchResult = search(recipes, input)
        // searchResult = filterByTag(searchResult);
        document.querySelector('section').innerHTML = ""

        /* generating different list based on searchResult */
        ingredientList = generateIngredientList(searchResult)
        applianceList = generateApplianceList(searchResult)
        ustensilList = generateUstensilList(searchResult)

        searchResult.forEach(result => {
            renderRecipe(result.name, result.ingredients, result.time, result.description)
        })
    } else if (input.length < 3) {
        document.querySelector('section').innerHTML = ""
    }
})

// const ingrList = recipes.map(recipe => recipe.time)
// console.log(ingrList)

/***** searching recipes only by tags *****/

const filterboxIngredients = document.querySelector('#ingredients-list')
const ingredientButton = document.querySelector('#control-ingredient')
ingredientButton.addEventListener("click", () => {
    filterboxIngredients.style.display = 'block'
    ingredientList = generateIngredientList(recipes)
    renderIngredients(ingredientList)
})

const filterboxAppliances = document.querySelector('#appliances-list')
const applianceButton = document.querySelector('#control-appliance')
applianceButton.addEventListener("click", () => {
    filterboxAppliances.style.display = 'block'
    applianceList = generateApplianceList(recipes)
    renderAppliances(applianceList)
})

const filterboxUstensils = document.querySelector('#ustensils-list')
const tertiaryButton = document.querySelector('#control-ustensil')
tertiaryButton.addEventListener("click", () => {
    filterboxUstensils.style.display = 'block'
    ustensilList = generateUstensilList(recipes)
    renderUstensils(ustensilList)
})












/*for (let i = 0; i < recipes.length; i++) {
    const ingredients = recipes[i].ingredients
    const name = recipes[i].name.toLowerCase()
    const description = recipes[i].description.toLowerCase()

    if (name.match(input)) {
        document.querySelector('section').innerHTML = ""
        displayRecipe(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].description)
    }
    else if (description.match(input)) {
        document.querySelector('section').innerHTML = ""
        displayRecipe(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].description)
    }
    else
        for (let j = 0; j < ingredients.length; j++) {
            const ingredient = ingredients[j].ingredient.toLowerCase()

            if (ingredient.match(input)) {
                document.querySelector('section').innerHTML = ""
                displayRecipe(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].description)
            }
        }
}*/
