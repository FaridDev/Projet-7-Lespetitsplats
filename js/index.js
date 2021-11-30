import { recipes } from "./recipes.js"
import { filterOnKeyup, filterOnclick, filterByIng, filterByApp, filterByUst, filterList } from "./filter.js"
import { generateIngList, generateAppList, generateUstList } from "./generate.js"
import { renderRecipes, renderIng, renderApp, renderUst, renderTag } from "./render.js"


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
function removeTag(tag) {
    // tag.dataset.status = tag.dataset.status == "on" ? "off" : "on";
    tag.parentElement.remove(tag.parentElement)
}


/******************   GET RECIPES BY INPUT RESEARCH   ******************/

/* input main search bar */
mainInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase()

    if (input.length >= 3) { /* checking if the word is more than 3 letters */
        document.querySelector('section').innerHTML = ""
        searchResult = filterOnKeyup(recipes, input)
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
    activateInput(ingInput)
    activateButton(ingButton)
    activateDropdown(ingDropdown)

    /* check if something is written in main search bar before generating ingredients list */
    if (mainInput.value.length >= 3) {
        ingredientList = generateIngList(searchResult)
        renderIng(ingredientList)
        addEventToIngLi()
    }
    else {
        ingredientList = generateIngList(recipes)
        renderIng(ingredientList)
        addEventToIngLi()
    }

    /* check if something is written in ingredients search bar before generating ingredients list */
    ingInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        if (ingInput.value.length >= 3) {
            ingredientList = filterList(ingredientList, input)
            renderIng(ingredientList)
            addEventToIngLi()
        } else {
            ingredientList = generateIngList(searchResult)
            renderIng(ingredientList)
            addEventToIngLi()
        }
    })

    /* check if ingredients tags are selected before generating ingredients list & display recipes */
    function addEventToIngLi() {
        const tags = document.querySelectorAll('#ingredients-list li') // All ingredients tags
        tags.forEach(ingTag => {
            ingTag.addEventListener('click', () => {
                let selectedTag = ingTag.innerHTML
                // if (searchResult.length >= 1) {
                //     searchResult = filterOnclick(searchResult, selectedTag)
                // }
                // else {
                //     searchResult = filterOnclick(recipes, selectedTag)
                // }
                renderTag(selectedTag, "ing") //add data-attribute "ing" to clicked tag & display it

                const searchTags = document.querySelectorAll('.tag')
                searchTags.forEach(searchTag => {
                    let viewedTag = searchTag.textContent
                    console.log(viewedTag)
                    searchResult = filterByIng(recipes, viewedTag)
                    console.log(searchResult)
                })

                // code qui parcours les tags et applique les bons filtres


                ingredientList = generateIngList(searchResult)
                renderIng(ingredientList)
                addEventToIngLi()

                document.querySelector('section').innerHTML = ""
                searchResult.forEach(result => {
                    renderRecipes(result.name, result.ingredients, result.time, result.description)
                })

                const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
                closeTags.forEach(tag => {
                    tag.addEventListener('click', () => {
                        removeTag(tag)
                    })
                })
            })
        })
    }

})

