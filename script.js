if (document.readyState == "loading") {
  // console.log(document.readyState)
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// remove cart items begins
function ready() {
  var removeCartItemBtn = document.getElementsByClassName("btn-remove");
  console.log(removeCartItemBtn);
  for (var i = 0; i < removeCartItemBtn.length; i++) {
    var button = removeCartItemBtn[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-product-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("ad-to-card");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", theEnd);
}

function theEnd() {
  alert("Voilà");

  var cartWrapper = document.getElementsByClassName("cart-wrapper")[0];
  while (cartWrapper.hasChildNodes()) {
    cartWrapper.removeChild(cartWrapper.firstChild);
  }

  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var productItem = button.parentElement;
  var title =
    productItem.getElementsByClassName("product-card-title")[0].innerText;
  var price = productItem.getElementsByClassName("product-price")[0].innerText;
  var imageSrc = productItem.getElementsByClassName("product-image")[0].src;
  //   console.log(title);
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartWrapper = document.getElementsByClassName("cart-wrapper")[0];
  var cartItemNames = cartWrapper.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item already added to the cart");
      return;
    }
  }
  var cartRowElements = `
  
   <div class="cart-product-wrapper">
        <div class="cart-product-image">
        <img class="product-image" src="${imageSrc}" alt="" />
        </div>
        <p class="cart-product-title">${title}</p>
    </div>
    <div class="cart-product-detail-right">
        <div class="cart-quentity-wrapper">
            <input
                type="number"
                class="cart-product-quantity"
                id="cart-product-quantity"
                value="1"
            />
        <button class="btn btn-remove">Remove</button>
        </div>
        <div class="cart-product-price">${price}</div>
    </div>
  
  `;
  cartRow.innerHTML = cartRowElements;
  cartWrapper.append(cartRow);
  cartRow
    .getElementsByClassName("btn-remove")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-product-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// remove cart items ends

// update cart total begins

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-wrapper")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var subtotal = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-product-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-product-quantity"
    )[0];
    // console.log(priceElement, quantityElement);
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;

    // console.log(price * quantity);
    subtotal = subtotal + quantity * price;
    console.log(subtotal);
    // console.log(quantity);
  }

  subtotal = Math.round(subtotal * 100) / 100;

  document.getElementsByClassName(
    "cart-subtotal"
  )[0].innerText = `${subtotal} €`;

  //   tip calc
  var tip = Math.round((subtotal / 100) * 10);
  document.getElementById("cart-tip").innerHTML = `${tip} €`;

  // total

  var total = subtotal + tip;
  document.getElementById("cart-total").innerHTML = `${total} €`;
}

// function tip(subtotal) {
//   var tip = (subtotal / 100) * 10;
//   document.getElementById("cart-tip").innerHTML = tip;
// }

// slider

var mySlide = document.querySelector("#mySlide");
var caro = new bootstrap.Carousel(mySlide, {
  interval: 5000,
});
