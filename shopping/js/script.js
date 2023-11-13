let object;

$(window).ready(() => {
    if (localStorage.length != 0) {
        object = JSON.parse(localStorage.getItem("book"))
        create(object)
    }
})

function create(e) {
    $("title").html(e.name)
    const header = document.createElement("header")
    const main = document.createElement('main')
    header.innerHTML = ` 
    <div class="icon">
        <img src="../asset/image/logo.jpg" alt="icon" class="icon">
    </div>`
    main.innerHTML = `
    <div class="container">
        <div class="image">
                <img src=${e.img} alt="Livro">
        </div>
        <div class="content">
                <p class="title">${e.name}</p>
                <div class="star">${e.star}</div>
                <div class="value">${e.price}</div>
                <div class="content-quant">
                        <label for="quant">Quant:</label>
                        <input type="number" value="1" id="quant" name="quant" oninput="price(this.value)">
                </div>
                <button class="btn-buy" onclick="buy()">COMPRAR</button>
                <div class="info">${e.content.slice(0, 500)}</div>
                <div class="read-more" onclick="readMore()"> &#9660; leia mais</div>
                <div class="read-less" onclick="readLess()"> &#9650; leia menos</div>
        </div>
    </div>
    <div class="register">
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
    </div>`
    document.body.appendChild(header)
    document.body.appendChild(main)
}

function price(value) {
    const currency = Number(object.price.replace("R$", "").replace(",", "."))
    $(".value").html(`R$ ${(currency * value).toFixed(2).replace(".", ",")}`)
}

function readMore() {
    $(".read-more").hide()
    $(".read-less").show()
    $(".info").html(object.content)
}
function readLess() {
    $(".read-more").show()
    $(".read-less").hide()
    $(".info").html(object.content.slice(0, 500))
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