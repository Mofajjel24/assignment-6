const categoryList = document.getElementById("category-list");
const treeList = document.getElementById("tree-list");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const loadingSpinner = document.getElementById("loading");

let cart = [];
let total = 0;

// Fetch categories
async function loadCategories() {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/categories");
        const data = await res.json();
        renderCategories(data.categories);
    } catch (err) {
        console.error("Error loading categories:", err);
    }
}

// Render categories with "All Plants" first
function renderCategories(categories) {
    categoryList.innerHTML = "";

    // Helper function to reset all buttons
    const resetActive = () => {
        document.querySelectorAll("#category-list button").forEach(b => {
            b.classList.remove("bg-[#15803D]", "text-white");
            b.style.backgroundColor = "transparent";
            b.style.color = "black";
        });
    };

    // 'All Trees' button
    const allBtn = document.createElement("button");
    allBtn.className = "w-full py-2 px-4 text-black rounded-md text-left transition-colors";
    allBtn.style.backgroundColor = "transparent";
    allBtn.style.border = "none";
    allBtn.innerText = "All Trees";

    allBtn.addEventListener("click", () => {
        resetActive();
        allBtn.classList.add("bg-[#15803D]", "text-white");
        allBtn.style.backgroundColor = "#15803D";
        allBtn.style.color = "white";
        loadAllPlants();
    });

    categoryList.appendChild(allBtn);

    // Other categories
    categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.className = "w-full py-2 px-4 text-black rounded-md text-left transition-colors";
        btn.style.backgroundColor = "transparent";
        btn.style.border = "none";
        btn.innerText = cat.category_name;

        btn.addEventListener("click", () => {
            resetActive();
            btn.classList.add("bg-[#15803D]", "text-white");
            btn.style.backgroundColor = "#15803D";
            btn.style.color = "white";
            loadCategoryPlants(cat.id);
        });

        categoryList.appendChild(btn);
    });

    // Show all plants by default
    loadAllPlants();
}





// Fetch all plants
async function loadAllPlants() {
    showLoading();
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/plants");
        const data = await res.json();
        renderTrees(data.plants);
    } catch (err) {
        console.error("Error loading all plants:", err);
    }
    hideLoading();
}

// Fetch plants by category
async function loadCategoryPlants(id) {
    showLoading();
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
        const data = await res.json();
        renderTrees(data.plants);
    } catch (err) {
        console.error("Error loading category plants:", err);
    }
    hideLoading();
}

// Render trees
function renderTrees(trees) {
    treeList.innerHTML = "";

    if (!trees || trees.length === 0) {
        treeList.innerHTML = `<p class="col-span-3 text-center text-red-500">No trees found in this category.</p>`;
        return;
    }

    trees.forEach(tree => {
        const card = document.createElement("div");
        card.className = "card bg-white shadow p-4";
        card.innerHTML = `
      <figure><img src="${tree.image}" class="rounded-lg h-40 w-full object-cover" /></figure>
      <div class="mt-2">
        <h3 class="font-semibold text-lg text-black cursor-pointer" data-id="${tree.id}">${tree.name}</h3>
        <p class="text-sm text-gray-500">${tree.description.slice(0, 60)}...</p>
        <div class="flex justify-between items-center mt-1">
            <span class="badge font-bold px-2 py-2" style="background-color:#DCFCE7; color:#065F46;">${tree.category}</span>
            <span class="font-semibold">৳${tree.price}</span>
        </div>
        <button class="btn w-full mt-2 rounded-full text-white" style="background-color:#15803D;" data-add="${tree.id}">Add to Cart</button>
      </div>
    `;
        treeList.appendChild(card);

        // Modal open
        card.querySelector("[data-id]").addEventListener("click", () => loadTreeDetails(tree.id));

        // Add to cart
        card.querySelector("[data-add]").addEventListener("click", () => addToCart(tree));
    });
}


// Load tree details
async function loadTreeDetails(id) {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
        const data = await res.json();
        const plant = data.plants;

        document.getElementById("modal-name").innerText = plant.name;
        document.getElementById("modal-img").src = plant.image;
        document.getElementById("modal-description").innerText = plant.description;
        document.getElementById("modal-category").innerText = plant.category;
        document.getElementById("modal-price").innerText = `৳${plant.price}`;

        document.getElementById("tree-modal").showModal();
    } catch (err) {
        console.error("Error loading tree details:", err);
    }
}

// Add to cart
function addToCart(tree) {
    // Check if item already in cart
    const existing = cart.find(item => item.id === tree.id);
    if (existing) {
        existing.quantity += 1;
        total += tree.price;
    } else {
        cart.push({ ...tree, quantity: 1 });
        total += tree.price;
    }
    updateCart();
}

// Remove from cart
function removeFromCart(index) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    updateCart();
}

// Update cart UI
function updateCart() {
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "bg-green-100 p-2 rounded-xl flex justify-between items-center relative";

        li.innerHTML = `
            <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-gray-400">৳${item.price} × ${item.quantity}</p>
            </div>
            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-md">X</button>
        `;

        li.querySelector("button").addEventListener("click", () => removeFromCart(index));
        cartList.appendChild(li);
    });
    cartTotal.innerText = `৳${total}`;
}

// Loading state
function showLoading() {
    loadingSpinner.classList.remove("hidden");
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

// Init
loadCategories();
