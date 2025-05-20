<?php
session_start();
include('../../backend/models/Users.php');
include('../../backend/models/Wishlist.php');

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
$userId = $_SESSION['user_id'];
$user = User::getUserById($userId);
$wishlistProducts = Wishlist::getUserWishlistProducts($userId);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Profile - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="../styles/styleUser.css"/>
</head>
<body>

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
    <h5 class="offcanvas-title">Menú</h5>
    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
  </div>
  <div class="offcanvas-body">
    <ul class="nav flex-column">
      <li class="nav-item"><a class="nav-link text-white" href="user.php">Home</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="productsUser.php">Products</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="cartUser.php">Cart</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="profileUser.php">Profile</a></li>
      <li class="nav-item"><a class="nav-link text-danger" href="../../backend/models/logOut.php">Log out</a></li>
    </ul>
  </div>
</div>

<div class="d-flex flex-column flex-lg-row min-vh-100">
  <aside class="bg-dark text-white p-3 sidebar d-none d-lg-block">
    <div class="text-center mb-4">
      <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" class="img-fluid" style="max-height: 150px; filter: invert(1) brightness(2);">
    </div>
    <ul class="nav flex-column">
      <li class="nav-item"><a class="nav-link text-white" href="user.php">Home</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="productsUser.php">Products</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="cartUser.php">Cart</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="profileUser.php">Profile</a></li>
      <li class="nav-item"><a class="nav-link text-danger" href="../../backend/models/logOut.php">Log out</a></li>
    </ul>
  </aside>

  <div class="container py-5">
    <h1 class="text-center text-accent mb-4">User Profile</h1>

    <div class="card mb-4 bg-light">
      <div class="card-body">
        <h5 class="card-title">Personal Information</h5>
        <p><strong>Name:</strong> <?= htmlspecialchars($user['firstName']) . ' ' . htmlspecialchars($user['lastName']) ?></p>
        <p><strong>Email:</strong> <?= htmlspecialchars($user['email']) ?></p>
        <p><strong>Address:</strong> <?= htmlspecialchars($user['address']) ?></p>
        <p><strong>Phone number:</strong> <?= htmlspecialchars($user['phoneNumber']) ?></p>
      </div>
    </div>

    <h2 class="text-center text-accent mb-3">Wish List</h2>
    <div class="table-responsive">
      <table class="table table-bordered table-hover bg-white">
        <thead class="table-dark">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php if (!empty($wishlistProducts)): ?>
            <?php foreach ($wishlistProducts as $item): ?>
              <tr>
                <td><?= htmlspecialchars($item['name']) ?></td>
                <td>$<?= number_format($item['price'], 2) ?></td>
                <td>
                  <form method="POST" action="../../backend/models/removeWishlist.php">
                    <input type="hidden" name="wishlistId" value="<?= $item['wishlistId'] ?>">
                    <input type="hidden" name="productId" value="<?= $item['productId'] ?>">
                    <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                  </form>
                </td>
              </tr>
            <?php endforeach; ?>
          <?php else: ?>
              <tr>
                  <td colspan="3" class="text-center">Your wish list is empty.</td>
              </tr>
          <?php endif; ?>
        </tbody>
      </table>

      <?php if (isset($_SESSION['profile_msg'])): ?>
        <div class="alert alert-info text-center">
          <?= htmlspecialchars($_SESSION['profile_msg']) ?>
        </div>
        <?php unset($_SESSION['profile_msg']); ?>
      <?php endif; ?>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
