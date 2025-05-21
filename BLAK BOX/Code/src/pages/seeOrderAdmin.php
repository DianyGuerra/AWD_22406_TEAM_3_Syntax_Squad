<?php
include('../../backend/models/OrderService.php');

if (!isset($_GET['orderId'])) {
    echo "Orden no encontrada.";
    exit();
}

$orderId = $_GET['orderId'];
$order = OrderService::getFullOrderById($orderId);

if (!$order) {
    echo "Orden no encontrada.";
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Detalle de Orden</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../styles/styleUser.css"/>
  <link rel="stylesheet" href="../styles/styleAdmin.css"/>

</head>
<main class="flex-fill bg-purple-darker p-4">

  <div>
    <h2 class="mb-4">Detalle de Orden #<?= $order['orderId'] ?></h2>

    <div class="mb-4">
      <p><strong>User:</strong> <?= $order['firstName'] . ' ' . $order['lastName'] ?></p>
      <p><strong>Date:</strong> <?= $order['orderDate'] ?></p>
      <p><strong>Status:</strong> <?= $order['status'] ?></p>
      <p><strong>Total:</strong> $<?= number_format($order['total'], 2) ?></p>
    </div>

    <h4>Productos en la orden</h4>
    <table class="table-products">
      <thead>
        <tr>
          <th>Product</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($order['products'] as $product): ?>
          <tr>
            <td><?= $product['name'] ?></td>
            <td><?= $product['quantity'] ?></td>
            <td>$<?= number_format($product['price'], 2) ?></td>
            <td>$<?= number_format($product['subtotal'], 2) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>

    <a href="ordersAdmin.php" class="btn btn-secondary mt-3">Go Back</a>
  </div>
</main>
</body>
</html>
