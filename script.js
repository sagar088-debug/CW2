/* ---------------- PRODUCTS ---------------- */
const products = [
  {
    id: 0,
    name: "Abstract Calligraphy Spiral",
    price: 420,
    image: "resources/artwork3.jpeg",
    desc: "Elegant multi-layer Arabic spiral artwork."
  },
  {
    id: 1,
    name: "Circle of Light",
    price: 560,
    image: "resources/artwork7.jpeg",
    desc: "Calligraphy circle representing divine radiance."
  },
  {
    id: 2,
    name: "Golden Horse Calligraphy",
    price: 490,
    image: "resources/artwork3.jpeg",
    desc: "Majestic horse formed with pure Arabic scripts."
  },
  {
    id: 3,
    name: "Yellow Sun Verse",
    price: 530,
    image: "resources/artwork2.jpeg",
    desc: "Golden sun surrounded with Quranic verses."
  },
  {
    id: 4,
    name: "Orange Calligraphy Flow",
    price: 450,
    image: "resources/99 names of allah.jpeg",
    desc: "Vibrant orange textured calligraphy layers."
  },
  {
    id: 5,
    name: "Blue Ocean Ayah",
    price: 540,
    image: "resources/artwork6.jpeg",
    desc: "Deep ocean-inspired Arabic calligraphy movement."
  },
  {
    id: 6,
    name: "Modern Calligraphy Composition",
    price: 600,
    image: "resources/artwork5.jpeg",
    desc: "Modern geometric calligraphy fusion."
  }
];

/* ---------------- HOME PAGE ---------------- */
function renderHome() {
  const box = document.getElementById("homeProducts");
  if (!box) return;

  products.slice(0, 3).forEach(p => {
    box.innerHTML += `
      <article class="card" onclick="openDetails(${p.id})">
        <img src="${p.image}" class="card-img">
        <h3>${p.name}</h3>
        <p class="price">£${p.price}</p>
      </article>`;
  });
}

/* ---------------- PAINTING PAGE ---------------- */
function renderPaintingGrid() {
  const box = document.getElementById("paintingGrid");
  if (!box) return;

  products.forEach(p => {
    box.innerHTML += `
      <article class="card" onclick="openDetails(${p.id})">
        <img src="${p.image}" class="card-img">
        <h3>${p.name}</h3>
        <p class="price">£${p.price}</p>
      </article>`;
  });
}

/* ---------------- PRODUCT DETAILS ---------------- */
function openDetails(id) {
  localStorage.setItem("selectedProductId", id);
  location.href = "product-detail.html";
}

function renderDetails() {
  const wrap = document.getElementById("detailsPage");
  if (!wrap) return;

  const id = Number(localStorage.getItem("selectedProductId"));
  const p = products.find(x => x.id === id);

  if (!p) {
    alert("Invalid product.");
    location.href = "painting.html";
    return;
  }

  wrap.innerHTML = `
    <div class="details-grid">
      <img src="${p.image}" class="details-img">
      <div>
        <h2 class="section-title">${p.name}</h2>
        <p>${p.desc}</p>
        <p class="price" style="font-size:1.4rem;margin:1rem 0;">£${p.price}</p>

        <button class="btn-primary" onclick="addToCart(${p.id})">
          Add to Cart
        </button>

        <a class="btn-primary" style="background:#25D366;margin-left:0.5rem;"
           href="https://wa.me/447350190960?text=I want to order ${encodeURIComponent(p.name)}">
          WhatsApp Order
        </a>
      </div>
    </div>
  `;
}

/* ---------------- CART SYSTEM ---------------- */
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);

  if (item) item.qty++;
  else cart.push({ id, qty: 1 });

  saveCart(cart);
  alert("Added to cart.");
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const totalEl = document.getElementById("totalPrice");
  if (!box || !totalEl) return;

  const cart = getCart();
  if (!cart.length) {
    box.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const p = products.find(x => x.id === item.id);
    if (!p) return;

    const line = p.price * item.qty;
    total += line;

    box.innerHTML += `
      <div class="cart-row">
        <img src="${p.image}">
        <div>
          <p>${p.name}</p>
          <p>£${p.price} × ${item.qty}</p>
        </div>
        <button class="btn-primary" onclick="removeFromCart(${index})">X</button>
      </div>
    `;
  });

  totalEl.textContent = "Total: £" + total;
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  location.reload();
}

/* ---------------- CONTACT FORM ---------------- */
function contactValidate() {
  const n = fname.value.trim();
  const e = femail.value.trim();
  const m = fmsg.value.trim();

  if (!n || !e || !m) {
    alert("Please fill all fields.");
    return false;
  }

  alert("Message sent.");
  return true;
}

/* ---------------- CHECKOUT PAGE ---------------- */
function renderCheckout() {
  const box = document.getElementById("checkoutSummary");
  const totalEl = document.getElementById("checkoutTotal");
  if (!box || !totalEl) return;

  const cart = getCart();
  if (!cart.length) {
    box.innerHTML = "<p>No items in checkout.</p>";
    return;
  }

  let total = 0;
  box.innerHTML = "";

  cart.forEach(item => {
    const p = products.find(x => x.id === item.id);

    total += p.price * item.qty;

    box.innerHTML += `
      <div class="cart-row">
        <img src="${p.image}">
        <div>
          <p>${p.name}</p>
          <p>£${p.price} × ${item.qty}</p>
        </div>
      </div>`;
  });

  totalEl.textContent = "Total: £" + total;
}

document.getElementById("checkoutForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const name = cname.value.trim();
  const email = cemail.value.trim();
  const address = caddress.value.trim();
  const city = ccity.value.trim();
  const zip = czip.value.trim();
  const terms = cterms.checked;

  if (!name || !email || !address || !city || !zip) {
    alert("Please complete all fields.");
    return;
  }

  if (!terms) {
    alert("Please accept the Terms & Conditions.");
    return;
  }

  alert("Order placed successfully.\nA confirmation email will be sent.");
  localStorage.removeItem("cart");
  location.href = "index.html";
});

/* ---------------- INITIAL LOAD ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderPaintingGrid();
  renderDetails();
  renderCart();
  renderCheckout();
});
function addProduct() {
  const name = pname.value;
  const price = Number(pprice.value);
  const desc = pdesc.value;
  const image = pimage.value;

  if (!name || !price || !desc || !image) {
    alert("Fill all fields.");
    return;
  }

  const stored = JSON.parse(localStorage.getItem("adminProducts") || "[]");

  stored.push({
    id: Date.now(),
    name,
    price,
    desc,
    image
  });

  localStorage.setItem("adminProducts", JSON.stringify(stored));

  alert("Painting added!");
}
