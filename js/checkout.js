document.getElementById("confirmOrder").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const ville = document.getElementById("ville").value.trim();
  const size = document.getElementById("size").value.trim();

  // validation
  if (!name || !phone || !ville || !size) {
    alert("من فضلك عَمّر جميع الحقول");
    return;
  }

  const total = localStorage.getItem("total price");
  const cart = localStorage.getItem("cart");

  // تخزين المعطيات
  localStorage.setItem("order_name", name);
  localStorage.setItem("order_phone", phone);
  localStorage.setItem("order_ville", ville);
  localStorage.setItem("order_size", size);
  localStorage.setItem("order_total", total);
  localStorage.setItem("order_cart", cart);

  // مشي لصفحة النجاح
  window.location.href = "checkout-success.html";
});
