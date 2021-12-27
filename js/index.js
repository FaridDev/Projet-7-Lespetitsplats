import { recipes } from "./recipes.js"
import { filterRecByValue, filterRecByTag, filterTagList } from "./filter.js"
import { generateIngList, generateAppList, generateUstList } from "./generate.js"
import { renderRecipeList, renderIngList, renderAppList, renderUstList, renderTag } from "./render.js"


let searchResult = [...recipes] // Array of all reciped
let filterResult = [...searchResult] // Array of filtered recipes

let ingredientList = generateIngList(searchResult) // Array of all ingredients
let filterIngList = [...ingredientList] // Array of filtered ingredients

let applianceList = generateAppList(searchResult) // Array of all appliances
let filterAppList = [...applianceList] // Array of filtered appliances

let ustensilList = generateUstList(searchResult) // Array of all ustensils
let filterUstList = [...ustensilList] // Array of filtered ustensils


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


function switchFilterbox(box, label, input, button, dropdown) { // switch On/Off filterbox
    function activateBox(box) { // activate/deactivate filterbox
        box.dataset.filter = box.dataset.filter == "inactive" ? "active" : "inactive";
    }
    activateBox(box)

    function deactivateLabel(label) { // deactivate/activate label
        label.dataset.label = label.dataset.label == "active" ? "inactive" : "active";
    }
    deactivateLabel(label)

    function activateInput(input) { // activate/deactivate input
        input.dataset.input = input.dataset.input == "inactive" ? "active" : "inactive";
    }
    activateInput(input)

    function activateButton(button) { // switch on/off button
        button.dataset.button = button.dataset.button == "off" ? "on" : "off";
    }
    activateButton(button)

    function activateDropdown(dropdown) { // activate/deactivate dropdown list
        dropdown.dataset.list = dropdown.dataset.list == "inactive" ? "active" : "inactive";
    }
    activateDropdown(dropdown)
}

function openFilterbox(box, label, input, button, dropdown) { // display block filterbox
    if ((box.dataset.filter = 'inactive') && (label.dataset.label = 'active') && (input.dataset.input = 'inactive') && (button.dataset.button = 'off') && (dropdown.dataset.list = 'inactive')) {
        switchFilterbox(box, label, input, button, dropdown)
    }
}

function closeFilterbox(box, label, input, button, dropdown) { // display none filterbox
    if ((box.dataset.filter = 'active') && (label.dataset.label = 'inactive') && (input.dataset.input = 'active') && (button.dataset.button = 'on') && (dropdown.dataset.list = 'active')) {
        switchFilterbox(box, label, input, button, dropdown)
    }
}

function updateListsOfLi() {
    ingredientList = generateIngList(filterResult) // update ing li with filtered recipes
    renderIngList(ingredientList) // display ing li list
    applianceList = generateAppList(filterResult) // update app li with filtered recipes
    renderAppList(applianceList) // display app li list
    ustensilList = generateUstList(filterResult) // update ust with filtered recipes
    renderUstList(ustensilList) // display ust li list
}

function closeAllFilterboxes() {
    closeFilterbox(ingBox, ingLabel, ingInput, ingButton, ingDropdown)
    closeFilterbox(appBox, appLabel, appInput, appButton, appDropdown)
    closeFilterbox(ustBox, ustLabel, ustInput, ustButton, ustDropdown)
}

renderRecipeList(searchResult)

/******************   GET RECIPES BY INPUT RESEARCH   ******************/

mainInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()

    if (input.length >= 1) { /* checking if input word is more than 1 letter */
        closeAllFilterboxes()
        document.querySelector('section').innerHTML = ""
        filterResult = filterRecByValue(recipes, input)
        filterResult = filterRecByTag(filterResult)
        renderRecipeList(filterResult)
    } else {
        document.querySelector('section').innerHTML = ""
    }
})


/******************   GET RECIPES BY FILTERED TAGS   ******************/

