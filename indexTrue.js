/** @format */
let isLog = localStorage.getItem("isLogin");
if (isLog != "true") {
    window.location.href = `${window.origin}/index.html`;
}

const url = "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/book";
const display = document.querySelector("#display");


const getData = async () => {
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);
    display.innerHTML = "";

    result.forEach((element) => {
        // const newDiv = document.createElement("div");

        display.innerHTML += `<div class="col-md-4 my-2">
        <div class="card card-1">
            <div class="row no-gutters">
                <div class="col-sm-4">
                    <img src="${element.picture}" alt="image" class="img-thumbnail" />                    
                </div>
                <div class="col-sm-8">
                <div class="card-body">
                <strong>${element.title}</strong>
                <hr class="my-1">
                <p>${element.author}</p>
                <hr class="my-1">
                <p>${element.publication}</p>
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
    console.log('masuk')
    if (event.target.matches(".readDetail-button")) {
        const id = event.target.id;
        const response = await fetch(`${url}/${id}`);
        const result = await response.json();
        let img = document.querySelector("#img");
        let content = document.querySelector("#content");
        
        console.log(id, "masuk");

        img.innerHTML = `<img
            src="${result.picture}"
            class="img-thumbnail"
            alt=""/> 
            <p class="mt-2 text-info">Rp. ${result.price}</p>`;

        content.innerHTML = `<li class="list-group-item"><strong>${result.title}</strong></li>
        <li class="list-group-item">${result.author}</li>
        <li class="list-group-item">${result.publisher}</li>
        <li class="list-group-item">${result.thickness}</li>
        <li class="list-group-item">${result.publication}</li>
        <li class="list-group-item">${result.description}</li>`;
    }
};


let logBtn = document.querySelector("#log");

let logOut = () => {
    localStorage.setItem("isLogin", false);
    window.location.href = `${window.origin}/login.html`;
};

getData();

logBtn.addEventListener("click", logOut);
display.addEventListener("click", readDetail);
