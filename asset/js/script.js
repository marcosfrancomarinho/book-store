let index = 0
let bookcase;
const source = (value) => localStorage.setItem("ID", JSON.stringify(value))
const width = () => document.querySelector(".content-carousel").children[0].children[0].width + 0.5

$(window).scroll(() => scrollPage())
$(".material-symbols-outlined").click(() => {
    $("nav").toggle(500)
    $("nav").css("display", "flex")
})

$(window).ready(() => {
    bookcase = JSON.parse(localStorage.getItem("books"))
    createCarousel(bookcase)
    createBooks(bookcase)
    allBoks(bookcase)
    scrollPage()
})

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
const loop = setInterval(() => {
    carousel()
    index++
}, 5000)

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
                <img onclick="source(${data.id})" src="${data.image}">
            </a>
            <p>${data.name}</p>
            <div class="star">${star(data.star)}</div>
            <div class="value">R$ ${data.price}</div>
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
function createCarousel(object) {
    const filter = object.filter((data) => data.carousel == true)
    filter.map((data) => {
        document.querySelector(".content-carousel").innerHTML += `
        <a href="./shopping/index.html" target="_blank">
            <img onclick="source(${data.id})"
        src=${data.image}></a>`
    })
}
function allBoks(object) {
    object.map(data => {
        document.querySelector(".all-books").innerHTML += `
        <li onclick="source(${data.id})" class="option">
            <a href="./shopping/index.html" target="_blank">
                ${data.name}
            </a>
        </li>`
    })
}
function search(element) {
    if (element.value.length == 0) {
        $(".all-books").css({ "display": "none" })
    } else {
        $(".all-books").css({ "display": "flex" })
    }
    const value = element.value.toLowerCase()
    const object = document.querySelector(".all-books")
    for (option of object.children) {
        if (option.innerText.includes(value)) {
            option.style.display = "block"
        } else {
            option.style.display = "none"
        }
    }
}


