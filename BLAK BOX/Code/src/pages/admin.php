<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../../backend/controller/auth.php';
requireAdmin();
checkUserType('admin');

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../../src/styles/styleAdmin.css" />
</head>
<body>
  
  <?php include('headerResponsiveAdmin.php'); ?>

  <div class="d-flex flex-column flex-lg-row min-vh-100">
    
    <?php include('headerAdmin.php'); ?>
    
    <main class="flex-fill bg-purple-darker p-4">
      <div class="container-fluid">
        <div class="mb-4 bg-purple-mid text-white p-3 rounded shadow-sm">
          <h2 class="m-0">Admin Dashboard</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="card bg-purple text-white h-100">
              <div class="card-body">
                <h5 class="card-title text-accent">
                  <i class="bi bi-plus-circle me-2"></i>Add Product
                </h5>
                <p class="card-text">Quickly add new tech items to your store.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-purple text-white h-100">
              <div class="card-body">
                <h5 class="card-title text-accent">
                  <i class="bi bi-bag-check me-2"></i>Manage Orders
                </h5>
                <p class="card-text">View and update customer orders.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-purple text-white h-100">
              <div class="card-body">
                <h5 class="card-title text-accent">
                  <i class="bi bi-people-fill me-2"></i>User Access
                </h5>
                <p class="card-text">Control admin and client permissions.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>