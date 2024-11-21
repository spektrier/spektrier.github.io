const title1 = document.createElement(`h3`);
title1.textContent = produtos[1].title;
const image1 = document.createElement(`img`);
image1.src = produtos[1].image;
const price1 = document.createElement(`p`);
price1.textContent = "Custo total: " + produtos[1].price;
const description1 = document.createElement(`p`);
description1.textContent = produtos[1].description;

const product1 = document.querySelector(`.product1`);
product1.appendChild(title1);
product1.appendChild(image1);
product1.appendChild(price1);
product1.appendChild(description1);

const title2 = document.createElement(`h3`);
title2.textContent = produtos[2].title;
const image2 = document.createElement(`img`);
image2.src = produtos[2].image;
const price2 = document.createElement(`p`);
price2.textContent = "Custo total: " + produtos[2].price;
const description2 = document.createElement(`p`);
description2.textContent = produtos[2].description;

const product2 = document.querySelector(`.product2`);
product2.appendChild(title2);
product2.appendChild(image2);
product2.appendChild(price2);
product2.appendChild(description2);

const title3 = document.createElement(`h3`);
title3.textContent = produtos[3].title;
const image3 = document.createElement(`img`);
image3.src = produtos[3].image;
const price3 = document.createElement(`p`);
price3.textContent = "Custo total: " + produtos[3].price;
const description3 = document.createElement(`p`);
description3.textContent = produtos[3].description;

const product3 = document.querySelector(`.product2`);
product3.appendChild(title3);
product3.appendChild(image3);
product3.appendChild(price3);
product3.appendChild(description3);
