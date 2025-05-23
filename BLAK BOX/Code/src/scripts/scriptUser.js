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

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const products = document.querySelectorAll('.product-card');

  function filterProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value;

    products.forEach(card => {
      const name = card.getAttribute('data-name');
      const prodCategory = card.getAttribute('data-category');

      const matchesName = name.includes(search);
      const matchesCategory = (category === 'all' || prodCategory === category);

      card.style.display = (matchesName && matchesCategory) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
});