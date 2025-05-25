<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../../backend/controller/auth.php';
requireAdmin();
checkUserType('admin');

include('../../backend/models/OrderTable.php');
$orders = OrderTable::getAllOrders(); 
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
      
        <h2>Registered orders</h2>
        <div class="table-responsive">
          <table class="table-products">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($orders as $order): ?>
                <tr>
                  <td><?= $order->orderId ?></td>
                  <td><?= $order->firstName . ' ' . $order->lastName ?></td>
                  <td><?= $order->orderDate ?></td>
                  <td><?= $order->total ?></td>
                  <td><?= $order->status ?></td>
                  <td>
                    <a href="seeOrderAdmin.php?orderId=<?= $order->orderId ?>" class="btn btn-sm btn-primary">See</a>
                  </td>
                </tr>
              <?php endforeach; ?>
            </tbody>


          </table>
        </div>
    </main>
</div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>