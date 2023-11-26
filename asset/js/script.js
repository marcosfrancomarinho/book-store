let index = 0
let bookcase;
const charset = str => (str.normalize("NFD").replace(/[^a-zA-Z\s]/g, "")).toLowerCase()
const source = (value) => localStorage.setItem("id", JSON.stringify(value))
const searchId = (value) => localStorage.setItem("id-search", JSON.stringify(value))
const setValue = (value) => localStorage.setItem("value-search", JSON.stringify(value))
const width = () => document.querySelector(".content-carousel").children[0].children[0].width + 0.5

$(window).ready(async () => {
    bookcase = await dataJson()
    createCarousel(bookcase)
    createBooks(bookcase)
    allBoks(bookcase)
    scrollPage()
})
async function dataJson() {
    const response = await fetch("../asset/js/main.json")
    if (response.status != 404) {
        return response.json()
    }
}
function createCarousel(object) {
    const filter = object.filter((data) => data.carousel == true)
    filter.map((data) => {
        document.querySelector(".content-carousel").innerHTML += `
        <a href="./shopping/index.html" target="_blank">
            <img onclick="source(${data.id})" alt="livros"
        src=${data.image}></a>`
    })
}
$(".btn-next").click(() => {
    index++
    check()
    carousel()
})
$(".btn-back").click(() => {
    check()
    index--
    carousel()
})
function check() {
    const length = bookcase.filter((data) => data.carousel == true).length
    if (index < 0) {
        index = 0;
    }
    if (innerWidth > 1500) {
        if (index >= length / 3) {
            index = 0
        }
    } else if (innerWidth < 600) {
        if (index >= length) {
            index = 0
        }
    } else {
        if (index >= length / 4) {
            index = 0
        }
    }
}
function carousel() {
    check()
    if (innerWidth < 600) {
        $(".content-carousel").css("transform", `translateX(${-width() * index}px)`)
    } else if (innerWidth < 1367) {
        $(".content-carousel").css("transform", `translateX(${-width() * 4.15 * index}px)`)
    } else if (innerWidth < 1500) {
        $(".content-carousel").css("transform", `translateX(${-911.281 * index}px)`)
    } else {
        $(".content-carousel").css("transform", `translateX(${-1114.620 * index}px)`)
    }
}
const loop = setInterval(() => {
    carousel()
    index++
}, 1500)
$(window).scroll(() => scrollPage())
$(".material-symbols-outlined").click(() => {
    $("nav").toggle(500)
    $("nav").css("display", "flex")
})
function scrollPage() {
    if (innerWidth > 600) {
        if (window.scrollY > 0) {
            $(".icon").hide()
            $("header").css({ "justify-content": "center", "height": "5vw" })
        } else {
            $(".icon").show()
            $("header").css({ "justify-content": "space-between", "height": "10vw" })
        }
    } else {
        $(".material-symbols-outlined").css("display", "block")
        if (window.scrollY > 0) {
            $(".icon").hide(500)
        } else {
            $(".icon").show()
        }
    }
}
function createBooks(object) {
    const filter = object.filter((data) => data.show == true)
    filter.map((data) => {
        document.querySelector(".content-galery").innerHTML += `
        <div class="book-buy">
            <a href="./shopping/index.html" class="sinopse" target="_blank">
                <img onclick="source(${data.id})" src="${data.image}" alt="livros">
            </a>
            <p>${data.name}</p>
            <div class="star">${star(data.star)}</div>
            <div class="value">R$ ${(data.price).toFixed(2)}</div>
            <button class="btn-buy" onclick="source(${data.id})">
                <a target="_blank" href="./shopping/index.html">COMPRAR</a>
            </button>
        </div>`
    })
}
function star(response) {
    let icon = ""
    for (let index = 0; index < response; index++) {
        icon += "&#11088;"
    }
    icon += ` ${response}.0`
    return icon
}
function allBoks(object) {
    $("#search").focus()
    object.map(data => {
        document.querySelector(".all-books").innerHTML += `
        <li onclick="source(${data.id})" class="option">
            <a href="./shopping/index.html" target="_blank">
                ${data.name}
            </a>
        </li>`
    })
}
function search() {
    let info = document.querySelector("#search")
    info = charset(info.value)
    const ul = document.querySelectorAll(".all-books li")

    if (info.length > 0) {
        $(".all-books").css("display", "flex")
    } else {
        $(".all-books").css("display", "none")
    }
    for (li of ul) {
        const text = charset(li.textContent)
        if (text.includes(info)) {
            li.style.display = "flex"
        } else {
            li.style.display = "none"
        }
    }
}
$(window).keydown(function (e) {
    let input = document.querySelector("#search")
    if (e.keyCode == 13) {
        if (input.value != 0) {
            const element = bookcase.filter(data => {
                const name = charset(data.name)
                const author = charset(data.author)
                const keyword = charset(data.keyword)
                const content = charset(data.content)
                const value = charset(input.value)
                setValue(value)
                if (name.includes(value) || content.includes(value) || keyword.includes(value) || author.includes(value)) {
                    return data
                }
            }).map(data => {
                return data.id
            })
            if (element.length != 0) {
                searchId(element)
                open("./search/index.html")
                $(".all-books").hide(100)
            } else {
                searchId(404)
                open("./search/index.html")
                $(".all-books").css("display", "none")
                input.value = ""
            }
        }
    }
})
$(window).click(() => {
    $(".all-books").hide(100)
})
