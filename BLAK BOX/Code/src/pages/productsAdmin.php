<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once '../../backend/controller/auth.php';
requireAdmin();
checkUserType('admin');
require_once '../../backend/models/ConnectionDB.php';
$db = new connectionDB();
$conn = $db->connection();

$categories = [];
$result = $conn->query("SELECT categoryId, name FROM Category");
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin - Products</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../../src/styles/styleAdmin.css" />
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>
<body>
  
  <?php include('headerResponsiveAdmin.php'); ?>

  <div class="d-flex flex-column flex-lg-row min-vh-100">
    
    <?php include('headerAdmin.php'); ?>
    
    <main class="flex-fill bg-purple-darker p-4">
      <h1>Product Manager</h1>
      <div class="parent-container">
        <div class="product-form-container">
          <h2 class="form-title">Add New Product</h2>
          <form action="../../backend/controller/InsertProduct.php" method="POST" class="product-form">
            <div class="form-group">
              <label for="name">Product Name</label>
              <input type="text" id="name" name="name" required>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" name="description" required></textarea>
            </div>

            <div class="form-group">
              <label for="price">Price ($)</label>
              <input type="number" id="price" name="price" step="0.01" required>
            </div>

            <div class="form-group">
              <label for="stock">Stock</label>
              <input type="number" id="stock" name="stock" required>
            </div>

            <div class="form-group">
              <label for="categoryId">Category</label>
              <select id="categoryId" name="categoryId" required>
                <option value="" disabled selected>Select a category</option>
                <?php foreach ($categories as $category): ?>
                  <option value="<?= $category['categoryId'] ?>"><?= htmlspecialchars($category['name']) ?></option>
                <?php endforeach; ?>
              </select>
            </div>

            <button type="submit" class="submit-btn">Add Product</button>
          </form>
        </div>
      </div>
      <div class="table-responsive">
        <table id="productTable" class="table-products">
          <thead>
            <tr>
              <th>Name</th>
              <th>Descripción</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody>
            <?php
            include('../../backend/models/Products.php');
            $productos = Product::listAllProducts();
            foreach ($productos as $p) {
              echo "<tr data-id='{$p['productId']}'>
                <td contenteditable='true' class='editable' data-field='name'>{$p['name']}</td>
                <td contenteditable='true' class='editable' data-field='description'>{$p['description']}</td>
                <td contenteditable='true' class='editable' data-field='price'>{$p['price']}</td>
                <td contenteditable='true' class='editable' data-field='stock'>{$p['stock']}</td>
                <td contenteditable='true' class='editable' data-field='categoryId'>{$p['categoryId']}</td>
                <td>
                  <button class='btn-edit'>Update</button>
                  <button class='btn-delete'>Delete</button>
                </td>
              </tr>";
            }
            ?>
          </tbody>
        </table>
      </div>



    </main>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="../scripts/productsAdmin.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>