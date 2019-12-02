function createAppeal() {

    let text = document.getElementById("newAppealText");
    if (text.value.trim() === "") {
        console.log("Invalid value");
        return;
    }
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let text1 = text.value;
    let Appeal = {
        appeal: text1,
        date: date,
        time: time,
        user: "Name Surname"
    };

    let serialNewAppeal = JSON.stringify(Appeal);
    saveToLocalStorage(serialNewAppeal, "fans_appeals");

    document.getElementById("newAppealText").value = "";
}

function addAppealOnPage() {
    var existingAppeals = getExistingFromLocalStorage("fans_appeals");
    let appeal;
    for (appeal in existingAppeals) {
        appeal = JSON.parse(existingAppeals[appeal]);

        var appeal1 = document.createElement("div")
        appeal1.className = "row mt-3 p-3 appeal";
        var userData = document.createElement("div");
        userData.className = "col-4 col-md-2 text-center";
        var textBody = document.createElement("div");
        textBody.className = "col-8 col-md-10";

        var p1 = document.createElement("p");
        var t = appeal.user + " <br /> " + appeal.date + " <br /> " + appeal.time;
        p1.innerHTML = t;
        textBody.innerHTML = appeal.appeal;

        userData.appendChild(p1)
        appeal1.appendChild(userData);
        appeal1.appendChild(textBody);

        var parent = document.getElementById("appeal_content");
        parent.appendChild(appeal1)
        document.getElementById("newAppealText").value = ""
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
        addAppealOnPage();
        localStorage.removeItem('fans_appeals');

    }
}

window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);
