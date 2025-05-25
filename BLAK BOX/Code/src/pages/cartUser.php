<?php
session_start();

if (isset($_GET['remove'])) {
  $removeId = $_GET['remove'];

  if (isset($_SESSION['cart'])) {
    require_once '../../backend/models/Products.php';

    foreach ($_SESSION['cart'] as $key => $item) {
      if ($item['productId'] == $removeId) {
        Product::increaseStock($item['productId'], $item['quantity']);

        unset($_SESSION['cart'][$key]);
        break;
      }
    }
    $_SESSION['cart'] = array_values($_SESSION['cart']);
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cart - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../styles/styleUser.css" />
</head>
<body class="bg-purple-darker text-white">

  <?php include('headerResponsiveUser.php');?>  

  <div class="d-flex flex-column flex-lg-row min-vh-100">

    <?php include('headerUser.php');?>

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

        <div class="d-flex justify-content-between align-items-center flex-column flex-md-row gap-3 mt-4">
        <h4>Total: $<?= number_format($total, 2) ?></h4>
        
        <form action="../../backend/controller/checkout.php" method="post" class="d-flex flex-column flex-md-row align-items-center gap-2">
          <select name="paymentMethod" class="form-select bg-dark text-white border-secondary" required>
            <option value="" disabled selected>Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <button type="submit" class="btn btn-accent">Proceed to Payment</button>
        </form>
      </div>
      <?php endif; ?>

      <?php if (isset($_SESSION['orderMsg'])): ?>
        <div class="alert alert-info text-center">
          <?= htmlspecialchars($_SESSION['orderMsg']) ?>
        </div>
        <?php unset($_SESSION['orderMsg']); ?>
      <?php endif; ?>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>