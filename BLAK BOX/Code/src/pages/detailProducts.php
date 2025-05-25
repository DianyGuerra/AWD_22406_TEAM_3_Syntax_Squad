<?php
session_start();

if (!isset($_SESSION['userId'])) {
    header('Location: login.php');
    exit;
}

require_once '../../backend/controller/auth.php';
requireLogin();
checkUserType('user');

include('../../backend/models/Products.php');
$productId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$product = Product::getProductById($productId);

if (!$product) {
  $notFound = true;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Detail Products - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../styles/styleUser.css"/>

</head>
<body class="bg-purple-darker text-white">

  <?php include('headerResponsiveUser.php');?>

  <div class="d-flex flex-column flex-lg-row min-vh-100">
    
    <?php include('headerUser.php');?>

    <main class="flex-fill p-4">
      <div class="container">

        <a href="productsUser.php" class="text-accent mb-4 d-inline-block text-decoration-none">
          ← Back to Products
        </a>

        <?php if (!isset($notFound)): ?>
          <div class="row">
            <div class="text-center d-flex flex-column align-items-center">
              <h2 class="text-accent"><?= htmlspecialchars($product['name']) ?></h2>
              <p><?= htmlspecialchars($product['description']) ?></p>
              <p><strong>Stock:</strong> <?= htmlspecialchars($product['stock']) ?></p>
              <p><strong>Category:</strong> <?= htmlspecialchars($product['category']) ?></p>
              <p><strong>Category Description:</strong> <?= htmlspecialchars($product['categoryDescription']) ?></p>
              <h4>$<?= number_format($product['price'], 2) ?></h4><br>

              <div class="d-flex mt-3 gap-2">
                <form method="POST" action="../../backend/controller/addCart.php">
                  <input type="hidden" name="productId" value="<?= $product['productId'] ?>">
                  <?php if ($product['stock'] <= 0): ?>
                      <button type="button" class="btn btn-secondary btn-sm" disabled>Out of Stock</button>
                    <?php else: ?>
                      <button type="button" class="btn btn-accent btn-sm" onclick="confirmAddToCart(this, '<?= htmlspecialchars($product['name']) ?>')">Add Cart</button>
                    <?php endif; ?>
                </form>

                <form method="POST" action="../../backend/controller/addWishlist.php" class="d-inline">
                  <input type="hidden" name="addWishlistProductId" value="<?= $product['productId'] ?>">
                  <button type="submit" class="btn btn-outline-warning">⭐ Favorite</button>
                </form>
              </div>
            </div>
          </div>
        <?php else: ?>
          <div class="text-center mt-5">
            <h2 class="text-danger">Product not found</h2>
            <a href="productsUser.php" class="btn btn-outline-light mt-3">Back to Products</a>
          </div>
        <?php endif; ?>

        <h1>&nbsp;</h1>
        <?php if (isset($_SESSION['msg'])): ?>
          <div class="alert alert-info text-center">
            <?= htmlspecialchars($_SESSION['msg']) ?>
          </div>
          <?php unset($_SESSION['msg']); ?>
        <?php endif; ?>
      </div>
    </main>
  </div>

  <script src="../scripts/scriptUser.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>
