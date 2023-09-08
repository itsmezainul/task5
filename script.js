const row = document.getElementById("row");
let cartEl = document.getElementById("cart-item");
let total = document.getElementById("total");
let cart = [];

function renderProducrs(product) {
  products.forEach(
    (product) =>
      (row.innerHTML += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
  <div class="mx-auto card p-0">
    <img
      src="${product.priductImg}"
      height="220px"
      class="card-img-top border"
    />
    <div class="card-body mb-4">
    <div class="d-flex justify-content-between">
    <h5 class="card-title fs-4">${product.productName}</h5>
    <span class="fs-5 fw-bold">₹${product.price}</span>
  </div>
      <p class="card-text">${product.description}</p>
    </div>
    <div class="button text-center pb-4">
      <span class="btn btn-success me-3" data-bs-toggle="offcanvas"
      data-bs-target="#cart" aria-controls="offcanvasend" >Buy Now</span>
      <span class="btn btn-light" onclick="addToCart(${product.id})">Add to Cart</span>
    </div>
  </div>`)
  );
}

function addToCart(value) {
  if (cart.some((item) => item.id === value)) {
    alert("Product already in cart");
  } else {
    const item = products.find((product) => product.id === value);
    cart.push({ ...item, numberOfUnit: 1 });
    renderCart();
  }
}

function renderCart() {
  cartEl.innerHTML = "";
  cart.forEach((i) => {
    cartEl.innerHTML += `
    <li class="d-flex justify-content-between my-3">
    <div >
      <span class="item-name fs-6">${i.productName}</span>
      <span class="item-price">₹${i.numberOfUnit * i.price}</span>
    </div>
    <div>
      <button class="btn btn-light btn-min" onclick="toggleCount('minus', ${
        i.id
      })">-</button>
      <span class="item-count p-2">${i.numberOfUnit}</span>
      <button class="btn btn-light btn-plus" onclick="toggleCount('plus',${
        i.id
      })">+</button>
      <span class=" btn btn-danger" onclick="removeItem(${i.id})">x</span>
    </div>
  </li>`;
  });
  document.getElementById("icn").innerHTML = cart.length;
  calTotal();
}

function toggleCount(action, id) {
  cart = cart.map((item) => {
    let prev = item.numberOfUnit;
    if (item.id === id) {
      if (action === "plus") {
        prev++;
      } else if (action === "minus") {
        if (prev === 1) {
          cart = cart.pop((val) => {
            val.id === id;
          });
        } else {
          prev--;
        }
      }
    }
    return {
      ...item,
      numberOfUnit: prev,
    };
  });
  renderCart();
}

function calTotal() {
  let t = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.numberOfUnit;
  }, 0);

  total.innerHTML = `₹${t}`;
}

function removeItem(id) {
  cart = cart.filter((value) => value.id !== id);
  renderCart();
}

renderProducrs();
