<nav class="navbar navbar-dark bg-dark d-lg-none">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="../../Images/Logoblanco-removebg-preview.png" alt="Blak Box Logo" style="height: 50px; filter: invert(1) brightness(2);" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</nav>

<div class="offcanvas offcanvas-start bg-dark text-white" tabindex="-1" id="offcanvasMenu">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title">Menu</h5>
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