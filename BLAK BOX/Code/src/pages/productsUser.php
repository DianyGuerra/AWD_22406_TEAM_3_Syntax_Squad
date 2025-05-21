<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once '../../backend/models/auth.php';
requireLogin();
checkUserType('user');
include('../../backend/models/Products.php');
include('../../backend/models/Category.php');
$categories = Category::getCategories();
$productsCategories = Product::listAllProductsCategories();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Products - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="../styles/styleUser.css"/>
</head>
<body>

  <nav class="navbar navbar-dark bg-dark d-lg-none">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" style="height: 50px; filter: invert(1) brightness(2);">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <div class="offcanvas offcanvas-start bg-dark text-white" tabindex="-1" id="offcanvasMenu">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Menu</h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="user.php">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="productsUser.php">Products</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="cartUser.php">Cart</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="profileUser.php">Profile</a></li>
        <li class="nav-item"><a class="nav-link text-danger" href="../../backend/models/logOut.php">Log out</a></li>
      </ul>
    </div>
  </div>

  <div class="d-flex flex-column flex-lg-row min-vh-100">
    
    <aside class="bg-dark text-white p-3 sidebar d-none d-lg-block">
      <div class="text-center mb-4">
        <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" class="img-fluid" style="max-height: 150px; filter: invert(1) brightness(2);">
      </div>
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="user.php">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="productsUser.php">Products</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="cartUser.php">Cart</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="profileUser.php">Profile</a></li>
        <li class="nav-item"><a class="nav-link text-danger" href="../../backend/models/logOut.php">Log out</a></li>
      </ul>
    </aside>

    <div class="container py-5">
      <h1 class="text-center text-accent mb-4">Our Products</h1>

      <div class="align-items-center mb-4 d-flex justify-content-center">
        <label for="searchInput" class="me-2">Search:</label>
        <input type="text" id="searchInput" class="form-control w-auto" placeholder="Search products by name...">&nbsp;&nbsp;
        <select id="categorySelect" class="form-select w-auto">
          <option value="all">All Categories</option>
          <?php foreach ($categories as $cat): ?>
            <option value="<?= htmlspecialchars($cat['name']) ?>"><?= htmlspecialchars($cat['name']) ?></option>
          <?php endforeach; ?>
        </select>

      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <?php foreach ($productsCategories as $p): ?>
          <div class="col product-card" data-name="<?= strtolower(htmlspecialchars($p['name'])) ?>" data-category="<?= htmlspecialchars($p['category']) ?>">
            <div class="card bg-purple text-white h-100">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title text-accent"><?= htmlspecialchars($p['name']) ?></h5>
                  <p class="card-text"><?= htmlspecialchars($p['description']) ?></p>
                  <p><strong>$<?= number_format($p['price'], 2) ?></strong></p>
                </div>
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <a href="detail_products.php?id=<?= $p['productId'] ?>" class="btn btn-outline-light btn-sm">View</a>
                  <form method="POST" action="../../backend/models/addCart.php" class="add-to-cart-form">
                    <input type="hidden" name="productId" value="<?= $p['productId'] ?>">
                    <button type="button" class="btn btn-accent btn-sm" onclick="confirmAddToCart(this, '<?= htmlspecialchars($p['name']) ?>')">Add Cart</button>
                  </form>
                  <form method="POST" action="../../backend/models/addWishlist.php" class="d-inline">
                    <input type="hidden" name="addWishlistProductId" value="<?= $p['productId'] ?>">
                    <button type="submit" class="btn btn-outline-warning btn-sm">Favorite</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>

      <h1>&nbsp;</h1>
      <?php if (isset($_SESSION['products_msg'])): ?>
          <div class="alert alert-info text-center">
            <?= htmlspecialchars($_SESSION['products_msg']) ?>
          </div>
          <?php unset($_SESSION['products_msg']); ?>
      <?php endif; ?>
    </div>
  </div>

  <script src="../scripts/scriptUser.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</body>
</html>