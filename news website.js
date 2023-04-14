//08d12d825edc40e598c2d544867d5c10

console.log('welcome to News Today');

{/* <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small class="text-muted">3 days ago</small>
                </div>
                <p class="mb-1">Some placeholder content in a paragraph.</p>
                <small class="text-muted">And some muted small print.</small>
            </a> */}

// let source = 'espn';
const api = '08d12d825edc40e598c2d544867d5c10';

let news = document.getElementById('news');
let source = document.getElementById('newsgrp');
let btn = document.getElementById('view');

btn.addEventListener('click', function () {

    console.log(source.value);
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source.value}&apiKey=${api}`, true);

    xhr.onprogress = function () {
        console.log('Page in progress');
    }
    let date = new Date();

    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            let newshtml = '';
            articles.forEach(function (element, index) {
                console.log(element.title);
                let news = `<a href="${element.url}" class="list-group-item list-group-item-active" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${element.title}</h5>
                        <small>${date.toLocaleDateString()}</small>
                        </div>
                        <p class="mb-1">${element.description}</p>
                        <small class="text-muted">${element.author}</small>
                        </a>`;
                newshtml += news;
            });
            // articles.forEach(function(element, index) {
            //     //console.log(element, index)
            //     let news = `<div class="card">
            //                     <div class="card-header" id="heading${index}">
            //                         <h2 class="mb-0">
            //                         <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
            //                             aria-expanded="false" aria-controls="collapse${index}">
            //                            <b>Breaking News ${index+1}:</b> ${element["title"]}
            //                         </button>
            //                         </h2>
            //                     </div>

            //                     <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
            //                         <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
            //                     </div>
            //                 </div>`;
            //     newshtml += news;
            //});
            news.innerHTML = newshtml;
        }
        else {
            news.innerHTML = `<h2>Some error occured</h2>`;
        }
    }

    xhr.send();
})
