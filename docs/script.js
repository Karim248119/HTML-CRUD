let products = [];

const productForm = document.getElementById("product-form");
const createButton = document.getElementById("create-btn");
const clearButton = document.getElementById("clear-btn");
const tableBody = document.getElementById("table-body");
const alertModal = document.getElementById("alert-modal");
const warningMsg = document.getElementById("warning-msg");

productForm.addEventListener("submit", handleSubmit);
clearButton.addEventListener("click", clearForm);

function handleSubmit(event) {
  event.preventDefault();

  const productName = document.getElementById("product_name").value.trim();
  const productCategory = document
    .getElementById("product_category")
    .value.trim();
  const productPrice = document.getElementById("product_price").value.trim();
  const productDesc = document.getElementById("product_desc").value.trim();

  if (!productName || !productCategory || !productPrice) {
    showAlert("Please fill out all fields", "error");
    return;
  }

  const submitButton = document.getElementById("create-btn");
  const action = submitButton.innerText.toLowerCase();

  if (action === "create") {
    const newProduct = {
      id: Date.now(),
      name: productName,
      category: productCategory,
      price: productPrice,
      description: productDesc,
    };

    products.push(newProduct);
    showAlert("Product added successfully!", "success");
  } else if (action === "update") {
    const productId = parseInt(submitButton.getAttribute("data-id"));
    const index = products.findIndex((product) => product.id === productId);

    products[index].name = productName;
    products[index].category = productCategory;
    products[index].price = productPrice;
    products[index].description = productDesc;

    showAlert("Product updated successfully!", "success");
    submitButton.innerText = "Create";
    submitButton.removeAttribute("data-id");
  }

  clearForm();
  renderProducts();
}

function clearForm() {
  productForm.reset();
}

function renderProducts() {
  tableBody.innerHTML = "";

  if (products.length === 0) {
    warningMsg.classList.remove("hidden");
    return;
  } else {
    warningMsg.classList.add("hidden");
  }

  products.forEach((product, index) => {
    const row = `
            <tr class="border-b border-gray-300">
                <td class="py-2 px-4">${index + 1}</td>
                <td class="py-2 px-4">${product.name}</td>
                <td class="py-2 px-4">${product.category}</td>
                <td class="py-2 px-4">$${product.price}</td>
                <td class="py-2 px-4">${product.description}</td>
                <td class="py-2 px-4">
                    <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2" onclick="editProduct(${
                      product.id
                    })">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteProduct(${
                      product.id
                    })">Delete</button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}

function editProduct(productId) {
  const product = products.find((product) => product.id === productId);

  document.getElementById("product_name").value = product.name;
  document.getElementById("product_category").value = product.category;
  document.getElementById("product_price").value = product.price;
  document.getElementById("product_desc").value = product.description;

  const submitButton = document.getElementById("create-btn");
  submitButton.innerText = "Update";
  submitButton.setAttribute("data-id", productId);
}

function deleteProduct(productId) {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this product!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      products = products.filter((product) => product.id !== productId);
      showAlert("Product deleted successfully!", "success");
      renderProducts();
    }
  });
}

function showAlert(message, icon) {
  Swal.fire({
    title: message,
    icon: icon,
    timer: 1500,
    showConfirmButton: false,
  });
}

renderProducts();
