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
      category: row.querySelector("[data-field='categoryId']").textContent
    };

    const result = await Swal.fire({
      title: '¿Actualizar producto?',
      text: "¿Estás seguro de modificar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      fetch('../controllers/ProductController.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data)
      }).then(res => res.json())
        .then(res => {
          if (res.success) Swal.fire('¡Actualizado!', '', 'success');
        });
    }
  });
});

document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', async function () {
    const row = this.closest('tr');
    const id = row.dataset.id;

    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      fetch('../controllers/ProductController.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ action: 'delete', id: id })
      }).then(res => res.json())
        .then(res => {
          if (res.success) {
            row.remove();
            Swal.fire('¡Eliminado!', '', 'success');
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
        title: '¡Éxito!',
        text: 'Producto registrado correctamente.',
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