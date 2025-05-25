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
        <li class="nav-item">
            <a class="nav-link text-white" href="./admin.php">
                <i class="bi bi-speedometer2 me-2"></i>Dashboard
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-white" href="../../src/pages/productsAdmin.php">
                <i class="bi bi-box-seam me-2"></i>Products
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-white" href="../../src/pages/ordersAdmin.php">
                <i class="bi bi-receipt-cutoff me-2"></i>Orders
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-danger" href="../../backend/controller/logOut.php">
                <i class="bi bi-box-arrow-right me-2"></i>Log out
            </a>
        </li>
    </ul>
    </div>
</div>