// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDajRSJwAQKoGxh-FFPIuGallJ3aLu6Ltk",
  authDomain: "roeyashop-b2095.firebaseapp.com",
  projectId: "roeyashop-b2095",
  storageBucket: "roeyashop-b2095.firebasestorage.app",
  messagingSenderId: "208279456456",
  appId: "1:208279456456:web:f8ea37c3d8bfc289b7b3fd",
  measurementId: "G-WER8YWBZ17"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const ordersTableBody = document.querySelector("#ordersTable tbody");

db.collection("orders").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
  ordersTableBody.innerHTML = "";

  snapshot.forEach(doc => {
    const order = doc.data();
    const cartItems = order.cartItems.map(i => `${i.name} (x${i.quantity})`).join(", ");

    const row = `
      <tr>
        <td>${doc.id}</td>
        <td>${order.name}</td>
        <td>${order.phone}</td>
        <td>${order.ville}</td>
        <td>${order.size}</td>
        <td>${order.total}$</td>
        <td>${cartItems}</td>
        <td>${new Date(order.createdAt.seconds * 1000).toLocaleString()}</td>
      </tr>
    `;

    ordersTableBody.innerHTML += row;
  });
});
