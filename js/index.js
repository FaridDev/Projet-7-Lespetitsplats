import { recipes } from "./recipes.js"
import { displayRecipe } from "./render.js"
import { filterByName, filterByDescription, filterByIngredient } from "./filter.js"


for (let i = 0; i < recipes.length; i++) {
    displayRecipe(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].description)
}

const searchInput = document.getElementById("search")
searchInput.addEventListener("input", (event) => {

    var input = event.target.value.toLowerCase()

    if (input.length >= 3) {
        filterByName(input)
        filterByDescription(input)
        // filterByIngredient(input)
    } else if (input.length < 3) {
        document.getElementById("suggestions").innerHTML = ""
    }

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
        else for (let j = 0; j < ingredients.length; j++) {
            const ingredient = ingredients[j].ingredient.toLowerCase()

            if (ingredient.match(input)) {
                document.querySelector('section').innerHTML = ""
                displayRecipe(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].description)
            }
        }
    } */