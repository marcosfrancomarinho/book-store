let index = 0
const image = []
const containerLinks = []

$(window).scroll(() => scrollPage())

$(".material-symbols-outlined").click(() => {
    $("nav").toggle(500)
    $("nav").css("display", "flex")
})

$(window).ready(() => {
    scrollPage()
    reponsiveCarousel()
})

function carousel() {
    check()
    if (innerWidth < 1500) {
        $(".content-carousel").css("transform", `translateX(${-911.281 * index}px)`)
    } else {
        $(".content-carousel").css("transform", `translateX(${-1114.620 * index}px)`)
    }
}
$(".btn-next").click(() => {
    index++
    check()
    carousel(index)
})
$(".btn-back").click(() => {
    check()
    index--
    carousel(index)
})
function check() {
    if (index < 0) {
        index = 0;
    }
    if (index >= 3) {
        index = 0
    };
}
const loop = setInterval(() => {
    carousel(index)
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

function source(value) {
    const links = document.querySelector(".content-galery")
    for (let index = 0; index < links.children.length; index++) {
        containerLinks.push(links.children[index].children)
    }
    const number = containerLinks.findIndex(data => data[0].children[0].src == value)
    const object = {
        name: containerLinks[number][1].innerText,
        price: containerLinks[number][3].innerText,
        star: containerLinks[number][2].innerText,
        content: containerLinks[number][5].innerText,
        img: containerLinks[number][0].children[0].src,
    }
    localStorage.setItem("book", JSON.stringify(object))
}
function geratorImg() {
    let img = document.querySelector(".content-carousel").children
    for (let index in img) {
        if (typeof img[index] != "function" && typeof img[index] != "number") {
            image.push(img[index].children[0].src)
        }
    }
}

function loopResponsive() {
    let i = 1
    setInterval(() => {
        if (i >= image.length) { i = 0 }
        $(".image").css("transform", "translateX(-500px)")
        $(".image").css("transition", "0.1s all")
        setTimeout(() => {
            $(".image")[0].src = image[i]
            $(".image").css("transform", "translateX(0)")
            i++
        }, 50)
    }, 4000)
}
function reponsiveCarousel() {
    geratorImg()
    if (innerWidth < 600) {
        clearInterval(loop)
        $(".section-carousel").html("<h2 class='title-one'>tops livros</h2><a href='./shopping/index.html' target=_blanck ><img onclick= source(this.src) class ='image' src=../asset/image/image-01.jpg></a>")
        loopResponsive()
    }
}

function teste(value) {
    console.log(value)
}