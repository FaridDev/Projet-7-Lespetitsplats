import { recipes } from "./recipes.js"
import { filterOnKeyup, filterRecipesByTag, filterTagList } from "./filter.js"
import { generateIngList, generateAppList, generateUstList } from "./generate.js"
import { renderRecipeList, renderIngList, renderAppList, renderUstList, renderTag } from "./render.js"


let searchResult = [...recipes] // Array of recipes updated
let filterResult = [...searchResult] // Array of recipes filtered
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

window.onclick = function ingClick (e) {
    if (!e.target.matches('.box-primary') && !e.target.matches('input#input-ingredients') && !e.target.matches('li')) {
        if ((ingBox.dataset.filter = 'active') && (ingLabel.dataset.label = 'inactive') && (ingInput.dataset.input = 'active') && (ingButton.dataset.button = 'on') && (ingDropdown.dataset.list = 'active')) {
            displayFilterbox(ingBox, ingLabel, ingInput, ingButton, ingDropdown)
        }
    }
}

window.onclick = function appClick (e) {
if (!e.target.matches('.box-secondary') && !e.target.matches('input#input-appliances') && !e.target.matches('li')) {
        if ((appBox.dataset.filter = 'active') && (appLabel.dataset.label = 'inactive') && (appInput.dataset.input = 'active') && (appButton.dataset.button = 'on') && (appDropdown.dataset.list = 'active')) {
            displayFilterbox(appBox, appLabel, appInput, appButton, appDropdown)
        }
    }
}

/******************   GET RECIPES BY INPUT RESEARCH   ******************/

/* input main search bar */
mainInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()

    if (input.length >= 3) { /* checking if input word is more than 3 letters */
        document.querySelector('section').innerHTML = ""
        searchResult = filterOnKeyup(recipes, input)
        filterResult = filterRecipesByTag(searchResult)
        renderRecipeList(filterResult)
    } else
        document.querySelector('section').innerHTML = ""
})


/******************   GET RECIPES BY FILTERED TAGS   ******************/

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

function removeSearchTag(tag) { // remove selected tag on search-tags
    tag.parentElement.remove(tag.parentElement)
}

/********  INGREDIENTS FILTERBOX  ********/

function addEventToIngLi() { // add event listener to each ing tag
    const ingLis = document.querySelectorAll('#ingredients-list li')
    ingLis.forEach(li => {
        li.addEventListener('click', () => {
            let selectedTag = li.innerHTML
            ingTagList.push(selectedTag)
            renderTag(selectedTag, "ing") // add data-attribute "ing" to selected tag & display it
            filterResult = filterRecipesByTag(searchResult)
            renderRecipeList(filterResult)
            ingredientList = generateIngList(filterResult) // update ing with filtered recipes
            renderIngList(ingredientList) // display ing list updated
            addEventToIngLi() // call back event listener to each ing li
            handlerLi('#ingredients-list li', '.ing-tag') // remove selected tag from ing list

            const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
            closeTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    removeSearchTag(tag)
                    filterResult = filterRecipesByTag(searchResult)
                    renderRecipeList(filterResult)
                    ingredientList = generateIngList(filterResult)
                    renderIngList(ingredientList)
                    addEventToIngLi()
                })
            })
        })
    })
}

ingBox.onclick = function () {
    if ((ingBox.dataset.filter = 'inactive') && (ingLabel.dataset.label = 'active') && (ingInput.dataset.input = 'inactive') && (ingButton.dataset.button = 'off') && (ingDropdown.dataset.list = 'inactive')) {
        displayFilterbox(ingBox, ingLabel, ingInput, ingButton, ingDropdown)
    }
    ingredientList = generateIngList(filterResult);
    renderIngList(ingredientList)
    addEventToIngLi()
    handlerLi('#ingredients-list li', '.ing-tag')
}

ingInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()
    if (input.length >= 1) {
        ingredientList = filterTagList(ingredientList, input)
        renderIngList(ingredientList)
        addEventToIngLi()
    } else
        ingredientList = generateIngList(filterResult)
    renderIngList(ingredientList)
})

/********  APPLIANCES FILTERBOX  ********/

function addEventToAppLi() { // add event listener to each app tag
    const tags = document.querySelectorAll('#appliances-list li') // All appliances tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML

            appTagList.push(selectedTag)
            renderTag(selectedTag, "app") // add data-attribute "app" to clicked tag & display it
            filterResult = filterRecipesByTag(searchResult);
            renderRecipeList(filterResult)
            applianceList = generateAppList(filterResult) // update appliances once recipes are filtered
            renderAppList(applianceList) // display appliances list
            addEventToAppLi() // call addEventToAppLi() to add again event listener to each app li
            handlerLi('#appliances-list li', '.app-tag') // remove selected tag from ing list

            const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
            closeTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    removeSearchTag(tag)
                    filterResult = filterRecipesByTag(searchResult);
                    renderRecipeList(filterResult)
                    applianceList = generateAppList(filterResult)
                    renderAppList(applianceList)
                    addEventToAppLi()
                })
            })
        })
    })
}

appBox.onclick = function () {
    if ((appBox.dataset.filter = 'inactive') && (appLabel.dataset.label = 'active') && (appInput.dataset.input = 'inactive') && (appButton.dataset.button = 'off') && (appDropdown.dataset.list = 'inactive')) {
        displayFilterbox(appBox, appLabel, appInput, appButton, appDropdown)
    }

    applianceList = generateAppList(filterResult);
    renderAppList(applianceList)
    addEventToAppLi()
    handlerLi('#appliances-list li', '.app-tag')
}

appInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()
    if (input.length >= 1) {
        applianceList = filterTagList(applianceList, input)
        renderAppList(applianceList)
        addEventToAppLi()
    }
    else if (input.length < 1 && appTagList.length >= 1) {
        applianceList = generateAppList(filterResult)
        renderAppList(applianceList)
        addEventToAppLi()
        handlerLi('#appliances-list li', '.app-tag')
    }
})

/********  USTENSILS FILTERBOX  ********/

function addEventToUstLi() { // add event listener to each app tag
    const tags = document.querySelectorAll('#ustensils-list li') // All ustensils tags
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            let selectedTag = tag.innerHTML

            ustTagList.push(selectedTag)
            renderTag(selectedTag, "ust") // add data-attribute "ust" to clicked tag & display it
            filterResult = filterRecipesByTag(searchResult);
            renderRecipeList(filterResult)
            ustensilList = generateUstList(filterResult) // update ustensils once recipes are filtered
            renderUstList(ustensilList) // display ustensils list
            addEventToUstLi() // call addEventToAppLi() to add again event listener to each app li
            handlerLi('#ustensils-list li', '.ust-tag')

            const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
            closeTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    removeSearchTag(tag)
                    filterResult = filterRecipesByTag(searchResult);
                    renderRecipeList(filterResult)
                    ustensilList = generateUstList(filterResult)
                    renderUstList(ustensilList)
                    addEventToUstLi()
                })
            })
        })
    })
}

ustBox.addEventListener('click', () => {
    displayFilterbox(ustBox, ustLabel, ustInput, ustButton, ustDropdown)

    ustensilList = generateUstList(filterResult);
    renderUstList(ustensilList)
    addEventToUstLi()
    handlerLi('#ustensils-list li', '.ust-tag')
})

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