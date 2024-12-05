document.addEventListener("DOMContentLoaded", function() {
    inicializarLocalStorage();
    fetch("https://deisishop.pythonanywhere.com/products/")
        .then(response => response.json())
        .then(produtos => {
            carregarProdutos(produtos);
            configurarFiltros(produtos);
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
    
    carregarCategorias();
    configurarBotaoAdicionaTodos();
});

function carregarCategorias() {
    fetch("https://deisishop.pythonanywhere.com/categories/")
        .then(response => response.json())
        .then(categorias => {
            const filtroCategoria = document.querySelector("#categoria-filter");
            filtroCategoria.innerHTML = '<option value="">Todas as categorias</option>';
            categorias.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria;
                option.textContent = categoria;
                filtroCategoria.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));
}

function filtrarProdutos(produtos) {
    const categoriaSelecionada = document.querySelector("#categoria-filter").value;
    const ordenacao = document.querySelector("#ordem-filter").value;
    const pesquisa = document.querySelector("#pesquisa-filter").value.toLowerCase();

    let produtosFiltrados = produtos;

    if (categoriaSelecionada) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.category == categoriaSelecionada);
    }
    if (pesquisa) {
        produtosFiltrados = produtosFiltrados.filter(produto => 
            produto.description.toLowerCase().includes(pesquisa)
        );
    }
    if (ordenacao === "menor") {
        produtosFiltrados.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (ordenacao === "maior") {
        produtosFiltrados.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    carregarProdutos(produtosFiltrados);
}

function configurarFiltros(produtos) {
    document.querySelector("#categoria-filter").addEventListener("change", () => filtrarProdutos(produtos));
    document.querySelector("#ordem-filter").addEventListener("change", () => filtrarProdutos(produtos));
    document.querySelector("#pesquisa-filter").addEventListener("keyup", () => filtrarProdutos(produtos));
}

function inicializarLocalStorage() {
    if (!localStorage.getItem("produtos-selecionados")) {
        localStorage.setItem("produtos-selecionados", JSON.stringify([]));
    }
}

function carregarProdutos(produtos) {
    const container = document.querySelector("#productsContainer"); 
    container.innerHTML = "";

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
   
    cart.forEach((produto, index) => {
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
        totalElement.textContent = `Preço Total: ${total.toFixed(2)}€`;
    }
}

function configurarBotaoAdicionaTodos() {
    const cart = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    const button = document.createElement("button");
    button.textContent = "+ Adicionar todos os itens ao cesto";

    button.addEventListener("click", () => {
        cart.forEach((produto, index) => {
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
    
            atualizaCesto(produto);
        });
    });
}