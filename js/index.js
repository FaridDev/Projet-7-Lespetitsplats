import { displayRecipe } from "./display.js"
import { recipes } from "./recipes.js"


for (let i = 0; i < recipes.length; i++) {

    displayRecipe(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].description)

}

const searchInput = document.getElementById("search");


searchInput.addEventListener("input", (event) => {
    console.log(event.target.value)

})