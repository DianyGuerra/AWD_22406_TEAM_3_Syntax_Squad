<?php
session_start();

include('../../backend/models/Products.php');

$productId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

$product = Product::getProductById($productId);
$productName = $product['name'];
if (!$product) {
  $notFound = true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['productId'])) {
  $id = (int)$_POST['productId'];

  if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
  }

  $found = false;
  foreach ($_SESSION['cart'] as &$item) {
    if ($item['productId'] == $id) {
      $item['quantity'] += 1;
      $found = true;
      break;
    }
  }

  if (!$found) {
    $_SESSION['cart'][] = [
      'productId' => $product['productId'],
      'name' => $product['name'],
      'price' => $product['price'],
      'quantity' => 1
    ];
  }

  header("Location: detail_products.php?id=" . $id);
  exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Detail Products - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="../styles/styleUser.css"/>

</head>
<body class="bg-purple-darker text-white">

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
        <li class="nav-item"><a class="nav-link text-white" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="productsUser.php">Products</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="cartUser.php">Cart</a></li>
        <li class="nav-item"><a class="nav-link text-danger" href="#">Log out</a></li>
      </ul>
    </div>
  </div>

  <div class="d-flex flex-column flex-lg-row min-vh-100">
    <aside class="bg-dark text-white p-3 sidebar d-none d-lg-block">
      <div class="text-center mb-4">
        <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" class="img-fluid" style="max-height: 150px; filter: invert(1) brightness(2);">
      </div>
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="productsUser.php">Products</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="cartUser.php">Cart</a></li>
        <li class="nav-item"><a class="nav-link text-danger" href="#">Log out</a></li>
      </ul>
    </aside>

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
                <form method="POST" action="">
                  <input type="hidden" name="productId" value="<?= $product['productId'] ?>">
                  <button type="button" class="btn btn-accent" onclick="confirmAddToCart(this, '<?= htmlspecialchars($productName) ?>')">Add to Cart</button>
                </form>
                <button class="btn btn-outline-warning" onclick="toggleFavorite('<?= htmlspecialchars($productName) ?>')">⭐ Favorite</button>
              </div>
            </div>
          </div>
        <?php else: ?>
          <div class="text-center mt-5">
            <h2 class="text-danger">Product not found</h2>
            <a href="productsUser.php" class="btn btn-outline-light mt-3">Back to Products</a>
          </div>
        <?php endif; ?>

      </div>
    </main>
  </div>

  <script src="../scripts/scriptUser.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>
