let object;
let idx;
const convert = (value) => `R$ ${(value).toFixed(2).replace(".", ",")}`
const source = (value) => localStorage.setItem("id", JSON.stringify(value))

$(window).ready(async () => {
    object = await dataJson()
    idx = JSON.parse(localStorage.getItem("id"))
    create(object[idx])
})
async function dataJson() {
    const response = await fetch("../asset/js/main.json")
    if (response.status != 404) {
        return response.json()
    }
}
function create(e) {
    $("title").html(e.name)
    const section = document.createElement('section')
    section.className = "shopping"
    section.innerHTML = `
        <div class="container">
            <div class="image">
                    <img src=.${e.image} alt="Livro">
            </div>
            <div class="content">
                    <p class="title">${e.name}</p>
                    <p class="author">${e.author}</p>
                    <div class="star">${star(e.star)}</div>
                    <div class="value">${convert(e.price)}</div>
                    <div class="content-quant">
                            <label for="quant">Quant:</label>
                            <input type="number" value="1" id="quant" name="quant" oninput="price(this.value)">
                    </div>
                    <button class="btn-buy" onclick="buy()">COMPRAR</button>
                    <div class="info">${e.content.slice(0, 200)}...</div>
                    <div class="read-more" onclick="readMore()"> &#9660; leia mais</div>
                    <div class="read-less" onclick="readLess()"> &#9650; leia menos</div>
            </div>
        </div>
        <div class="register">
        <button onclick="closePage()" class="closed">X</button>
            <div class="location-cep">
                    <h3>Informe o Seu Endereço:</h3>
                    <input type="number" name="cep" id="cep" placeholder="CEP" onchange="search(this)">
                    <input type="text" name="street" id="street" placeholder="RUA">
                    <input type="number" name="number" id="number" placeholder="Nº">
                    <input type="text" name="neighborhood" id="neighborhood" placeholder="BAIRRO">
                    <input type="text" name="city" id="city" placeholder="CIDADE">
                    <input type="text" name="state" id="state" placeholder="ESTADO">
                    <button class="next" onclick="next()">PRÓXIMO</button>
            </div>
            <div class="personal-registration">
                <div class="personal-registration-content">
                    <h3>Dados Pessoais:</h3>
                    <input type="text" name="name" id="name" placeholder="NOME">
                    <input type="email" name="email" id="email" placeholder="EMAIL">
                    <input type="number" name="cpf" id="cpf" placeholder="CPF">
                    <input type="tel" name="phone" id="phone" placeholder="TELEFONE">
                    <button class="buy">COMPRAR</button>
                    <button  class="back" onclick="back()">VOLTAR</button>
                </div>
            </div>
        </div>`
    document.querySelector("main").appendChild(section)
    document.querySelector("main").appendChild(suggestion(object))
}
function suggestion(data) {
    const div = document.createElement("div")
    const section = document.createElement("section")
    const title = document.createElement("h2")
    const quant = 5
    let random = []
    section.className = "books-sugestions"
    div.className = "books-sugestions-content"
    while (random.length < quant) {
        let number = Math.floor(Math.random() * data.length)
        if (random.indexOf(number) == -1 && number != idx) {
            random.push(number)
        }
    }
    title.innerHTML = "você também pode gostar"
    random.map((index) => {
        div.innerHTML += `
            <div class="book-buy">
                <a href="../shopping/index.html" class="sinopse">
                    <img onclick="source(${data[index].id})" alt="livro" src=".${data[index].image}">
                </a>
                <p>${data[index].name}</p>
                <div class="star-suggestion">${star(data[index].star)}</div>
                <div class="value-sugestion">R$ ${(data[index].price).toFixed(2)}</div>
                <button class="btn-suggestion" onclick="source(${data[index].id})">
                    <a href="../shopping/index.html">COMPRAR</a>
                </button>
            </div>`
    })
    section.appendChild(title)
    section.appendChild(div)
    return section
}
function price(value) {
    const currency = object[idx].price;
    $(".value").html(`R$ ${(currency * value).toFixed(2).replace(".", ",")}`)
}
function readMore() {
    $(".read-more").hide()
    $(".read-less").show()
    $(".info").html(object[idx].content)
}
function readLess() {
    $(".read-more").show()
    $(".read-less").hide()
    $(".info").html(`${object[idx].content.slice(0, 200)}...`)
}
async function api(cep) {
    const url = `https://brasilapi.com.br/api/cep/v1/${cep}`
    const response = await fetch(url)
    if (response.status == 200) {
        return response.json()
    } else {
        return null
    }
}
async function search(element) {
    const location = await api(element.value)
    if (location == null) {
        $("#street").val("")
        $("#neighborhood").val("")
        $("#city").val("")
        $("#state").val("")
        alert("CEP NÃO ECONTRADO")
    } else {
        $("#street").val(location.street)
        $("#neighborhood").val(location.neighborhood)
        $("#city").val(location.city)
        $("#state").val(location.state)
    }
}
function next() {
    $(".location-cep").hide(100)
    $(".personal-registration").show(100)
}
function buy() {
    $(".register").show(100)
}
function closePage() {
    $(".location-cep").show()
    $(".personal-registration").hide()
    $(".register").hide()
    $(".register input").val("")
}
function back() {
    $(".location-cep").show()
    $(".personal-registration").hide()
}
function star(response) {
    let icon = ""
    for (let index = 0; index < response; index++) {
        icon += "&#11088;"
    }
    icon += ` ${response}.0`
    return icon
}
$(window).scroll(() => {
    if (window.scrollY > 0) {
        $(".icon").hide(400)
    } else {
        $(".icon").show()
    }
})

function weather() {
    const time = new Date().getHours()
    if (time < 6) {
        return "Bom dia"
    } else if (time >= 12) {
        return "Boa Tarde"
    } else {
        return "Boa Noite"
    }
}
