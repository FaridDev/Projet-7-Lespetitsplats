export function renderRecipes(name, ingredients, time, description) {
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

export function renderIng(ingredientList) {
    document.getElementById('ingredients-list').innerHTML = "";
    ingredientList.forEach(ingredient => {
        let item = document.createElement('li')
        item.textContent = ingredient
        document.getElementById('ingredients-list').append(item)
    })
}

export function renderApp(applianceList) {
    document.getElementById('appliances-list').innerHTML = "";
    applianceList.forEach(appliance => {
        let item = document.createElement('li')
        item.textContent = appliance
        document.getElementById('appliances-list').append(item)
    })
}

export function renderUst(ustensilList) {
    document.getElementById('ustensils-list').innerHTML = "";
    ustensilList.forEach(ustensil => {
        let item = document.createElement('li')
        item.textContent = ustensil
        document.getElementById('ustensils-list').append(item)
    })
}

/* display selected tags below the search bar */
let tag = ''
export function renderTags(value, type) {
    tag += `<div class="tag" data-type="${type}">${value}</div>`
    document.getElementById('search-tags').innerHTML = tag
}
