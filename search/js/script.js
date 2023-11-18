
const source = (value) => localStorage.setItem("id", JSON.stringify(value))

$(window).ready(() => {
    const id = JSON.parse(localStorage.getItem("id-search"))
    const object = JSON.parse(localStorage.getItem("books"))
    let arr = []
    if (id.type != 404 || localStorage.length == 0) {
        object.forEach(data => {
            id.forEach(value => {
                if (data.id === value) {
                    arr.push(object[value])
                }
            })
        })
        template({ function: found, arr, object, suggestion, header, footer })
    }
    else {
        template({ function: noFound, object, suggestion, header, footer })
    }
})

function template(obj) {
    const main = document.createElement("main")
    document.body.appendChild(obj.header())
    document.body.appendChild(main)
    document.body.appendChild(obj.footer())
    if (obj.function.name == "found") {
        document.querySelector("main").appendChild(obj.function(obj.arr))
    } else {
        document.querySelector("main").appendChild(obj.function())
    }
    document.querySelector("main").appendChild(obj.suggestion(obj.object))
}

function found(element) {
    const section = document.createElement('section')
    section.className = "found-books"
    element.map(data => {
        section.innerHTML += `
        <h2>Resultados</>
        <div class="container-suggestion">
            <a href="../shopping/index.html" class="sinopse" target="_blank">
                <img onclick="source(${data.id})" src=".${data.image}">
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


function star(response) {
    let icon = ""
    for (let index = 0; index < response; index++) {
        icon += "&#11088;"
    }
    icon += ` ${response}.0`
    return icon
}

function suggestion(data) {
    const quant = 5
    let random = []
    const section = document.createElement("section")
    section.className = "books-sugestions"
    while (random.length < quant) {
        let number = Math.floor(Math.random() * data.length)
        console.log(number)
        if (random.indexOf(number) == -1) {
            random.push(number)
        }
    }
    random.map((index) => {
        section.innerHTML += `
        <div class="book-buy">
            <a href="../shopping/index.html" class="sinopse" target="_blank">
                <img onclick="source(${data[index].id})" src=".${data[index].image}">
            </a>
            <p>${data[index].name}</p>
            <div class="star">${star(data[index].star)}</div>
            <div class="value">R$ ${data[index].price}</div>
            <button class="btn-buy" onclick="source(${data[index].id})">
                <a target="_blank" href="../shopping/index.html">COMPRAR</a>
            </button>
        </div>`
    })
    return section
}
function header() {
    const head = document.createElement("header")
    head.innerHTML = ` 
    <div class="icon">
    <a href="../index.html"><img src="../asset/image/logo.jpg" alt="icon" class="icon"></a>
    </div>`
    return head
}
function footer() {
    const element = document.createElement("footer")
    element.innerHTML = `
        <div class="client">
            <h3>Antendimento</h3>
            <a href="">Política de Vendas Trocas e Privacidade</a>
            <a href="">Termos e Condições de Compra</a>
            <a href="">Fale Conosco</a>
        </div>
        <div class="institution">
            <h3>Institucional</h3>
            <a href="">Sobre a Book Store</a>
            <a href="">Relações com Investidores</a>
            <a href="">Trabalhe Conosco</a>
            <a href="">Seja um parceiro</a>
        </div>
        <div class="create">
            <h4> criado por &copy;marcosmarinho</h4>
            <ahref="https://www.instagram.com/_marcosmarinho98/?fbclid=IwAR0NCjNYkOKXB1hlyQIvB9WR_R6dCRBJjpqw5EMG5oM2iRrPD_GKREcejRw">Instagram</a>
            <a href="https://twitter.com/marcosmarinho98">Twitter</a>
        </div>`
    return element
}