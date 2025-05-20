
function confirmDelete(button, productName) {
  Swal.fire({
    title: 'Delete Product',
    text: `Are you sure you want to delete "${productName}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      const form = button.closest('form');
      if (form) form.submit();
    }
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




