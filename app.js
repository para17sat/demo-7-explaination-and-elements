async function searchAnime() {
  const query = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`);
    const data = await response.json();

    resultsDiv.innerHTML = ""; 

    data.data.forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";

      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <div class="anime-info">
          <h2>${anime.title}</h2>
          <p><strong>Score:</strong> ${anime.score}</p>
          <p>${anime.synopsis ? anime.synopsis.substring(0, 150) + "..." : "No synopsis"}</p>
        </div>
      `;

      resultsDiv.appendChild(card);
    });

    if (data.data.length === 0) {
      resultsDiv.innerHTML = "No results found.";
    }

  } catch (error) {
    resultsDiv.innerHTML = "Error fetching anime info.";
    console.error(error);
  }
}
