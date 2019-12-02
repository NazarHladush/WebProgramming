function addNewsOnPage() {
    let existingNews = getExistingFromLocalStorage("news");
    let news;
    for (news in existingNews) {
        news = JSON.parse(existingNews[news]);

        let div = document.getElementById("news-div");

        let div_1 = document.createElement("div");
        let div_2 = document.createElement("div");
        let img = document.createElement("img");
        let div_3 = document.createElement("div");
        let h5 = document.createElement("h5");
        let p1 = document.createElement("p1");
        let p = document.createElement("p");

        div_1.className = "col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center";
        div_2.className = "card bg-dark";
        div_2.style = "width: 18rem;"
        img.className = "card-img-top";
        div_3.className = "card-body";
        h5.className = "card-title";
        p.className = "card-text";

        let node_text = document.createTextNode(news.text);
        let node_title = document.createTextNode(news.title);
        img.src = news.img;

        div_1.appendChild(div_2);
        div_2.appendChild(img);
        p1.appendChild(node_title);
        h5.appendChild(p1);
        div_2.appendChild(div_3)
        div_3.appendChild(h5);
        p.appendChild(node_text);
        div_3.appendChild(p);
        div.appendChild(div_1);
    }
}

function saveToLocalStorage(object, key) {
    if (isOnline()) {
        alert("Server communication");
    }
    else {
        let existingObjects = getExistingFromLocalStorage(key);
        existingObjects.push(object);
        existingObjects = JSON.stringify(existingObjects);
        localStorage.setItem(key, existingObjects);
    }
}

function getExistingFromLocalStorage(key) {

    let existingObjects = localStorage.getItem(key);
    existingObjects = JSON.parse(existingObjects);
    if (existingObjects === null) {
        existingObjects = [];
    }
    return existingObjects;

}

function isOnline() {
    return window.navigator.onLine;
}


function handleConnectionChange(event) {
    if (event.type === "offline") {
        alert("You are offline")
    }
    if (event.type === "online") {
        alert("Connection established");
        addNewsOnPage();
        localStorage.removeItem('news');

    }
}

// window.onload = function () {
//     addNewsOnPage();
//     // addAppealOnPage();
// }

window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);