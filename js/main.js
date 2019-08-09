
lang = "spanish";

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