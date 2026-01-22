let cart = [];
let products = [];
let totalPriceElement = document.getElementById("total_price");
let cartCounter = document.getElementById("cart-counter");
let cartItemsCount = document.getElementById("cart_counts");
const cartTextElements = document.querySelectorAll(".cart_products");
const btnControl = document.querySelector(".btn_control");
const cartTotal = document.querySelector(".cart_total");

loadCart();
getData();
checkCart();

// جلب المنتجات من JSON
async function getData() {
    let response = await fetch('json/products.json');
    let json = await response.json();
    products = json;
}

// تحميل الكارت من localStorage
function loadCart() {
    let storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// حفظ الكارت في localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// إضافة منتج للكارت
function addToCart(productId, inputQuantity = 1) {
    let product = products.find(p => p.id == productId);
    if (product) {
        let existingProduct = cart.find(p => p.id == productId);
        if (existingProduct) {
            existingProduct.quantity += inputQuantity;
        } else {
            let productWithQuantity = { ...product, quantity: inputQuantity };
            cart.push(productWithQuantity);
        }
        saveCart();
        checkCart();
    }
}

// عرض الكارت في HTML
function addCartToHTML() {
    let content = ``;
    cart.forEach((product, index) => {
        let price = parseFloat(product.price);
        let totalPrice = price * product.quantity;
        content += `
        <div class="cart_product">
            <div class="cart_product_img">  
                <img src=${product.images[0]}>
            </div>
            <div class="cart_product_info">  
                <div class="top_card">
                    <div class="left_card">
                        <h4 class="product_name">${product.name}</h4>
                        <span class="product_price">${product.price} DH</span>
                    </div>
                    <div class="remove_product" onclick="removeFromCart(${index})">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                </div>
                <div class="buttom_card">
                    <div class="counts">
                        <button class="counts_btns minus" onclick="decreaseQuantity(${index})">-</button>
                        <input type="number" inputmode="numeric" name="productCount" min="1" step="1" max="999"
                            class="product_count" value=${product.quantity}>
                        <button class="counts_btns plus" onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <span class="total_price">${totalPrice.toFixed(2)} DH</span>
                </div>
            </div>
        </div>`;
    });

    cartTextElements.forEach(element => {
        element.innerHTML = content;
    });
}

// حذف منتج من الكارت
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    checkCart();
}

// زيادة/نقص الكمية
function increaseQuantity(index){
    cart[index].quantity += 1;
    saveCart();
    checkCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCart();
        checkCart();
    } else {
        removeFromCart(index);
    }
}

// حساب subtotal بدون توصيل
function updateTotalPrice() {
    let subtotal = cart.reduce((sum, product) => {
        let price = parseFloat(product.price);
        return sum + (price * product.quantity);
    }, 0);

    totalPriceElement.innerHTML = `${subtotal.toFixed(2)} DH`;

    // خزّن فقط subtotal
    localStorage.setItem("subtotal", subtotal.toFixed(2));

    return subtotal;
}

// التحقق من حالة الكارت
function checkCart(){
    if (cart.length == 0) {
        cartTextElements.forEach(element => {
            element.classList.add("empty");
            element.innerHTML = "Your cart is empty";
        });
        cartCounter.innerHTML = 0;
        btnControl.style.display = "none";
        cartTotal.style.display = "none";
        checkCartPage(0,0);
    } else {
        cartTextElements.forEach(element => {
            element.classList.remove("empty");
        });
        addCartToHTML();
        let totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
        cartCounter.innerHTML = totalQuantity;
        btnControl.style.display = "flex";
        cartTotal.style.display = "flex";
        let subtotal = updateTotalPrice();
        checkCartPage(subtotal,totalQuantity);       
    }
}

// تحديث صفحة cartPage
function checkCartPage(subtotal,totalQuantity){
    if (window.location.pathname.includes("cartPage.html")) {
        if (cart.length == 0) {
            cartItemsCount.innerHTML = `(0 items)`;
            document.getElementById("Subtotal").innerHTML = `0 DH`;
            document.getElementById("total_order").innerHTML = `0 DH`;
        } else {
            cartItemsCount.innerHTML = `(${totalQuantity} items)`;
            displayInCartPage(subtotal);
        }
    }
}

// عرض subtotal + total مع التوصيل في cartPage
function displayInCartPage(subtotal){
    let subTotalElement = document.getElementById("Subtotal");
    subTotalElement.innerHTML = `${subtotal.toFixed(2)} DH`;

    const delivery = 19;
    let totalOrder = subtotal + delivery;

    document.getElementById("Delivery").innerHTML = `${delivery.toFixed(2)} DH`;
    document.getElementById("total_order").innerHTML = `${totalOrder.toFixed(2)} DH`;
}

// Checkout
function checkOut(){
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if(cart.length !== 0){
        if(email && password){
            window.location.href = "checkout.html";
        } else {
            window.location.href = "login.html";
        }
    }
}
