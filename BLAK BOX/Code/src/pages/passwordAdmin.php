<?php
$plainPassword = "Admin123";
$hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);
echo "Contraseña hasheada: " . $hashedPassword;
?>
