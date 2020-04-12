/** @format */
let isLog = localStorage.getItem("isLogin");
if (isLog == "true") {
    const url = "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/book";
    const display = document.querySelector("#display");

    const getData = async () => {
        const response = await fetch(url);
        const result = await response.json();
        const idUser = localStorage.getItem("idUser");

        display.innerHTML = "";

        result.forEach((element) => {
            if (element.key == idUser) {
                display.innerHTML += `<div class="col-md-4 my-2">
            <div class="card card-1">
            <div class="row no-gutters">
                    <div class="col-sm-4">
                        <img src="${element.picture}" alt="image" class="img-thumbnail" />                    
                        </div>
                    <div class="col-sm-8">
                        <div class="card-body">
                        <strong>${element.title}</strong>
                        <hr>
                        <p>${element.author}</p>
                        <hr>
                        <p>${element.publication}</p>
                        <hr>
                            <button class="btn btn-info btn-sm mt-2 readDetail-button" data-toggle="modal" id="readDetail-${element.id}" data-target="#exampleModalCenter">Detail</button>
                            <button class="btn btn-warning btn-sm mt-2 edit-button" id="${element.id}" data-toggle="modal" data-target="#edit">Edit</button>
                            <button class="btn btn-danger btn-sm mt-2 delete-button" id="delete-${element.id}">Delete</button>
                        </div>
                    </div>
                    </div>
                    </div>
            </div>`;
            }
        });
    };

    const addForm = document.getElementById("add-form");

    const addCollection = async (event) => {
        event.preventDefault();
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const publisher = document.querySelector("#publisher").value;
        const thickness = document.querySelector("#thickness").value;
        const publication = document.querySelector("#publication").value;
        const description = document.querySelector("#description").value;
        const price = document.querySelector("#price").value;
        const idUser = localStorage.getItem("idUser");

        const add = {
            title,
            author,
            publisher,
            thickness,
            publication,
            description,
            price,
            key: idUser,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(add),
        });
        await response.json();
        location.reload();
    };

    const deleteCollection = async (event) => {
        if (event.target.matches(".delete-button")) {
            const id = event.target.id.replace("delete-", "");
            const response = await fetch(`${url}/${id}`, {
                method: "DELETE",
            });

            await response.json();

            location.reload();
        }
    };

    const readDetail = async (event) => {
        if (event.target.matches(".readDetail-button")) {
            const id = event.target.id.replace("readDetail-", "");
            const response = await fetch(`${url}/${id}`);
            const result = await response.json();
            let img = document.querySelector("#img");
            let content = document.querySelector("#content");

            img.innerHTML = `<img
            src="${result.picture}"
            class="img-thumbnail"
            alt=""/> 
            <p class="mt-2 text-info">Rp. ${result.price}</p>`;

            content.innerHTML = `<li class="list-group-item"><strong>${result.title}</strong></li>
            <li class="list-group-item"> Author : ${result.author}</li>
            <li class="list-group-item">Publisher : ${result.publisher}</li>
            <li class="list-group-item">Thickness : ${result.thickness}</li>
            <li class="list-group-item">Publication : ${result.publication}</li>
            <li class="list-group-item">${result.description}</li>`;
        }
    };

    const editForm = document.querySelector("#edit-form");
    const readEdit = async (event) => {
        if (event.target.matches(".edit-button")) {
            const id = event.target.id;
            const response = await fetch(`${url}/${id}`);
            const result = await response.json();

            editForm.innerHTML = `
            <div class="form-group">
                <input class="form-control" type="text" id="edit-tittle" placeholder="Title of book" value="${result.title}" required />
            </div>
            <div class="form-group">
                <input class="form-control" type="text" id="edit-author" placeholder="Name of author" value="${result.author}"
                required/>
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <input class="form-control" type="text" id="edit-publisher" placeholder="Publisher" value="${result.publisher}"
                    required/>
                </div>
                <div class="form-group col-md-4">
                    <input class="form-control" type="text" id="edit-thickness" placeholder="Thickness of page" value="${result.thickness}" required />
                </div>
                <div class="form-group col-md-4">
                    <input class="form-control" type="text" id="edit-publication" placeholder="Year of publication" value="${result.publication}" required/>
                </div>
            </div>
            <div class="form-group">
                <textarea class="form-control" type="text" id="edit-description" placeholder="Description of book" required>${result.description}</textarea>
            </div>
            <div class="form-group">
                <input class="form-control" type="text" id="edit-price" placeholder="Price of book" value="${result.price}" required
                />
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary update-button" type="submit" id="${result.id}">Update</button>`;
        }
    };

    const editCollection = async (event) => {
        event.preventDefault();

        if (event.target.matches(".update-button")) {
            const title = document.querySelector("#edit-tittle").value;
            const author = document.querySelector("#edit-author").value;
            const publisher = document.querySelector("#edit-publisher").value;
            const thickness = document.querySelector("#edit-thickness").value;
            const publication = document.querySelector("#edit-publication").value;
            const description = document.querySelector("#edit-description").value;
            const price = document.querySelector("#edit-price").value;

            const update = {
                title,
                author,
                publisher,
                thickness,
                publication,
                description,
                price,
            };
            const id = event.target.id;
            const response = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(update),
            });

            await response.json();

            location.reload();
        }
    };

    let logBtn = document.querySelector("#log");

    let logOut = () => {
        localStorage.setItem("isLogin", false);
        window.location.href = `${window.origin}/index.html`;
    };

    getData();

    addForm.addEventListener("submit", addCollection);
    display.addEventListener("click", deleteCollection);
    editForm.addEventListener("click", editCollection);
    display.addEventListener("click", readDetail);
    display.addEventListener("click", readEdit);
    logBtn.addEventListener("click", logOut);
} else {
    window.location.href = `${window.origin}/login.html`;
}
