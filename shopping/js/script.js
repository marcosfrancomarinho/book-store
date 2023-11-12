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
    header.innerHTML = ` 
<div class="icon">
        <img src="../asset/image/logo.jpg" alt="icon" class="icon">
</div>`
    const main = document.createElement('main')
    main.innerHTML = `
<div class="container">
    <div class="image">
        <img src=${e.img}>
    </div>
    <div class="content">
        <p class="title">${e.name}</p>
        <div class="star">${e.star}</div>
        <div class="value">${e.price}</div>
        <div class="content-quant"> 
            <label for="quant">Quant:</label>
            <input type="number" value="1" id="quant" name="quant" oninput="price(this.value)">
        </div>
        <button class="btn-buy"><a target="_blank" href="#">COMPRAR</a></button>
        <div class="info">${e.content.slice(0,500)}</div>
        <div class="read-more" onclick="readMore()"> &#9660; leia mais</div>
        <div class="read-less" onclick="readLess()"> &#9650; leia menos</div> 
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
    $(".info").html(object.content.slice(0,500))
}

