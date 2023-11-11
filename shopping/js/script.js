let object;

$(window).ready(() => {
    if (localStorage.length != 0) {
        object = JSON.parse(localStorage.getItem("book"))
        create(object)
    }
})

function create(e) {
    $("title").html(e.name)
    const main = document.createElement('main')
    main.innerHTML = `
<div class="container">
    <a href="" class="image"> <img src=${e.img}></a>
    <div class="content">
        <p class="title">${e.name}</p>
        <div class="star">${e.star}</div>
        <div class="value">${e.price}</div>
        <div class="content-quant"> 
            <label for="quant">Quantidade:</label>
            <input type="number" value="1" id="quant" name="quant" oninput="price(this.value)">
        </div>
        <button class="btn-buy"><a target="_blank" href="https://web.whatsapp.com/send?phone=5599984522451">COMPRAR</a></button>
        <div class="info">${e.content}</div>
    </div>    
</div>`
    document.body.appendChild(main)
}

function price(value) {
    const currency = Number(object.price.replace("R$", "").replace(",", "."))
    $(".value").html(`R$ ${(currency * value).toFixed(2)}`)
}


