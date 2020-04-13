/** @format */
let isLog = localStorage.getItem("isLogin");
if (isLog == "true") {
    const url = "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/user";

    const getData = async () => {
        const display = document.querySelector("#display");
        const id = localStorage.getItem("idUser");
        const response = await fetch(`${url}/${id}`);
        const result = await response.json();

        display.innerHTML = `
        <div class="col-md-8 my-2">
        <div class="card card-1">
        <div class="row no-gutters">
                <div class="col-sm-4">
                    <img src="${result.avatar}" alt="image" class="card-img" />                    
                    </div>
                <div class="col-sm-8">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">${result.fullName}</li>
                        <li class="list-group-item">${result.userName}</li>
                        <li class="list-group-item">${result.email}</li>
                        </ul>
                        <button class="btn btn-info btn-sm mt-2 readDetail-button" id="${result.id}" data-toggle="modal" data-target="#detail">Detail</button>
                        <button class="btn btn-warning btn-sm mt-2 edit-button" id="${result.id}" data-toggle="modal" data-target="#edit">Edit</button>
                    </div>
                </div>
                </div>
                </div>
        </div>`;
    };

    const readDetail = async (event) => {
        const id = event.target.id;
        if (event.target.matches(".readDetail-button")) {
            const response = await fetch(`${url}/${id}`);
            const result = await response.json();
            let img = document.querySelector("#img");
            let content = document.querySelector("#content");

            console.log(id);

            img.innerHTML = `<img
            src="${result.avatar}"
            class="img-thumbnail"
            alt=""/>`;

            content.innerHTML = `
            <li class="list-group-item"><p>Id : ${result.id} </p></li>
            <li class="list-group-item"><p>Full name : ${result.fullName} </p></li>
            <li class="list-group-item"><p>User name : ${result.userName} </p></li>
            <li class="list-group-item"><p>Email : ${result.email} </p></li>            
            <li class="list-group-item"><p>Created : ${result.createdAt} </p></li>`;
        }
    };

    const readEdit = async (event) => {
        console.log("masuk");
        if (event.target.matches(".edit-button")) {
            const id = event.target.id;
            console.log(id);
            const response = await fetch(`${url}/${id}`);
            const result = await response.json();
            const editForm = document.querySelector("#edit-form");

            editForm.innerHTML = `
            <div class="form-group">
                <input class="form-control" type="text" id="fullName" placeholder="Full name" value="${result.fullName}" required/>
            </div>
            <div class="form-group">
                <input
                                        class="form-control"
                                        type="text"
                                        id="userName"
                                        placeholder="User name"
                                        value="${result.userName}" readOnly required
                                    />
                                </div>
                                <div class="form-group">
                                <input
                                    class="form-control"
                                    type="email"
                                    id="email"
                                    placeholder="Email" value="${result.email}" readOnly
                                    required
                                />
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <input
                                        class="form-control"
                                        type="password"
                                        id="password"
                                        placeholder="New password" value="${result.password}"
                                        required
                                    />
                                </div>
                                <div class="form-group col-md-6">
                                    <input
                                        class="form-control"
                                        type="password"
                                        id="password1"
                                        placeholder="Confirm new password" value="${result.password}"
                                        required
                                    />
                                </div>
                            </div>
            
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary update-button" type="submit" id="${result.id}">Update</button>`;
        }
    };

    const editForm = document.querySelector("#edit-form");
    const editProfile = async (event) => {
        event.preventDefault();
        if (event.target.matches(".update-button")) {
            const pwd1 = document.querySelector("#password").value;
            const pwd2 = document.querySelector("#password1").value;
            if (pwd1 == pwd2) {
                const fullName = document.getElementById("fullName").value;
                const password = document.getElementById("password").value;

                const update = {
                    fullName,
                    password,
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
            } else {
                alert("Passwords don't match");
            }
        }
    };

    let logBtn = document.querySelector("#log");

    let logOut = () => {
        localStorage.setItem("isLogin", false);
        window.location.href = `${window.origin}/index.html`;
    };

    getData();

    display.addEventListener("click", readEdit);
    editForm.addEventListener("click", editProfile);
    logBtn.addEventListener("click", logOut);
    display.addEventListener("click", readDetail);
} else {
    window.location.href = `${window.origin}/login.html`;
}
