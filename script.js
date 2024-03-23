
document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', handleSearchSubmit);

    addSearchToHistory();
});

async function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    const apiKey = 'gOguIZ1afrhabbgjqQNYPfO6QkPsI6rYBiS1ShhS'; 
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`);
    const data = await response.json();

    displayImage(data);
}

async function getImageOfTheDay(date) {
    const apiKey = 'gOguIZ1afrhabbgjqQNYPfO6QkPsI6rYBiS1ShhS'; 

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
    const data = await response.json();

    displayImage(data);
    saveSearch(date);
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if(searches.length==0){
        searches.push(date);
    }
    if (!searches.includes(date)) {
        searches.push(date);
    }
    localStorage.setItem('searches', JSON.stringify(searches));
    addSearchToHistory();
}

function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';

    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    searches.forEach(search => {
        const listItem = document.createElement('li');
        listItem.textContent = search;
        listItem.addEventListener('click', () => {
            changeText=document.querySelector(".ch-text");
            changeText.textContent=`Picture On ${search}`;
            getImageOfTheDay(search)});
        searchHistory.appendChild(listItem);
    });
}

function displayImage(data) {
    const currentImageContainer = document.getElementById('current-image-container');
    currentImageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
    `;
}

function handleSearchSubmit(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchDate = searchInput.value;
    getImageOfTheDay(searchDate);
    searchInput.value = '';
}
