document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', async function () {
    const row = this.closest('tr');
    const id = row.dataset.id;
    const data = {
        action: 'update',
        id: id,
        name: row.querySelector("[data-field='name']").textContent,
        description: row.querySelector("[data-field='description']").textContent,
        price: row.querySelector("[data-field='price']").textContent,
        stock: row.querySelector("[data-field='stock']").textContent,
        categoryId: row.querySelector("[data-field='categoryId']").textContent  
    };
    console.log(row.querySelector("[data-field='categoryId']").textContent );


    const result = await Swal.fire({
      title: '¿Update Product?',
      text: "¿Are you sure to update this product?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      fetch('../../backend/models/ProductController.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data)
      }).then(res => res.json())
        .then(res => {
          if (res.success) Swal.fire('¡Updated!', '', 'success');
        });
    }
  });
});

document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', async function () {
    const row = this.closest('tr');
    const id = row.dataset.id;

    const result = await Swal.fire({
      title: '¿Delete this product?',
      text: "This action cannot be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      fetch('../../backend/models/ProductController.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ action: 'delete', id: id })
      }).then(res => res.json())
        .then(res => {
          if (res.success) {
            row.remove();
            Swal.fire('Eliminated!', '', 'success');
          }
        });
    }
  });
});
    
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const msg = urlParams.get('msg');

    if (status === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product registered successfully.',
        confirmButtonColor: '#7B2CBF',
      });
    } else if (status === 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: decodeURIComponent(msg),
        confirmButtonColor: '#C77DFF',
      });
    }