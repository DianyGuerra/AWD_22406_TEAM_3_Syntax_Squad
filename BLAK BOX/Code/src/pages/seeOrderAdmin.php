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
</head>
<body class="bg-dark text-white">

  <div class="container mt-5">
    <h2 class="mb-4">Detalle de Orden #<?= $order->orderId ?></h2>

    <div class="mb-4">
      <p><strong>Cliente:</strong> <?= $order->firstName . ' ' . $order->lastName ?></p>
      <p><strong>Fecha:</strong> <?= $order->orderDate ?></p>
      <p><strong>Estado:</strong> <?= $order->status ?></p>
      <p><strong>Total:</strong> $<?= number_format($order->total, 2) ?></p>
    </div>

    <h4>Productos en la orden</h4>
    <table class="table table-bordered table-dark table-hover">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($order->products as $product): ?>
          <tr>
            <td><?= $product->name ?></td>
            <td><?= $product->quantity ?></td>
            <td>$<?= number_format($product->price, 2) ?></td>
            <td>$<?= number_format($product->price * $product->quantity, 2) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>

    <a href="ordersAdmin.php" class="btn btn-secondary mt-3">Volver</a>
  </div>

</body>
</html>
