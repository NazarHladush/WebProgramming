let src;
const customFile = document.getElementById("customFile");
const imgPreview = document.getElementById("imgPreview");

customFile.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            imgPreview.setAttribute("src", this.result);
            src = this.result;
        });

        reader.readAsDataURL(file);
    }

});

function add_news() {
    let title = document.getElementById("newsTitle").value;
        let news = document.getElementById("newsBody").value;
        let bool = true;
        let img_2 = document.getElementById("customFile");
        if (title === "") {
            alert("News Title is empty");
            title = document.getElementById("newsTitle");
            bool = false;
        }

        if (news === "") {
            alert("News Body is empty");
            title = document.getElementById("newsBody");
            bool = false;
        }

        if (bool) {
            alert("Successfully added");
            let News = {
                img: src,
                title: title,
                text: news,
            };
    if (isOnline()) {
        $.ajax({
            type: "POST",
            url: "http://localhost:3500/addNews",
            contentType: 'application/json',
            data: JSON.stringify(News),
        });
    } else {
            provider.add("news", News);
            document.getElementById("newsTitle").value = "";
            document.getElementById("newsBody").value = "";
            document.getElementById("imgPreview").src = "/css/img/images2.jpg";
            document.getElementById("placeholder").innerHTML = "Choose file";
        }
    }
}

function handleConnectionChange(event) {
    if (event.type === "offline") {
        alert("You are offline")
    }
    if (event.type === "online") {
        alert("Connection established");

    }
}

window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);