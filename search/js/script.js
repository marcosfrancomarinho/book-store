
const source = (value) => localStorage.setItem("id", JSON.stringify(value))

$(window).ready(async () => {
    const object = await dataJson()
    const id = JSON.parse(localStorage.getItem("id-search"))
    let arr = []
    if (id.type != 404) {
        object.forEach(data => {
            id.forEach(value => {
                if (data.id === value) {
                    arr.push(object[value])
                }
            })
        })
        template({ function: found, arr, object, suggestion})
    }
    else {
        template({ function: noFound, object, suggestion})
    }
})
async function dataJson() {
    const response = await fetch("../asset/js/main.json")
    if (response.status != 404) {
        return response.json()
    }
}
function template(obj) {
    const main = document.querySelector("main")
    if (obj.function.name == "found") {
        main.appendChild(obj.function(obj.arr))
    } else {
        main.appendChild(obj.function())
    }
    main.appendChild(obj.suggestion(obj.object))
}

function found(element) {
    const section = document.createElement('section')
    section.className = "found-books"
    section.innerHTML ="<h2>RESULTADOS:</h2>"
    element.map(data => {
        section.innerHTML += `
        <div class="content-found-books">
            <a href="../shopping/index.html" class="sinopse" >
                <img onclick="source(${data.id})" alt="Livros" src=".${data.image}">
            </a>
            <p>${data.name}</p>
            <div class="star">${star(data.star)}</div>
            <div class="value">R$ ${data.price}</div>
        </div>
        `
    })
    return section
}
function noFound() {
    const section = document.createElement('section')
    section.className = "no-found-books"
    section.innerHTML += `<div>LIVRO NÃO ECONTRADO</div>`
    return section
}
function suggestion(data) {
    const quant = 5
    let random = []
    const section = document.createElement("section")
    section.className = "books-sugestions"
    while (random.length < quant) {
        let number = Math.floor(Math.random() * data.length)
        if (random.indexOf(number) == -1) {
            random.push(number)
        }
    }
    random.map((index) => {
        section.innerHTML += `
        <div class="book-buy">
            <a href="../shopping/index.html" class="sinopse" >
                <img onclick="source(${data[index].id})" alt="livros" src=".${data[index].image}">
            </a>
            <p>${data[index].name}</p>
            <div class="star">${star(data[index].star)}</div>
            <div class="value">R$ ${data[index].price}</div>
            <button class="btn-buy" onclick="source(${data[index].id})">
                <a  href="../shopping/index.html">COMPRAR</a>
            </button>
        </div>`
    })
    return section
}
function star(response) {
    let icon = ""
    for (let index = 0; index < response; index++) {
        icon += "&#11088;"
    }
    icon += ` ${response}.0`
    return icon
}
