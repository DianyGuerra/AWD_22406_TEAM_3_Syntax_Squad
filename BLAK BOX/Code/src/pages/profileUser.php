<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
include('../../backend/models/Users.php');
include('../../backend/models/Wishlist.php');
include('../../backend/models/OrderTable.php');

if (!isset($_SESSION['userId'])) {
    header('Location: login.php');
    exit;
}
$userId = $_SESSION['userId'];
$user = User::getUserById($userId);
$wishlistProducts = Wishlist::getUserWishlistProducts($userId);
$orders = OrderTable::getUserOrdersWithProducts($userId);

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Profile - Blak Box</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="../styles/styleUser.css"/>
</head>
<body class="bg-purple-darker text-white">

  <?php include('headerResponsiveUser.php');?>

  <div class="d-flex flex-column flex-lg-row min-vh-100">
    
    <?php include('headerUser.php');?>

    <div class="container py-5">
      <h1 class="text-center text-accent">User Profile</h1>

      <div class="text-box bg-purple">
        <h5 class="card-title text-accent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Personal Information</h5>
        <p><strong class="text-accent">Name:</strong> <?= htmlspecialchars($user['firstName']) . ' ' . htmlspecialchars($user['lastName']) ?></p>
        <p><strong class="text-accent">Email:</strong> <?= htmlspecialchars($user['email']) ?></p>
        <p><strong class="text-accent">Phone number:</strong> <?= htmlspecialchars($user['phoneNumber']) ?></p>
      </div>

      <h2 class="text-center text-accent">Wish List</h2>
      <div class="table-responsive">
        <table class="wishlist-table">
          <thead>
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
                    <form method="POST" action="../../backend/controller/removeWishlist.php">
                      <input type="hidden" name="wishlistId" value="<?= $item['wishlistId'] ?>">
                      <input type="hidden" name="productId" value="<?= $item['productId'] ?>">
                      <button type="submit" class="btn-delete">Delete</button>
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
        
        <h1>&nbsp;</h1>
        <?php if (isset($_SESSION['profileMsg'])): ?>
          <div class="alert alert-info text-center ">
            <?= htmlspecialchars($_SESSION['profileMsg']) ?>
          </div>
          <?php unset($_SESSION['profileMsg']); ?>
        <?php endif; ?>
      </div>

      <h2 class="text-center text-accent">Purchase History</h2>
      <div class="table-responsive">
        <table class="wishlist-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Products</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <?php if (!empty($orders)): ?>
              <?php foreach ($orders as $order): ?>
                <tr>
                  <td><?= htmlspecialchars($order['orderDate']) ?></td>
                  <td><?= htmlspecialchars($order['status']) ?></td>
                  <td>
                    <ul class="mb-0">
                      <?php foreach ($order['products'] as $product): ?>
                        <li>
                          <?= htmlspecialchars($product['productName']) ?>
                          (x<?= $product['quantity'] ?>) - $<?= number_format($product['price'], 2) ?>
                        </li>
                      <?php endforeach; ?>
                    </ul>
                  </td>
                  <td>$<?= number_format($order['total'], 2) ?></td>
                </tr>
              <?php endforeach; ?>
            <?php else: ?>
              <tr>
                <td colspan="5" class="text-center">No purchase history available.</td>
              </tr>
            <?php endif; ?>
          </tbody>
        </table>
      </div>


    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
