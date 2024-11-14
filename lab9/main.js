const title1 = document.createElement(`h3`);
title1.textContent = produtos[1].title;
const image1 = document.createElement(`img`);
image1.src = produtos[1].image;
const price1 = document.createElement(`p`);
price1.textContent = "Custo total: " + produtos[1].price;
const description1 = document.createElement(`p`);
description1.textContent = produtos[1].description;

const product1 = document.createElement(`article`);
product1.className = "product1";
product1.innerHTML = title1 + image1 + price1 + description1;
