function toggleFavorite(id) {
Swal.fire({
    icon: 'info',
    title: 'Added to favorites',
    text: `Product ${id} was added to your favorites!`,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
});
}

function confirmAddToCart(button, productName) {
  Swal.fire({
    title: 'Add to Cart',
    text: `Do you want to add "${productName}" to the cart?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, add it!',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      const form = button.closest('form');
      if (form) form.submit();
    }
  });
}



