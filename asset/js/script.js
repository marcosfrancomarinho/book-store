let index = 0
const image = []

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
    $(".content-carousel").css("transform", `translateX(${-911.281 * index}px)`)
    console.log(index)
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
            $(".icon").show(500)
        }
    }
}

function buy(value) {
    const object = {
        name: value.children[1].innerText,
        price: value.children[3].innerText,
        star: value.children[2].innerText,
        content: value.children[5].innerText,
        img: value.children[0].children[0].src,
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
        $(".section-carousel").html("<h2 class='title-one'>tops livros</h2><a href='#'><img class ='image' src=./asset/image/image-00.jpg></a>")
        loopResponsive()
    }
}
