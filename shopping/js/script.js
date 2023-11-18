let object;
let idx;
const source = (value) => localStorage.setItem("id", JSON.stringify(value))
$(window).ready(() => {
    if (localStorage.length != 0) {
        object = JSON.parse(localStorage.getItem("books"))
        idx = JSON.parse(localStorage.getItem("id"))
        create(object[idx])

    }

})

function create(e) {
    $("title").html(e.name)
    const header = document.createElement("header")
    const main = document.createElement('main')
    const footer = document.createElement('footer')
    header.innerHTML = ` 
    <div class="icon">
        <a href="../index.html"><img src="../asset/image/logo.jpg" alt="icon" class="icon"></a>
    </div>`
    main.innerHTML = `
    <section class="container">
        <div class="image">
                <img src=.${e.image} alt="Livro">
        </div>
        <div class="content">
                <p class="title">${e.name}</p>
                <div class="star">${star(e.star)}</div>
                <div class="value">${convert(e.price)}</div>
                <div class="content-quant">
                        <label for="quant">Quant:</label>
                        <input type="number" value="1" id="quant" name="quant" oninput="price(this.value)">
                </div>
                <button class="btn-buy" onclick="buy()">COMPRAR</button>
                <div class="info">${e.content.slice(0, 200)}</div>
                <div class="read-more" onclick="readMore()"> &#9660; leia mais</div>
                <div class="read-less" onclick="readLess()"> &#9650; leia menos</div>
        </div>
    </section>
    <section class="register">
        <div class="location-cep">
                <h3>Seu Endereço</h3>
                <input type="number" name="cep" id="cep" placeholder="CEP" onchange="search(this)">
                <input type="text" name="street" id="street" placeholder="RUA">
                <input type="number" name="number" id="number" placeholder="Nº">
                <input type="text" name="neighborhood" id="neighborhood" placeholder="BAIRRO">
                <input type="text" name="city" id="city" placeholder="CIDADE">
                <input type="text" name="state" id="state" placeholder="ESTADO">
                <input type="button" value="PRÓXIMO" onclick="next()">
                <input type="button" value="&#128473;" onclick="closePage()">
        </div>
        <div class="personal-registration">
                <input type="text" name="name" id="name" placeholder="NOME">
                <input type="text" name="lastname" id="lastname" placeholder="SOBRENOME">
                <input type="number" name="cpf" id="cpf" placeholder="CPF">
                <input type="tel" name="phone" id="phone" placeholder="TELEFONE">
                <input type="button" value="COMPRAR" onclick="finallyBuy()">
                <input type="button" value="&#128473;" onclick="closePage()">
        </div>
    </section>`
    footer.innerHTML = `
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
                <a
                        href="https://www.instagram.c   _marcosmarinho9    fbclid=IwAR0NCjNYkOKXB1hlyQIvB9WR_R6dCRBJjpqw5  5oM2iRrPD_GKREcejRw">Instagram</a>
                <a href="https://twitter.com/marcosmarinho98">Twitter</a>
        </div>`
    document.body.appendChild(header)
    document.body.appendChild(main)
    document.body.appendChild(footer)
    document.querySelector("main").appendChild(suggestion(object))
}

const convert = (value) => `R$ ${(value).toFixed(2).replace(".", ",")}`

function price(value) {
    const currency = object[index].price;
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
    $(".info").html(object[idx].content.slice(0, 200))
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
    $(".register").hide(100)
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
    const section = document.createElement("section")
    const quant = 5
    let random = []
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
