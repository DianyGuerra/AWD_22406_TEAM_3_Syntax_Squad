<?php
session_start();

if (isset($_GET['remove'])) {
    $removeId = $_GET['remove'];
    if (isset($_SESSION['cart'])) {
      $_SESSION['cart'] = array_filter($_SESSION['cart'], function($item) use ($removeId) {
          return $item['productId'] != $removeId;
      });
    }
    header("Location: cartUser.php");
    exit();
}

$cart = $_SESSION['cart'] ?? [];
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cart - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="../styles/styleUser.css" />
</head>
<body class="bg-purple-darker text-white">

  <nav class="navbar navbar-dark bg-dark d-lg-none">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" style="height: 50px; filter: invert(1) brightness(2);" />
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
        <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" class="img-fluid" style="max-height: 150px; filter: invert(1) brightness(2);" />
      </div>
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="productsUser.php">Products</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="cartUser.php">Cart</a></li>
        <li class="nav-item"><a class="nav-link text-danger" href="#">Log out</a></li>
      </ul>
    </aside>

    <div class="container py-5">
      <h1 class="text-center text-accent mb-4">Your Cart</h1>

      <?php if (empty($cart)): ?>
        <p class="text-center">Your cart is empty.</p>
      <?php else: ?>
        <?php $total = 0; ?>
        <?php foreach ($cart as $item): ?>
          <?php $subtotal = $item['price'] * $item['quantity']; ?>
          <?php $total += $subtotal; ?>
          <div class="card bg-purple text-white mb-3">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 class="card-title"><?= htmlspecialchars($item['name']) ?></h5>
                <p class="card-text">Precio: $<?= number_format($item['price'], 2) ?> x <?= $item['quantity'] ?></p>
                <p class="card-text">Subtotal: $<?= number_format($subtotal, 2) ?></p>
              </div>
              <a href="cartUser.php?remove=<?= $item['productId'] ?>" class="btn btn-danger btn-sm">Delete</a>
            </div>
          </div>
        <?php endforeach; ?>

        <div class="d-flex justify-content-between align-items-center">
          <h4>Total: $<?= number_format($total, 2) ?></h4>
          <button class="btn btn-accent">Proceed to Payment</button>
        </div>
      <?php endif; ?>
    </div>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
