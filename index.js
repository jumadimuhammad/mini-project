/** @format */

const url = "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/book";
const display = document.querySelector("#display");
let isLog = localStorage.getItem("isLogin");

if (isLog == "true") {
    window.location.href = `${window.origin}/indexTrue.html`;
}

const getData = async () => {
    const response = await fetch(url);
    const result = await response.json();

    display.innerHTML = "";

    result.forEach((element) => {
        let year = element.publication.slice(0, 4)
        display.innerHTML += `<div class="col-md-4 my-2">
        <div class="card card-1">
            <div class="row no-gutters">
                <div class="col-md-4 text-center">
                    <img src="${element.picture}" alt="image" class="img-thumbnail" />
                    <i class="fas fa-star text-warning"></i><span> ${element.rating} </span>                 
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <strong>${element.title}</strong>
                    <hr class="my-1">
                    <p>${element.author}</p>
                    <hr class="my-1">
                    <p>${year}</p>
                    <hr class="my-1">
                        <button class="btn btn-info btn-sm mt-2 readDetail-button" id="${element.id}" data-toggle="modal" data-target="#detail">Detail</button>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
    });
};

const readDetail = async (event) => {
    console.log("masuk");
    if (event.target.matches(".readDetail-button")) {
        const id = event.target.id;
        const response = await fetch(`${url}/${id}`);
        const result = await response.json();
        let img = document.querySelector("#img");
        let content = document.querySelector("#content");

        console.log(id);

        img.innerHTML = `<img
        src="${result.picture}"
        class="img-thumbnail"
        alt=""/> 
        <p class="mt-2 text-info">Rp. ${result.price}</p>`;

        content.innerHTML = `<li class="list-group-item py-1"><strong>${result.title}</strong></li>
        <li class="list-group-item py-1"> Author : ${result.author}</li>
        <li class="list-group-item py-1">Publisher : ${result.publisher}</li>
        <li class="list-group-item py-1">Thickness : ${result.thickness}</li>
        <li class="list-group-item py-1">Publication : ${result.publication}</li>
        <li class="list-group-item py-1">${result.description}</li>`;
    }
};

getData();

display.addEventListener("click", readDetail);
