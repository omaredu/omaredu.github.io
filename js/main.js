window.onscroll = function () { scrollCheck(); checkNavBar()}

let navbar = document.getElementById("header")
let dummyNavbar = document.getElementById("dummy-header")

let sticky = navbar.offsetTop

function scrollCheck() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        dummyNavbar.style.display = "block"
    } else {
        dummyNavbar.style.display = "none"
        navbar.classList.remove("sticky")
    }
}

//mobile hamburger menu
let mobileMenu = document.getElementById("mobile-menu")
let menuIsActive = false

function openMenu() {
    mobileMenu.style.display = "block"
}

function closeMenu() {
    mobileMenu.style.display = "none"
}

closeMenu()

function toggleMenu() {
    menuIsActive = !menuIsActive
    
    if (menuIsActive) {
        openMenu()
    } else {
        closeMenu()
    }

}

//list projects
function checkButtonType(type) {
    switch (type) {
        case "playstore":
            return "Play Store"
            break
        case "web":
            return "Website"
            break
        case "github":
            return "GitHub"
            break
        case "itch":
            return "Itch.io"
            break
    }
}
    
async function listProjects() {
    const projectsGet = await fetch("/res/projects/projects.json")
    const projectsJson = await projectsGet.json()
    const projects = projectsJson.projects
    
    const projectsList = document.getElementById("projects-list")
    let actualProject
    let projectLink
    
    await projects.map(project => {
        actualProject = `
        <li>
        <div class="project">
        <img src="res/projects/${project.icon}" style="background-color: ${project.background + ";" + project.style}" rel="tempo"/>
        <p class="project-title">${project.name}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-links">
        ${(project.links).map(link => {
            projectLink = `<a href="${link.url}" class="${link.type}" target="_blank"><p>${checkButtonType(link.type)}</p></a>`
            return projectLink
        }).toString().split(",").join(" ")}
        </div>
        </div>
        </li>
        `
        projectsList.innerHTML += actualProject
    })
}


listProjects()
//0 = home
//1 = portfolio
//2 = contact
function navigateClick(optionClick) {
    //sections
    let homeOffset = 0
    let portfolioOffset = document.getElementById("portfolio-section").offsetTop - 90
    let contactOffset = document.getElementById("contact-section").offsetTop - 90

    let offsetList = [homeOffset, portfolioOffset, contactOffset]

    window.scroll({
        top: offsetList[optionClick],
        behavior: 'smooth'
    })
    closeMenu()
}

//options
let portfolioOptionLink = document.getElementById("portfolio-option")
let homeOptionLink = document.getElementById("home-option")
let contactOptionLink = document.getElementById("contact-option")

let optionList = [homeOptionLink, portfolioOptionLink, contactOptionLink]

function checkOnce(index) {
    for (let i = 0; i < optionList.length; i++) {
        if (i !== index) {
            optionList[i].classList.remove("header-selected")
            optionList[i].classList.add("header-unselected")
        } else {
            optionList[i].classList.remove("header-unselected")
            optionList[i].classList.add("header-selected")
        }
    }
}

function checkNavBar() {
    //sections
    let homeOffset = 0
    let portfolioOffset = document.getElementById("portfolio-section").offsetTop - 90
    let contactOffset = document.getElementById("contact-section").offsetTop - 90

    let offsetList = [homeOffset, portfolioOffset, contactOffset]

    if (window.pageYOffset <= offsetList[0] + 100) {
        checkOnce(0)
    }
    
    if (window.pageYOffset >= offsetList[1]) {
        checkOnce(1)
    }
    
    if (window.pageYOffset >= offsetList[2] - 400) {
        checkOnce(2)
    }
}