/********  APPLIANCES FILTERBOX  ********/
appLabel.addEventListener('click', () => {
    /* display appliances filterbox */
    activateBox(appBox)
    deactivateLabel(appLabel)
    activateInput(appInput)
    activateButton(appButton)
    activateDropdown(appDropdown)

    /* check if something is written in main search bar before generating appliances list */
    if (mainInput.value.length >= 3) {
        applianceList = generateAppList(searchResult)
        renderApp(applianceList)
        addEventToAppLi()
    }
    else {
        applianceList = generateAppList(recipes)
        renderApp(applianceList)
        addEventToAppLi()
    }

    /* check if something is written in appliances search bar before generating appliances list */
    appInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        if (appInput.value.length >= 3) {
            applianceList = filterList(applianceList, input)
            renderApp(applianceList)
            addEventToAppLi()
        } else {
            applianceList = generateAppList(searchResult)
            renderApp(applianceList)
            addEventToAppLi()
        }
    })

    /* check if appliances tags are selected before generating appliances list & display recipes */
    function addEventToAppLi() {
        const tags = document.querySelectorAll('#appliances-list li') // All appliances tags
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                let selectedTag = tag.innerHTML
                // if (searchResult.length >= 1) {
                //     searchResult = filterOnclick(searchResult, selectedTag)
                // }
                // else {
                //     searchResult = filterOnclick(recipes, selectedTag)
                // }
                // deleteTag(ingTag)
                renderTag(selectedTag, "app") //add data-attribute "app" to clicked tag & display it

                const searchTags = document.querySelectorAll('.tag')
                searchTags.forEach(searchTag => {
                    let viewedTag = searchTag.textContent
                    console.log(viewedTag)
                    searchResult = filterByApp(recipes, viewedTag)
                    console.log(searchResult)
                })

                // code qui parcours les tags et applique les bons filtres


                applianceList = generateAppList(searchResult)
                renderApp(applianceList)
                addEventToAppLi()

                document.querySelector('section').innerHTML = ""
                searchResult.forEach(result => {
                    renderRecipes(result.name, result.ingredients, result.time, result.description)
                })

                const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
                closeTags.forEach(tag => {
                    tag.addEventListener('click', () => {
                        removeTag(tag)
                    })
                })
            })
        })
    }
})

/********  USTENSILS FILTERBOX  ********/
ustLabel.addEventListener('click', () => {
    /* display ustensils filterbox */
    activateBox(ustBox)
    deactivateLabel(ustLabel)
    activateInput(ustInput)
    activateButton(ustButton)
    activateDropdown(ustDropdown)

    /* check if something is written in main search bar before generating ustensils list */
    if (mainInput.value.length >= 3) {
        ustensilList = generateUstList(searchResult)
        renderUst(ustensilList)
        addEventToUstLi()
    }
    else {
        ustensilList = generateUstList(recipes)
        renderUst(ustensilList)
        addEventToUstLi()
    }

    /* check if something is written in ustensils search bar before generating ustensils list */
    ustInput.addEventListener("input", (event) => {
        const input = event.target.value.toLowerCase()
        if (ustInput.value.length >= 3) {
            ustensilList = filterList(ustensilList, input)
            renderUst(ustensilList)
            addEventToUstLi()
        } else {
            ustensilList = generateUstList(searchResult)
            renderUst(ustensilList)
            addEventToUstLi()
        }
    })

    /* check if ustensils tags are selected before generating ustensils list & display recipes */
    function addEventToUstLi() {
        const tags = document.querySelectorAll('#ustensils-list li') // All ustensils tags
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                let selectedTag = tag.innerHTML
                // if (searchResult.length >= 1) {
                //     searchResult = filterOnclick(searchResult, selectedTag)
                // }
                // else {
                //     searchResult = filterOnclick(recipes, selectedTag)
                // }
                // deleteTag(ingTag)
                renderTag(selectedTag, "ust") //add data-attribute "ust" display it

                const searchTags = document.querySelectorAll('.tag')
                searchTags.forEach(searchTag => {
                    let viewedTag = searchTag.textContent
                    console.log(viewedTag)
                    searchResult = filterByUst(recipes, viewedTag)
                    console.log(searchResult)
                })

                // code qui parcours les tags et applique les bons filtres


                ustensilList = generateUstList(searchResult)
                renderUst(applianceList)
                addEventToUstLi()

                document.querySelector('section').innerHTML = ""
                searchResult.forEach(result => {
                    renderRecipes(result.name, result.ingredients, result.time, result.description)
                })

                const closeTags = document.querySelectorAll('i.far.fa-times-circle') // close button of tags
                closeTags.forEach(tag => {
                    tag.addEventListener('click', () => {
                        removeTag(tag)
                    })
                })
            })
        })
    }
})

ingButton.addEventListener('click', () => {
    activateBox(ingBox)
    deactivateLabel(ingLabel)
    activateInput(ingInput)
    activateButton(ingButton)
    activateDropdown(ingDropdown)
    ingredientList = generateIngList(recipes)
    renderIng(ingredientList)
    addEventToIngLi()
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


