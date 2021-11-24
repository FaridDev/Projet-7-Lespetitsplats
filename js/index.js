import { recipes } from "./recipes.js"
import { filterOnKey, filterOnClick, filterByIng, filterByApp, filterByUst } from "./filter.js"
import { generateIngList, generateAppList, generateUstList } from "./generate.js"
import { renderRecipes, renderIngredients, renderAppliances, renderUstensils, renderTags } from "./render.js"


let searchResult = [] // Array of recipes updated
let ingredientList = [] // Array of ingredients
let applianceList = [] // Array of appliances
let ustensilList = [] // Array of ustensils

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

const Dropsdown = document.querySelectorAll('ul')
const ingDropdown = document.getElementById('ingredients-list')
const appDropdown = document.getElementById('appliances-list')
const ustDropdown = document.getElementById('ustensils-list')


/******************   RESEARCH RECIPES BY INPUT SEARCH BAR   ******************/

// input main search bar
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

// activate/deactivate filterbox
function activeBox(filterBox) {
    filterBox.dataset.filter = filterBox.dataset.filter == "inactive" ? "active" : "inactive";
}
// deactivate/activate label
function deactiveLabel(filterLabel) {
    filterLabel.dataset.label = filterLabel.dataset.label == "active" ? "inactive" : "active";
}
// activate/deactivate input
function activeInput(filterInput) {
    filterInput.dataset.input = filterInput.dataset.input == "inactive" ? "active" : "inactive";
}
// switch on/off button
function activeButton(filterButton) {
    filterButton.dataset.button = filterButton.dataset.button == "off" ? "on" : "off";
}
// activate/deactivate dropdown list
function activeDropdown(filterDropdown) {
    filterDropdown.dataset.list = filterDropdown.dataset.list == "inactive" ? "active" : "inactive";
}

/******** filterbox primary ********/
/* ingredients filterbox */
ingLabel.addEventListener('click', () => {
    activeBox(ingBox)
    deactiveLabel(ingLabel)
    activeInput(ingInput)
    activeButton(ingButton)
    activeDropdown(ingDropdown)
    ingredientList = generateIngList(recipes)
    renderIngredients(ingredientList)

    const tags = document.querySelectorAll('#ingredients-list li') // All ingredients tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML
            renderTags(selectedTag, "ing")
        })
    })
})
/* input ingredients search bar */
ingInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()
    if (input.length >= 3) {
        document.querySelector('section').innerHTML = ""
        searchResult = filterByIng(recipes, input)
        searchResult.forEach(result => {
            renderRecipes(result.name, result.ingredients, result.time, result.description)
        })
    } else if (input.length < 3) {
        document.querySelector('section').innerHTML = ""
    }
})

/******** filterbox secondary ********/
/* appliances filterbox */
appLabel.addEventListener('click', () => {
    activeBox(appBox)
    deactiveLabel(appLabel)
    activeInput(appInput)
    activeButton(appButton)
    activeDropdown(appDropdown)
    applianceList = generateAppList(recipes)
    renderAppliances(applianceList)

    const tags = document.querySelectorAll('#appliances-list li') // All appliances tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML
            renderTags(selectedTag, "app") // add data-type to the tag & display it on the DOM
            filterOnClick(recipes, selectedTag) // filter recipes from selected tag

        })
    })
})
/* input appliances search bar */
appInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()
    if (input.length >= 3) {
        document.querySelector('section').innerHTML = ""
        searchResult = filterByApp(recipes, input)
        searchResult.forEach(result => {
            renderRecipes(result.name, result.ingredients, result.time, result.description)
        })
    } else if (input.length < 3) {
        document.querySelector('section').innerHTML = ""
    }
})

/******** filterbox tertiary ********/
/* ustensils filterbox */
ustLabel.addEventListener('click', () => {
    activeBox(ustBox)
    deactiveLabel(ustLabel)
    activeInput(ustInput)
    activeButton(ustButton)
    activeDropdown(ustDropdown)
    ustensilList = generateUstList(recipes)
    renderUstensils(ustensilList)

    const tags = document.querySelectorAll('#ustensils-list li') // All ustensils tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML
            renderTags(selectedTag, "ust") // add data-type to the tag & display it on the DOM
        })
    })
})
/* input ustensils search bar */
ustInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()
    if (input.length >= 3) {
        document.querySelector('section').innerHTML = ""
        searchResult = researchByUst(recipes, input)
        searchResult.forEach(result => {
            renderRecipes(result.name, result.ingredients, result.time, result.description)
        })
    } else if (input.length < 3) {
        document.querySelector('section').innerHTML = ""
    }
})


/******************   RESEARCH RECIPES ONCLICK TAGS   ******************/

// choose & render tags below the main search bar
let tagList = {
    ing: [],
    app: [],
    ust: [],
}

// filtering recipes by tags
function addToTagList(searchResult) {
    const tags = document.querySelectorAll('.tag')
    tags.forEach(tag => {
        document.querySelector('section').innerHTML = ""
        let selectedTag = tag.innerHTML
        searchResult = researchOnClick(recipes, selectedTag)
    })
    searchResult.forEach(result => {
        renderRecipes(result.name, result.ingredients, result.time, result.description)
    })
}

/* search & display recipes while ingredients tags are selected */
ingButton.addEventListener('click', () => {
    ingredientList = generateIngList(recipes)
    renderIngredients(ingredientList)

})

/* search & display recipes while appliances tags are selected */
appButton.addEventListener('click', () => {
    applianceList = generateAppList(recipes)
    renderAppliances(applianceList)
})

/* search & display recipes while ustensils tags are selected */
ustButton.addEventListener('click', () => {
    ustensilList = generateUstList(recipes)
    renderUstensils(ustensilList)
})


