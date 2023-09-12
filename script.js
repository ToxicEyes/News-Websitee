const API_KEY = "095af5a77b5748bcaa1a971af9879359";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load',() => fetchNews('India'));


async function fetchNews(query) {
    //fetch() : used to fetch resources asynchonously from the netwrok
    //returns a promise
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);

    //converting the data in json format
    const data =  await res.json();
    console.log(data);

    bindData(data.articles);
}

//creating templates for articles
function bindData(articles){
   const cardsContainer = document.getElementById("cards-container");
   const newsCardTemplate = document.getElementById("template-news-card");


   cardsContainer.innerHTML = "";

   articles.forEach(article => {
    if(!article.urlToImage){
        return;
    }

    //created a card clone
    const cardClone = newsCardTemplate.content.cloneNode(true);

    //filling the data in card
    fillDataInCard(cardClone,article);


    cardsContainer.appendChild(cardClone);
   });
}

function fillDataInCard (cardClone, article) {
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-us',{
        timeZone: "Asia/Jakarta"
    }); 

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    //handling click event
    cardClone.firstElementChild.addEventListener('click' ,() => {
        window.open(article.url, '_blank');
    })
}

let currSelectedNav = null;
 
function onNavItemClick(id) {
    //fetches the news of specified id (e.g India, Ipl , Finance, Polictics or anything...)
    //This function also binds the data
    fetchNews(id);
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
});

function reloadPage( ) {
    window.location.reload();
}