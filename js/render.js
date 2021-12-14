export function renderRecipe(name, ingredients, time, description) {
    const article = document.createElement('article')
    const cardPicture = document.createElement('div')
    cardPicture.className = 'card-picture'
    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    const cardHeader = document.createElement('div')
    cardHeader.className = 'card-header'
    const title = document.createElement('h2')
    title.textContent = name
    cardHeader.append(title)
    const clock = document.createElement('i')
    clock.className = 'fas fa-clock'
    clock.innerHTML = '<b>' + time + '</b>' + '<b> min</b>'
    cardHeader.append(clock)
    cardBody.append(cardHeader)

    const cardContainer = document.createElement('div')
    cardContainer.className = 'card-container'
    const ul = document.createElement('ul')
    for (let i = 0; i < ingredients.length; i++) {
        const li = document.createElement('li')
        li.innerHTML = '<span>' + ingredients[i].ingredient + '</span>' + ': ' + (ingredients[i].quantity || '') + ' ' + (ingredients[i].unit || '') + '<br>'
        ul.append(li)
        cardContainer.append(ul)
    }
    cardBody.append(cardContainer)
    const method = document.createElement('p')
    method.textContent = description
    cardContainer.append(method)
    cardBody.append(cardContainer)

    article.append(cardPicture)
    article.append(cardBody)

    document.querySelector('section').append(article)
}

export function renderRecipeList(recipeList) {
    document.querySelector('section').innerHTML = "";
    recipeList.forEach((recipe) => {
        renderRecipe(recipe.name, recipe.ingredients, recipe.time, recipe.description);
    })
}

export function renderIngList(ingredientList) {
    document.getElementById('ingredients-list').innerHTML = "";
    ingredientList.forEach(ingredient => {
        let ing = document.createElement('li')
        ing.textContent = ingredient
        document.getElementById('ingredients-list').append(ing)
    })
}

export function renderAppList(applianceList) {
    document.getElementById('appliances-list').innerHTML = "";
    applianceList.forEach(appliance => {
        let app = document.createElement('li')
        app.textContent = appliance
        document.getElementById('appliances-list').append(app)
    })
}

export function renderUstList(ustensilList) {
    document.getElementById('ustensils-list').innerHTML = "";
    ustensilList.forEach(ustensil => {
        let ust = document.createElement('li')
        ust.textContent = ustensil
        document.getElementById('ustensils-list').append(ust)
    })
}

/* display selected tags below the search bar */
export function renderTag(value, type) {
    let tag = document.createElement('span')
    tag.className = 'tag'+' '+(`${type}`+'-tag')
    tag.setAttribute("data-type", `${type}`)
    tag.innerHTML = `${value}`

    let closeBtn = document.createElement('i')
    closeBtn.className = 'far fa-times-circle'
    closeBtn.setAttribute('data-status', 'on')

    tag.append(closeBtn)
    document.getElementById('search-tags').append(tag)
}
