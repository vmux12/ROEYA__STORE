const subtotal = parseFloat(localStorage.getItem("subtotal")) || 0;
const shipping = 19;
const total = subtotal + shipping;

document.getElementById("subtotal").innerText = `${subtotal.toFixed(2)} DH`;
document.getElementById("shipping").innerText = `${shipping.toFixed(2)} DH`;
document.getElementById("total").innerText = `${total.toFixed(2)} DH`;

document.getElementById("checkoutForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name  = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const ville = document.getElementById("ville").value;
    const size  = document.getElementById("size").value;

    if (!name || !phone || !ville || !size) {
        alert("عافاك عمر جميع المعلومات");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    localStorage.setItem("order_name", name);
    localStorage.setItem("order_phone", phone);
    localStorage.setItem("order_ville", ville);
    localStorage.setItem("order_size", size);
    localStorage.setItem("order_total", total.toFixed(2));
    localStorage.setItem("order_cart", JSON.stringify(cart));

    window.location.href = "checkout-success.html";
});
