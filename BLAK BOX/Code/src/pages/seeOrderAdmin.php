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
  <title>Order Detail - Blak Blox</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../styles/styleUser.css"/>
  <link rel="stylesheet" href="../styles/styleAdmin.css"/>

</head>
<main class="flex-fill bg-purple-darker p-4">

  <div>
    <h2 class="mb-4">Order Detail #<?= $order['orderId'] ?></h2>

    <div class="mb-4">
      <p><strong>User:</strong> <?= $order['firstName'] . ' ' . $order['lastName'] ?></p>
      <p><strong>Date:</strong> <?= $order['orderDate'] ?></p>
      <p><strong>Status:</strong> <?= $order['status'] ?></p>
      <p><strong>Total:</strong> $<?= number_format($order['total'], 2) ?></p>
    </div>

    <h4>Products in the order</h4>
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
    <br>
    <a href="ordersAdmin.php" class="btn btn-primary ms-2">Go Back</a>
    <form id="statusForm" action="../../backend/controller/UpdateOrderStatus.php" method="post" class="d-inline-block ms-3">
      <input type="hidden" name="orderId" value="<?= $order['orderId'] ?>">
      <select name="status" id="statusSelect" class="form-select d-inline-block w-auto" required>
        <option value="">-- Change Status --</option>
        <option value="Pending" <?= $order['status'] === 'Pending' ? 'selected' : '' ?>>Pending</option>
        <option value="Finalized" <?= $order['status'] === 'Finalized' ? 'selected' : '' ?>>Finalized</option>
        <option value="Cancel" <?= $order['status'] === 'Cancel' ? 'selected' : '' ?>>Cancel</option>
      </select>
      <button type="submit" id="submitBtn" class="btn btn-primary ms-2">Update</button>
    </form>


  </div>
</main>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
    document.getElementById('statusForm').addEventListener('submit', function (e) {
      e.preventDefault(); 

      const select = document.getElementById('statusSelect');
      const selectedStatus = select.value;

      if (!selectedStatus) {
        Swal.fire({
          icon: 'warning',
          title: 'Please select a status',
          confirmButtonText: 'OK'
        });
        return;
      }

      Swal.fire({
        title: 'Are you sure?',
        text: `You are about to change the order status to "${selectedStatus}"`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          e.target.submit(); 
        }
      });
    });
</script>

</body>
</html>
