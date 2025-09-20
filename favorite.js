const favoriteButton = document.getElementById("fav-btn");

favoriteButton.addEventListener("click", function () {
  if (currentBird) {
    favorites.push(currentBird);

    // Save to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
});
