// js/wishlist.js

const wishlistContainer = document.getElementById("wishlist-container");

window.addEventListener("DOMContentLoaded", fetchWishlist);

async function fetchWishlist() {
  wishlistContainer.innerHTML = `<p style="text-align:center;">Loading your wishlist...</p>`;
  try {
    const res = await fetch("http://localhost:3000/api/wishlist");
    const data = await res.json();
    wishlistContainer.innerHTML = "";

    if (data.length === 0) {
      wishlistContainer.innerHTML = "<p style='text-align:center;'>🗒️ Your wishlist is empty.</p>";
    }

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "result-card glass";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.snippet}</p>
        <a href="${item.link}" target="_blank">🔗 Visit Link</a>
        <div class="actions">
          <button class="delete-btn" data-id="${item._id}">🗑 Delete</button>
        </div>
      `;
      const deleteBtn = card.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => deleteItem(item._id));
      wishlistContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    wishlistContainer.innerHTML = "<p>Error loading wishlist.</p>";
  }
}

async function deleteItem(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/wishlist/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchWishlist();
    } else {
      alert("⚠️ Failed to delete item.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Could not delete item.");
  }
}
