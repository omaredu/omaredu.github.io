
var lang = []

function showLang() {
    
}

function fetchLang() {
    return fetch("/lang/langs.json")
    .then(function (response) {
        return response.json()
    }).then(function (json) {
        return json;
    })
}

fetchLang().then(result => {setLang(result)})

function setLang(post) {
    lang = post
}