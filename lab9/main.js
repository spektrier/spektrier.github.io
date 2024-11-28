document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos(produtos);
});

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

    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(description);
    article.appendChild(price);

    return article;
}
