<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../../backend/models/auth.php';
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
  <link rel="stylesheet" href="../../src/styles/styleAdmin.css" />
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>
<body>
  
  <nav class="navbar navbar-dark bg-dark d-lg-none">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" style="height: 40px; filter: invert(1) brightness(2);">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  
  <div class="offcanvas offcanvas-start bg-dark text-white" tabindex="-1" id="offcanvasMenu">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Menú</h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="./admin.php">Dashboard</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="../../src/pages/productsAdmin.php">Products</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="../../src/pages/ordersAdmin.php">Orders</a></li>
        <li class="nav-item"><a class="nav-link text-danger" href="../../backend/models/logOut.php">Logout</a></li>
      </ul>
    </div>
  </div>

  <div class="d-flex flex-column flex-lg-row min-vh-100">
    
    
    <aside class="bg-dark text-white p-3 sidebar d-none d-lg-block">
      <div class="text-center mb-4">
        <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" class="img-fluid" style="max-height: 150px; filter: invert(1) brightness(2);">
      </div>
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="./admin.php">Dashboard</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="../../src/pages/productsAdmin.php">Products</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="../../src/pages/ordersAdmin.php">Orders</a></li>
        <li class="nav-item"><a class="nav-link text-danger" href="../../backend/models/logOut.php">Logout</a></li>
      </ul>
    </aside>

    
    <main class="flex-fill bg-purple-darker p-4">
      
        <h2>Registered orders</h2>
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
      
    </main>
</div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>