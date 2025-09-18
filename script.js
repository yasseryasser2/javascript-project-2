//https://en.wikipedia.org/api/rest_v1/page/summary/

const birdNameEl = document.getElementById("bird-name");
const birdImg = document.getElementById("bird-img");

const birdFact = document.getElementById("bird-fact");
const randomButtonEl = document.getElementById("random-btn");

let birds = [];

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
    console.log(birdData);
  } catch (error) {
    console.log(error);
  }
};
await loadBirdName();
loadBird();

randomButtonEl.addEventListener("click", function () {
  loadBird();
});
