document.addEventListener("DOMContentLoaded", () => {
    inicializarLocalStorage();
    carregarProdutos(produtos);
    criaProdutoCesto();
});

function inicializarLocalStorage() {
    if (!localStorage.getItem("produtos-selecionados")) {
        localStorage.setItem("produtos-selecionados", JSON.stringify([]));
    }
}

function carregarProdutos(produtos) {
    const container = document.querySelector("#productsContainer"); 

    produtos.forEach(produto => {
        console.log(produto.id, produto.title);
        const article = criarProduto(produto); 
        container.appendChild(article); 
    });
}

function criarProduto(produto) {
    const article = document.createElement("article");

    const title = document.createElement("h3");
    title.textContent = produto.title;

    const image = document.createElement("img");
    image.src = produto.image;

    const description = document.createElement("p");
    description.textContent = produto.description;

    const price = document.createElement("p");
    price.textContent = `Custo Total: ` + produto.price + `€`;

    const button = document.createElement("button");
    button.textContent = "+ Adicionar ao cesto";

    button.addEventListener("click", () => {
        atualizaCesto(produto);
    });

    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(description);
    article.appendChild(price);
    article.appendChild(button);

    return article;
}

function atualizaCesto(produto) {
    let produtosSelecionados = JSON.parse(localStorage.getItem("produtos-selecionados"));

    produtosSelecionados.push(produto);

    localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));

    alert(`${produto.title} foi adicionado ao cart!`);

    criaProdutoCesto();

    calcularPrecoTotal(produtosSelecionados);
}

function criaProdutoCesto() {
    const cartContainer = document.querySelector("#cartContainer");
    const cart = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];

    cartContainer.innerHTML = "";
   
    cart.forEach(produto => {
        const article = document.createElement("article");

        const title = document.createElement("h3");
        title.textContent = produto.title;

        const image = document.createElement("img");
        image.src = produto.image;

        const description = document.createElement("p");
        description.textContent = produto.description;

        const price = document.createElement("p");
        price.textContent = `Custo Total: ` + produto.price;

        const removeButton = document.createElement("button");
        removeButton.textContent = "- Remover do Cesto";
        removeButton.addEventListener("click", () => {
        removerDoCesto(index);
    });

        article.appendChild(title);
        article.appendChild(image);
        article.appendChild(description);
        article.appendChild(price);
        article.appendChild(removeButton);

        cartContainer.appendChild(article);
    });

    calcularPrecoTotal(cart);
}

function removerDoCesto(index) {
    let cesto = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];

    cesto.splice(index, 1);

    localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));

    criaProdutoCesto();
}

function calcularPrecoTotal(cart) {
    let total = 0;
    cart.forEach(produto => {
        total += parseFloat(produto.price);
    });

    const totalElement = document.querySelector("#totalPrice");
    if (totalElement) {
        const price = document.createElement("p");
        price.textContent = `Preço Total: ` + total + `€`;
        article.appendChild(price);
    }
}