function handlerLi(typeListLi, typeTag) { // remove li from the list if selected
    const lis = document.querySelectorAll(`${typeListLi}`)
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

function removeSelectedTag(tag) { // remove selected tag on search-tags
    tag.parentElement.remove(tag.parentElement)
}

function addEventToLi(type, typeListLi, typeTag) { // add event listener to each li
    const ingLis = document.querySelectorAll(`${typeListLi}`)
    ingLis.forEach(li => {
        li.addEventListener('click', () => {
            let selectedTag = li.innerHTML

            renderTag(selectedTag, `${type}`) // add data-attribute "ing" to selected tag & display it
            filterResult = filterRecByTag(searchResult)
            renderRecipeList(filterResult)
            updateListsOfLi() // update all lists of li with filtered recipes
            addEventToLi(`${type}`, `${typeListLi}`, `${typeTag}`) // call back event listener to each ing li
            handlerLi(`${typeListLi}`, `${typeTag}`) // remove selected tag from the list

            const closureBtn = document.querySelectorAll('i.far.fa-times-circle') // closure button for tags
            closureBtn.forEach(tag => {
                tag.addEventListener('click', () => {
                    removeSelectedTag(tag)
                    filterResult = filterRecByTag(searchResult)
                    renderRecipeList(filterResult)
                    updateListsOfLi()
                    addEventToLi(`${type}`, `${typeListLi}`, `${typeTag}`)
                    closeAllFilterboxes()
                })
            })
        })
    })
}


/********  INGREDIENTS FILTERBOX  ********/

ingButton.onclick = function () {
    switchFilterbox(ingBox, ingLabel, ingInput, ingButton, ingDropdown)
    ingredientList = generateIngList(filterResult)
    renderIngList(ingredientList)
    addEventToLi('ing', '#ingredients-list li', '.ing-tag')
    handlerLi('#ingredients-list li', '.ing-tag')
}

ingInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()
    if (input.length >= 1) {
        filterIngList = filterTagList(ingredientList, input)
        renderIngList(filterIngList)
        addEventToLi('ing', '#ingredients-list li', '.ing-tag')
        handlerLi('#ingredients-list li', '.ing-tag')
    }
    else {
        filterIngList = generateIngList(filterResult)
        renderIngList(filterIngList)
        addEventToLi('ing', '#ingredients-list li', '.ing-tag')
        handlerLi('#ingredients-list li', '.ing-tag')
    }
})

/********  APPLIANCES FILTERBOX  ********/

appButton.onclick = function () {
    switchFilterbox(appBox, appLabel, appInput, appButton, appDropdown)
    applianceList = generateAppList(filterResult);
    renderAppList(applianceList)
    addEventToLi('app', '#appliances-list li', '.app-tag')
    handlerLi('#appliances-list li', '.app-tag')
}

appInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()
    if (input.length >= 1) {
        filterAppList = filterTagList(applianceList, input)
        renderAppList(filterAppList)
        addEventToLi('app', '#appliances-list li', '.app-tag')
        handlerLi('#appliances-list li', '.app-tag')
    }
    else {
        filterAppList = generateAppList(filterResult)
        renderAppList(filterAppList)
        addEventToLi('app', '#appliances-list li', '.app-tag')
        handlerLi('#appliances-list li', '.app-tag')
    }
})

/********  USTENSILS FILTERBOX  ********/

ustButton.onclick = function () {
    switchFilterbox(ustBox, ustLabel, ustInput, ustButton, ustDropdown)
    ustensilList = generateUstList(filterResult);
    renderUstList(ustensilList)
    addEventToLi('ust', '#ustensils-list li', '.ust-tag')
    handlerLi('#ustensils-list li', '.ust-tag')
}

ustInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()
    if (input.length >= 1) {
        filterUstList = filterTagList(ustensilList, input)
        renderUstList(filterUstList)
        addEventToLi('ust', '#ustensils-list li', '.ust-tag')
        handlerLi('#ustensils-list li', '.ust-tag')
    } else {
        filterUstList = generateUstList(filterResult)
        renderUstList(filterUstList)
        addEventToLi('ust', '#ustensils-list li', '.ust-tag')
        handlerLi('#ustensils-list li', '.ust-tag')
    }
})

document.addEventListener("click", function(e) {
    if(!ingBox.contains(e.target) && !appBox.contains(e.target) && !ustBox.contains(e.target)) {
        closeAllFilterboxes();
    }
});
