<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
include('../../backend/models/Users.php');
$userId = $_SESSION['user_id'];
$user = User::getUserById($userId);
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Home - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="../styles/styleUser.css" />
</head>
<body  class="bg-purple-darker text-white">

  <?php include('headerResponsiveUser.php');?>

  <div class="d-flex flex-column flex-lg-row min-vh-100">

    <?php include('headerUser.php');?>

    <main class="flex-fill bg-purple-darker p-4">
      <div class="container">
        <div class="mb-4 bg-purple-mid text-white p-3 rounded shadow-sm">
          <h2 class="m-0">Hi, <?= htmlspecialchars($user['firstName']) ?></h2>
          <h2 class="m-0">Welcome to Blak Box</h2>
        </div>


        <div class="row g-4">
          <div class="col-md-4">
            <div class="card bg-purple text-white h-100">
              <div class="card-body">
                <h5 class="card-title text-accent">Products</h5>
                <p class="card-text">Explore our tech products, add them to your cart, and add them to your favorites.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-purple text-white h-100">
              <div class="card-body">
                <h5 class="card-title text-accent">Cart</h5>
                <p class="card-text">View the products you've added to your cart, along with their corresponding value and total, before checking out.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-purple text-white h-100">
              <div class="card-body">
                <h5 class="card-title text-accent">Profile</h5>
                <p class="card-text">Manage your personal information and view your favorite products.</p>
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
