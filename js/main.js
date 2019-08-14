
lang = "english"

function cargando() {
    fetchJson("../proj/projects.json").then(result => { showProjects(result.projects) })
}

function fetchJson(url) {
    return fetch(url)
    .then(function (response) {
        return response.json()
    }).then(function (json) {
        return json;
    })
}

fetchJson("../lang/langs.json").then(result => {setLang(result)})

function setLang(post) {
    switch (lang) {
        case "spanish":
            showLang(post.spanish)
            break
        case "english":
            showLang(post.english)
            break
    }
}

function showLang(data) {
    data.map( value => { 
        try {
            document.getElementById(value.id).innerHTML = value.content
        } catch (error) {
            console.log(error)
        }
    })
    
}

function showProjects(data) {
    localStorage.setItem('projects', JSON.stringify(data));
}


var grid = document.querySelector('.grid');
var msnry = new Masonry(grid, {
    // options...
    itemSelector: '.grid-item',
    columnWidth: 200
});

// init with selector
var msnry = new Masonry('.grid', {
    // options...
});

function openOtherTab(url) {
    window.open(url, '_blank')
}