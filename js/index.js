import { recipes } from "./recipes.js"
import { filterOnKey, filterOnClick, filterByIng, filterByApp, filterByUst, filterList } from "./filter.js"
import { generateIngList, generateAppList, generateUstList } from "./generate.js"
import { renderRecipes, renderIng, renderApp, renderUst, renderTags } from "./render.js"


let searchResult = [] // Array of recipes updated
let ingredientList = [] // Array of all ingredients
let applianceList = [] // Array of all appliances
let ustensilList = [] // Array of all ustensils

let ingTagList = [] // Array of ingredients tags
let appTagList = [] // Array of appliances tags
let ustTagList = [] // Array of ustensils tags


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

// activate/deactivate filterbox
function activateBox(filterBox) {
    filterBox.dataset.filter = filterBox.dataset.filter == "inactive" ? "active" : "inactive";
}
// deactivate/activate label
function deactivateLabel(filterLabel) {
    filterLabel.dataset.label = filterLabel.dataset.label == "active" ? "inactive" : "active";
}
// activate/deactivate input
function activateInput(filterInput, checkInput) {
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

/******************   GET RECIPES BY INPUT RESEARCH   ******************/

/* input main search bar */
mainInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()

    if (input.length >= 3) { /* checking if the word is more than 3 letters */
        document.querySelector('section').innerHTML = ""
        searchResult = filterOnKey(recipes, input)
        searchResult.forEach(result => {
            renderRecipes(result.name, result.ingredients, result.time, result.description)
        })
    } else if (input.length < 3) {
        document.querySelector('section').innerHTML = ""
    }
})


/******************   GET RECIPES BY FILTERED RESEARCH   ******************/

/********  INGREDIENTS FILTERBOX  ********/
ingLabel.addEventListener('click', () => {
    /* display ingredients filterbox */
    activateBox(ingBox)
    deactivateLabel(ingLabel)
    activateDropdown(ingDropdown)
    activateButton(ingButton)
    activateInput(ingInput)

    /* check if something is written in main search bar before generating ingredients list */
    if (mainInput.value.length >= 3) {
        ingredientList = generateIngList(searchResult)
        renderIng(ingredientList)
    }
    else {
        ingredientList = generateIngList(recipes)
        renderIng(ingredientList)
    }

    /* check if something is written in ingredients search bar before generating ingredients list */
    ingInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        if (ingInput.value.length >= 3) {
            ingredientList = filterList(ingredientList, input)
            renderIng(ingredientList)
        } else {
            ingredientList = generateIngList(searchResult)
            renderIng(ingredientList)
        }
    })

    /* check if ingredients tags are selected before generating ingredients list */
    const tags = document.querySelectorAll('#ingredients-list li') // All ingredients tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML
            renderTags(selectedTag, "ing") //add data-attribute "ing" to clicked tag & display it on the DOM
            ingredientList = generateIngList(searchResult)
            renderIng(ingredientList)
            searchResult = filterOnClick(searchResult, selectedTag)
            document.querySelector('section').innerHTML = ""
            searchResult.forEach(result => {
                renderRecipes(result.name, result.ingredients, result.time, result.description)
            })
        })
    })
})

/********  APPLIANCES FILTERBOX  ********/
/* display appliances filterbox */
appLabel.addEventListener('click', () => {
    activateBox(appBox)
    deactivateLabel(appLabel)
    activateInput(appInput)
    activateButton(appButton)
    activateDropdown(appDropdown)
    applianceList = generateAppList(recipes)
    renderApp(applianceList)

    /* input appliances search bar */
    appInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        if (mainInput.value.length >= 3) {
            applianceList = generateAppList(searchResult)
        } else if (appInput.value.length >= 3) {
            applianceList = filterList(applianceList, input)
        } else {
            applianceList = generateAppList(recipes)
            renderApp(applianceList)
        }
    })

    const tags = document.querySelectorAll('#appliances-list li') // All appliances tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML
            renderTags(selectedTag, "app") // add data-type to the tag & display it on the DOM
        })
    })
})

/********  USTENSILS FILTERBOX  ********/
/* display ustensils filterbox */
ustLabel.addEventListener('click', () => {
    activateBox(ustBox)
    deactivateLabel(ustLabel)
    activateInput(ustInput)
    activateButton(ustButton)
    activateDropdown(ustDropdown)
    ustensilList = generateUstList(recipes)
    renderUst(ustensilList)

    /* input ustensils search bar */
    ustInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        ustensilList = generateUstList(recipes)
        ustensilList = filterList(ustensilList, input)
        renderUst(ustensilList)
    })

    const tags = document.querySelectorAll('#ustensils-list li') // All ustensils tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML
            renderTags(selectedTag, "ust") // add data-type to the tag & display it on the DOM
        })
    })
})

// get tags selected from the DOM and push them in tag list

function addTagList(type) {
    const tags = document.querySelectorAll('.tag')
    tags.forEach(tag => {

    })
}

ingButton.addEventListener('click', () => {
    activateBox(ingBox)
    deactivateLabel(ingLabel)
    activateInput(ingInput)
    activateButton(ingButton)
    activateDropdown(ingDropdown)
    ingredientList = generateIngList(recipes)
    renderIng(ingredientList)
})

appButton.addEventListener('click', () => {
    activateBox(appBox)
    deactivateLabel(appLabel)
    activateInput(appInput)
    activateButton(appButton)
    activateDropdown(appDropdown)
    applianceList = generateAppList(recipes)
    renderApp(applianceList)
})

ustButton.addEventListener('click', () => {
    activateBox(ustBox)
    deactivateLabel(ustLabel)
    activateInput(ustInput)
    activateButton(ustButton)
    activateDropdown(ustDropdown)
    ustensilList = generateUstList(recipes)
    renderUst(ustensilList)
})


