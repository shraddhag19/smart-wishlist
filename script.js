const form = document.getElementById("wishlist-form");
const itemsContainer = document.getElementById("items-container");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function extractWebsiteName(url) {
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes("amazon")) return "Amazon";
    if (hostname.includes("flipkart")) return "Flipkart";
    if (hostname.includes("myntra")) return "Myntra";
    if (hostname.includes("meesho")) return "Meesho";
    if (hostname.includes("ajio")) return "AJIO";
    return hostname.replace("www.", "").split(".")[0].toUpperCase();
  } catch {
    return "Unknown";
  }
}

function generateImage(link) {
  return `https://image.thum.io/get/width/600/crop/700/noanimate/${encodeURIComponent(link)}`;
}

function renderItems() {
  itemsContainer.innerHTML = "";

  if (wishlist.length === 0) {
    itemsContainer.innerHTML = `<p>No products yet. Add your first item 🚀</p>`;
    return;
  }

  wishlist.forEach((item, index) => {
    const website = extractWebsiteName(item.link);
    const imgSrc = generateImage(item.link);

    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <span class="delete-btn" onclick="deleteItem(${index})">×</span>
      <a href="${item.link}" target="_blank" title="${item.name}">${item.name}</a>
      <div class="website-tag">🌐 ${website}</div>
      <p>${item.notes}</p>
      <img src="${imgSrc}" alt="Product Preview" onerror="this.style.display='none'" />
    `;

    itemsContainer.appendChild(card);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("product-name").value.trim();
  const link = document.getElementById("product-link").value.trim();
  const notes = document.getElementById("product-notes").value.trim();

  if (!name || !link) return;

  wishlist.push({ name, link, notes });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  form.reset();
  renderItems();
});

function deleteItem(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderItems();
}

// Initialize
renderItems();

// Toggle Dark/Light Mode
const toggle = document.getElementById("mode-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});
