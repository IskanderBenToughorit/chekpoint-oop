// Classe pour représenter un produit
class Product {
  constructor(id, name, price, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
  }
}

// Classe pour représenter un élément du panier
class ShoppingCartItem {
  constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
  }

  // Méthode pour calculer le prix total de cet élément
  getTotalPrice() {
      return this.product.price * this.quantity;
  }
}

// Classe pour représenter le panier d'achat
class ShoppingCart {
  constructor() {
      this.items = [];
  }

  // Obtenir le total des éléments dans le panier
  getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Ajouter un élément au panier
  addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.renderCart();
  }

  // Supprimer un élément du panier
  removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.renderCart();
  }

  // Obtenir le prix total du panier
  getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Afficher les éléments du panier dans le DOM
  renderCart() {
      const cartContainer = document.querySelector(".cart");
      const totalPriceElement = document.getElementById("total-price");
      cartContainer.innerHTML = ""; // Vider le conteneur avant de le remplir

      this.items.forEach(item => {
          const cartItemDiv = document.createElement("div");
          cartItemDiv.className = "cart-item";
          cartItemDiv.innerHTML = `
              <img src="${item.product.image}" alt="${item.product.name}" class="item-image" />
              <h2>${item.product.name}</h2>
              <div class="quantity-controls">
                  <button class="decrement">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="increment">+</button>
              </div>
              <button class="like-btn">&#x2764;</button>
              <button class="remove-btn">Supprimer</button>
              <span class="item-price">Prix : ${item.getTotalPrice()} €</span>
          `;

          // Ajouter des événements pour les boutons
          cartItemDiv.querySelector(".increment").addEventListener("click", () => {
              item.quantity++;
              this.renderCart();
          });

          cartItemDiv.querySelector(".decrement").addEventListener("click", () => {
              if (item.quantity > 1) {
                  item.quantity--;
                  this.renderCart();
              }
          });

          cartItemDiv.querySelector(".remove-btn").addEventListener("click", () => {
              this.removeItem(item.product.id);
          });

          cartItemDiv.querySelector(".like-btn").addEventListener("click", (event) => {
              const button = event.target;
              button.style.color = button.style.color === "red" ? "black" : "red";
          });

          cartContainer.appendChild(cartItemDiv);
      });

      totalPriceElement.textContent = `Prix Total : ${this.getTotalPrice()} €`;
  }
}

// === Initialisation du panier ===
const cart = new ShoppingCart();

// Produits de test
const product1 = new Product(1, "Cargo Pants", 20, "cargo.jpg");
const product2 = new Product(2, "Hoodie", 15, "hoodie.jpeg");

// Ajout des produits au panier
cart.addItem(product1, 2); // 2 Cargo Pants
cart.addItem(product2, 1); // 1 Hoodie
