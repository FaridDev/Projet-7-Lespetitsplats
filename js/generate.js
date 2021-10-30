import { recipes } from "./recipes.js"
import { ingredientList, applianceList, ustensilList } from "./index.js"


/* generating ingredients data */
export function generateIngredient() {
    for (let i = 0; i < ingredientList.length; i++) {
        
        const itemList = document.querySelector('ul')
        const item = document.createElement('li')

        item.textContent = ingredientList[i]
        itemList.append(item)
    }
}

/* generating appliances data */
export function generateAppliance() {
    for (let i = 0; i < applianceList.length; i++) {
       
        const itemList = document.querySelector('ul')
        const item = document.createElement('li')

        item.textContent = applianceList[i]
        itemList.append(item)
    }
}

/* generating ustensils data */
export function generateUstensil() {
    for (let i = 0; i < ustensilList.length; i++) {
        console.log(ustensilList[i])
        const itemList = document.querySelector('ul')
        const item = document.createElement('li')

        item.textContent = ustensilList[i]
        itemList.append(item)
    }
}

