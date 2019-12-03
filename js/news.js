function addNewsOnPage() {
    provider.get('news', (data) => {
        let existingNews = data;
        let news;
        for (news in existingNews) {
            news = existingNews[news];

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
    });
}

function handleConnectionChange(event) {
    if (event.type === "offline") {
        alert("You are offline")
    }
    if (event.type === "online") {
        alert("Connection established");
        addNewsOnPage();
        provider.remove('news');

    }
}

window.onload = function() {
    $.get("http://localhost:3500/getNews", function(data, status){
        console.log(data)
        let news;
        for (news in data.data) {
            news = data.data[news];

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
      });
  };

window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);