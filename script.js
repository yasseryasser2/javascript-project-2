//https://en.wikipedia.org/api/rest_v1/page/summary/

//const birdName = document.getElementById("bird-name");
const birdImg = document.getElementById("bird-img");

const birdFact = document.getElementById("bird-fact");
const randomButton = document.getElementById("random-btn");

const birds = ["Turkey vulture", "Barnacle goose", "Cape wagtail"];

const fetchBirdName = async () => {
  try {
    const fetchBird = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        birdName
      )}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const birdNameData = await fetchBird.json();
    document.getElementById("bird-name").innerHTML = birdNameData.value;
  } catch (error) {}
};
