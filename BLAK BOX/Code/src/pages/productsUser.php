<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once '../../backend/controller/auth.php';
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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../styles/styleUser.css"/>
</head>
<body>

  <?php include('headerResponsiveUser.php');?>

  <div class="d-flex flex-column flex-lg-row min-vh-100">
    
    <?php include('headerUser.php');?>

    <div class="container py-5">
      <h1 class="text-center text-accent mb-4">Our Products</h1>

      <div class="mb-4">
        <div class="row g-2 align-items-center justify-content-center">
          <div class="col-12 col-md-auto d-flex align-items-center">
            <label for="searchInput" class="me-2 mb-0">Search:</label>
            <input type="text" id="searchInput" class="form-control" placeholder="Search products by name...">
          </div>
          <div class="col-12 col-md-auto">
            <select id="categorySelect" class="form-select">
              <option value="all">All Categories</option>
              <?php foreach ($categories as $cat): ?>
                <option value="<?= htmlspecialchars($cat['name']) ?>"><?= htmlspecialchars($cat['name']) ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>
      </div>


      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <?php foreach ($productsCategories as $p): ?>
          <div class="col product-card" data-name="<?= strtolower(htmlspecialchars($p['name'])) ?>" data-category="<?= htmlspecialchars($p['category']) ?>">
            <div class="card bg-purple text-white h-100">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title text-accent"><?= htmlspecialchars($p['name']) ?></h5>
                  <p class="card-text"><?= htmlspecialchars($p['description']) ?></p>
                  <p class="text-warning small">Stock: <?= htmlspecialchars($p['stock']) ?></p>
                  <p><strong>$<?= number_format($p['price'], 2) ?></strong></p>
                </div>
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <a href="detailProducts.php?id=<?= $p['productId'] ?>" class="btn btn-outline-light btn-sm">View</a>
                  <form method="POST" action="../../backend/controller/addCart.php" class="add-to-cart-form">
                    <input type="hidden" name="productId" value="<?= $p['productId'] ?>">
                    <?php if ($p['stock'] <= 0): ?>
                      <button type="button" class="btn btn-secondary btn-sm" disabled>Out of Stock</button>
                    <?php else: ?>
                      <button type="button" class="btn btn-accent btn-sm" onclick="confirmAddToCart(this, '<?= htmlspecialchars($p['name']) ?>')">Add Cart</button>
                    <?php endif; ?>
                  </form>
                  <form method="POST" action="../../backend/controller/addWishlist.php" class="d-inline">
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
      <?php if (isset($_SESSION['productsMsg'])): ?>
          <div class="alert alert-info text-center">
            <?= htmlspecialchars($_SESSION['productsMsg']) ?>
          </div>
          <?php unset($_SESSION['productsMsg']); ?>
      <?php endif; ?>
    </div>
  </div>

  <script src="../scripts/scriptUser.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</body>
</html>