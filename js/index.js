import { recipes } from "./recipes.js"
import { filterOnKeyup, filterRecipesByTag, filterTagList } from "./filter.js"
import { generateIngList, generateAppList, generateUstList } from "./generate.js"
import { renderRecipeList, renderIngList, renderAppList, renderUstList, renderTag } from "./render.js"


let searchResult = [...recipes] // Array of recipes updated
let filteredRecipe = [...searchResult] // Array of recipes filtered
let ingredientList = [] // Array of all ingredients
let applianceList = [] // Array of all appliances
let ustensilList = [] // Array of all ustensils
let ingTagList = [] // Array of all ing tags in search bar
let appTagList = [] // Array of all app tags in search bar
let ustTagList = [] // Array of all ust tags in search bar


// DOM Elements
const ingBox = document.querySelector('.box-primary')
const appBox = document.querySelector('.box-secondary')
const ustBox = document.querySelector('.box-tertiary')

const ingLabel = document.getElementById('label-ingredients')
const appLabel = document.getElementById('label-appliances')
const ustLabel = document.getElementById('label-ustensils')

const mainInput = document.getElementById('main-input')
const ingInput = document.getElementById('input-ingredients')
const appInput = document.getElementById('input-appliances')
const ustInput = document.getElementById('input-ustensils')

const ingButton = document.getElementById('button-ingredients')
const appButton = document.getElementById('button-appliances')
const ustButton = document.getElementById('button-ustensils')

const ingDropdown = document.getElementById('ingredients-list')
const appDropdown = document.getElementById('appliances-list')
const ustDropdown = document.getElementById('ustensils-list')

renderRecipeList(recipes);


// activate/deactivate filterbox
function activateBox(filterBox) {
    filterBox.dataset.filter = filterBox.dataset.filter == "inactive" ? "active" : "inactive";
}
// deactivate/activate label
function deactivateLabel(filterLabel) {
    filterLabel.dataset.label = filterLabel.dataset.label == "active" ? "inactive" : "active";
}
// activate/deactivate input
function activateInput(filterInput) {
    filterInput.dataset.input = filterInput.dataset.input == "inactive" ? "active" : "inactive";
}
// switch on/off button
function activateButton(filterButton) {
    filterButton.dataset.button = filterButton.dataset.button == "off" ? "on" : "off";
}
// activate/deactivate dropdown list
function activateDropdown(filterDropdown) {
    filterDropdown.dataset.list = filterDropdown.dataset.list == "inactive" ? "active" : "inactive";
}
// deactivate tag on search-tags
function removeSearchTag(tag) {
    tag.parentElement.remove(tag.parentElement)
}

function removeFromTagList(tag) {
    tag.removeChild(tag)
    console.log(tag)
}

/******************   GET RECIPES BY INPUT RESEARCH   ******************/

/* input main search bar */
mainInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()

    if (input.length >= 3) { /* checking if the word is more than 3 letters */
        document.querySelector('section').innerHTML = ""
        searchResult = filterOnKeyup(searchResult, input)
        renderRecipeList(searchResult)
    } else if (input.length < 3) {
        document.querySelector('section').innerHTML = ""
    }
})


/******************   GET RECIPES BY FILTERED RESEARCH   ******************/
function displayFilterbox(box, label, input, button, dropdown) { // display block filterbox
    activateBox(box)
    deactivateLabel(label)
    activateInput(input)
    activateButton(button)
    activateDropdown(dropdown)
}

function handlerLi(typeLis, typeTag) { // remove li form list of lis
    const lis = document.querySelectorAll(`${typeLis}`)
    const tagsSelected = document.querySelectorAll(`${typeTag}`)
    const tagsToRemove = []

    if (tagsSelected.length > 0) {
        tagsSelected.forEach(span => {
            tagsToRemove.push(span)
        })
        tagsToRemove.forEach(tag => {
            lis.forEach(li => {
                if (li.innerHTML === tag.textContent) {
                    li.style.display = 'none'
                }
            })
        })
    }
}

/********  INGREDIENTS FILTERBOX  ********/

function addEventToIngLi() { // add event listener to each ing tag
    const ingLis = document.querySelectorAll('#ingredients-list li')
    ingLis.forEach(li => {
        li.addEventListener('click', () => {
            let selectedTag = li.innerHTML
            ingTagList.push(selectedTag)
            renderTag(selectedTag, "ing") // add data-attribute "ing" to selected tag & display it
            filteredRecipe = filterRecipesByTag(searchResult)
            renderRecipeList(filteredRecipe)
            ingredientList = generateIngList(filteredRecipe) // update ing with filtered recipes
            renderIngList(ingredientList) // display ing list updated
            addEventToIngLi() // call back event listener to each ing li
            handlerLi('#ingredients-list li', '.ing-tag') // remove selected tag from ing list

            const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
            closeTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    removeSearchTag(tag)
                    filteredRecipe = filterRecipesByTag(searchResult)
                    renderRecipeList(filteredRecipe)
                    ingredientList = generateIngList(filteredRecipe)
                    renderIngList(ingredientList)
                    addEventToIngLi()
                })
            })
        })
    })
}

