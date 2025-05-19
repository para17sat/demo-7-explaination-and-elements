async function searchAnime() {
  const query = document.getElementById("searchInput").value;
  const style = document.createElement('style');
style.textContent = `
  body {
    background-color: #0f172a;
    color: #f1f5f9;
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 20px;
  }

  .container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }

  input[type="text"] {
    padding: 10px;
    width: 70%;
    border: none;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    padding: 10px 15px;
    background-color: #3b82f6;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    margin-left: 10px;
    font-size: 16px;
  }

  button:hover {
    background-color: #0a1e4a;
  }

  .anime-card {
    background: #1e293b;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    text-align: left;
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .anime-card img {
    width: 80px;
    border-radius: 5px;
  }

  .anime-info {
    flex: 1;
  }

  @media (max-width: 600px) {
    input[type="text"] {
      width: 100%;
      margin-bottom: 10px;
    }

    button {
      width: 100%;
      margin-left: 0;
    }

    .anime-card {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }

    .anime-card img {
      width: 100px;
      height: auto;
    }

    .anime-info {
      text-align: center;
    }
  }
`;
document.head.appendChild(style);

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
