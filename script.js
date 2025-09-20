//https://en.wikipedia.org/api/rest_v1/page/summary/

const birdNameEl = document.getElementById("bird-name");
const birdImg = document.getElementById("bird-img");

const birdFact = document.getElementById("bird-fact");
const randomButtonEl = document.getElementById("random-btn");
const linkContainer = document.getElementById("bird-link");

const favoriteTab = document.getElementById("favorites-container");
const favoriteButton = document.getElementById("fav-btn");

let birds = [];
let favorites = [];
let currentBird = [];

async function loadBirdName() {
  const res = await fetch("birds.txt");
  const text = await res.text();
  birds = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const loadBird = async () => {
  try {
    const randomElement = Math.floor(Math.random() * birds.length);
    const randomBirdPicker = birds[randomElement];
    const birdFetch = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        randomBirdPicker
      )}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const birdData = await birdFetch.json();
    birdNameEl.innerHTML = birdData.title;
    nameBirdImage(birdData);
    setBirdFact(birdData);
    setBirdLink(birdData);
    currentBird = birdData;

    //console.log(birdData);
  } catch (error) {
    console.log(error);
  }
};
await loadBirdName();
loadBird();

randomButtonEl.addEventListener("click", function () {
  loadBird();
});

function nameBirdImage(data) {
  if (data.thumbnail) {
    document.getElementById("bird-img").src = data.thumbnail.source;
    document.getElementById("bird-img").style.display = "block";
  } else {
    document.getElementById("bird-img").style.display = "none";
  }
}

function setBirdFact(data) {
  if (data.extract) {
    document.getElementById("bird-fact").innerText = data.extract;
  } else {
    document.getElementById("bird-fact").innerText = "No fact available.";
  }
}

function setBirdLink(data) {
  const linkContainer = document.getElementById("bird-link");
  if (data.content_urls && data.content_urls.desktop) {
    linkContainer.innerHTML = `<a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>`;
  } else {
    linkContainer.innerHTML = "";
  }
}

function renderFavorites() {}