ingButton.addEventListener('click', () => {
    displayFilterbox(ingBox, ingLabel, ingInput, ingButton, ingDropdown)

    /* check if something is written in main search bar before generating ingredients list */
    if (mainInput.value.length >= 3) {
        ingredientList = generateIngList(searchResult)
        renderIngList(ingredientList)
        addEventToIngLi()
        handlerLi('#ingredients-list li', '.ing-tag')
    }
    else if (ingTagList.length >= 1 || appTagList.length >= 1 || ustTagList.length >= 1) {
        ingredientList = generateIngList(filteredRecipe)
        renderIngList(ingredientList)
        addEventToIngLi()
        handlerLi('#ingredients-list li', '.ing-tag')
    }
    else {
        ingredientList = generateIngList(searchResult)
        renderIngList(ingredientList)
        addEventToIngLi()
        handlerLi('#ingredients-list li', '.ing-tag')
        document.querySelector('section').innerHTML = ""
    }

    /* check if something is written in ingredients input before generating ingredients list */
    ingInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        if (input.length >= 1) {
            ingredientList = filterTagList(ingredientList, input)
            renderIngList(ingredientList)
            addEventToIngLi()
        }
        else if (input.length < 1 && ingTagList.length >= 1) {
            ingredientList = generateIngList(filteredRecipe)
            renderIngList(ingredientList)
            addEventToIngLi()
            handlerLi('#ingredients-list li', '.ing-tag')
        }
    })

    /* check if tags are selected in tag list before generating ingredients list */

})

/********  APPLIANCES FILTERBOX  ********/

function addEventToAppLi() { // add event listener to each app tag
    const tags = document.querySelectorAll('#appliances-list li') // All appliances tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML

            appTagList.push(selectedTag)
            renderTag(selectedTag, "app") // add data-attribute "app" to clicked tag & display it
            filteredRecipe = filterRecipesByTag(searchResult);
            renderRecipeList(filteredRecipe)
            applianceList = generateAppList(filteredRecipe) // update appliances once recipes are filtered
            renderAppList(applianceList) // display appliances list
            addEventToAppLi() // call addEventToAppLi() to add again event listener to each app li
            handlerLi('#appliances-list li', '.app-tag') // remove selected tag from ing list

            const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
            closeTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    removeSearchTag(tag)
                    filteredRecipe = filterRecipesByTag(searchResult);
                    renderRecipeList(filteredRecipe)
                    applianceList = generateAppList(filteredRecipe)
                    renderAppList(applianceList)
                    addEventToAppLi()
                })
            })
        })
    })
}

appButton.addEventListener('click', () => {
    displayFilterbox(appBox, appLabel, appInput, appButton, appDropdown)

    /* check if something is written in main search bar before generating appliances list */
    if (mainInput.value.length >= 3) {
        applianceList = generateAppList(searchResult)
        renderAppList(applianceList)
        addEventToAppLi()
        handlerLi('#appliances-list li', '.app-tag')
    }
    else if (appTagList.length >= 1 || ingTagList.length >= 1 || ustTagList.length >= 1) {
        applianceList = generateAppList(filteredRecipe)
        renderAppList(applianceList)
        addEventToAppLi()
        handlerLi('#appliances-list li', '.app-tag')
    }
    else {
        applianceList = generateAppList(searchResult)
        renderAppList(applianceList)
        addEventToAppLi()
        handlerLi('#appliances-list li', '.app-tag')
    }

    /* check if something is written in appliances input before generating appliances list */
    appInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        if (input.length >= 1) {
            applianceList = filterTagList(applianceList, input)
            renderAppList(applianceList)
            addEventToAppLi()
        }
        else if (input.length < 1 && appTagList.length >= 1) {
            applianceList = generateAppList(filteredRecipe)
            renderAppList(applianceList)
            addEventToAppLi()
            handlerLi('#appliances-list li', '.app-tag')
        }
    })


})

/********  USTENSILS FILTERBOX  ********/

function addEventToUstLi() { // add event listener to each app tag
    const tags = document.querySelectorAll('#ustensils-list li') // All ustensils tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML

            ustTagList.push(selectedTag)
            renderTag(selectedTag, "ust") // add data-attribute "ust" to clicked tag & display it
            filteredRecipe = filterRecipesByTag(searchResult);
            renderRecipeList(filteredRecipe)
            ustensilList = generateUstList(filteredRecipe) // update ustensils once recipes are filtered
            renderUstList(ustensilList) // display ustensils list
            addEventToUstLi() // call addEventToAppLi() to add again event listener to each app li
            handlerLi('#ustensils-list li', '.ust-tag')

            const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
            closeTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    removeSearchTag(tag)
                    filteredRecipe = filterRecipesByTag(searchResult);
                    renderRecipeList(filteredRecipe)
                    ustensilList = generateUstList(filteredRecipe)
                    renderUstList(ustensilList)
                    addEventToUstLi()
                })
            })
        })
    })
}

ustButton.addEventListener('click', () => {
    displayFilterbox(ustBox, ustLabel, ustInput, ustButton, ustDropdown)

    /* check if something is written in main search bar before generating ustensils list */
    if (mainInput.value.length >= 3) {
        ustensilList = generateUstList(searchResult)
        renderUstList(ustensilList)
        addEventToUstLi()
        handlerLi('#ustensils-list li', '.ust-tag')
    }
    else if (ustTagList.length >= 1 || appTagList.length >= 1 || ingTagList.length >= 1) {
        ustensilList = generateUstList(filteredRecipe)
        renderUstList(ustensilList)
        addEventToUstLi()
        handlerLi('#ustensils-list li', '.ust-tag')
    }
    else {
        ustensilList = generateUstList(searchResult)
        renderUstList(ustensilList)
        addEventToUstLi()
        handlerLi('#ustensils-list li', '.ust-tag')
    }

    /* check if something is written in ustensils search bar before generating ustensils list */
    ustInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        if (ustInput.value.length >= 3) {
            ustensilList = filterTagList(ustensilList, input)
            renderUstList(ustensilList)
            addEventToUstLi()
        } else {
            ustensilList = generateUstList(searchResult)
            renderUstList(ustensilList)
            addEventToUstLi()
            handlerLi('#ustensils-list li', '.ust-tag')
        }
    })
})