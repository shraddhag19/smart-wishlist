// js/product-finder.js

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

const apiKey = "AIzaSyAODQQN4Wi8YLN0F721Ng_jNZB9VnSA9As"; // Replace with your actual API key
const cx = "b744947f886624e77";             // Replace with your actual CSE ID

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchSearchResults(query);
  }
});

async function fetchSearchResults(query) {
  resultsContainer.innerHTML = `<p style="text-align:center;">Loading results...</p>`;
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    resultsContainer.innerHTML = "";

    if (data.items && data.items.length > 0) {
      data.items.forEach(item => {
        const card = document.createElement("div");
        card.className = "result-card glass";
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.snippet}</p>
          <a href="${item.link}" target="_blank">🔗 Visit Link</a>
          <div class="actions">
            <button class="like-btn">❤️ Save</button>
          </div>
        `;
        const likeBtn = card.querySelector(".like-btn");
        likeBtn.addEventListener("click", () => saveToWishlist(item));
        resultsContainer.appendChild(card);
      });
    } else {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    }
  } catch (err) {
    console.error(err);
    resultsContainer.innerHTML = "<p>Error loading search results.</p>";
  }
}

async function saveToWishlist(item) {
  try {
    const res = await fetch("http://localhost:3000/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      }),
    });

    if (res.ok) {
      alert("✅ Added to your wishlist!");
    } else {
      alert("⚠️ Failed to save item.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Could not save item.");
  }
}
