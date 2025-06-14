
document.addEventListener('DOMContentLoaded', function () {
  const productsGrid = document.getElementById('productsGrid');

  if (productsGrid) {
    productsGrid.addEventListener('click', function (e) {
      const productCard = e.target.closest('.product-card');
      if (!productCard) return;

      // Add to Cart button
      if (e.target.classList.contains('add-to-cart-btn')) {
        const cartSection = productCard.querySelector('.product-cart');
        cartSection.style.display = 'block';
      }

      // Increase Quantity button
      if (e.target.classList.contains('increase-qty')) {
        const qtySpan = productCard.querySelector('.cart-qty');
        const totalSpan = productCard.querySelector('.cart-total');
        const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
        let qty = parseInt(qtySpan.textContent) + 1;
        qtySpan.textContent = qty;
      totalSpan.textContent = `$${(qty * productPrice).toFixed(2)}`;
      }

      // Buy Now button
      if (e.target.classList.contains('buy-now-btn')) {
        Swal.fire({
          icon: 'success',
          title: 'Proceeding to checkout!',
          text: 'Get ready to checkout this product!',
          confirmButtonText: 'Okay'
        });
      }
    });

    // Fetch products after DOM is ready
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => renderProducts(data.products))
      .catch(err => productsGrid.innerHTML = 'Failed to load products');
  }

  function renderProducts(products) {
    let html = '';
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const imgSrc = product.thumbnail && product.thumbnail.startsWith('http')
        ? product.thumbnail
        : 'https://via.placeholder.com/400x300?text=Image+Not+Found';
      const badge = Math.random() > 0.5 ? `<div class="product-badge">New</div>` : '';
      const ratingStars = '★'.repeat(Math.round(product.rating || 4)) + '☆'.repeat(5 - Math.round(product.rating || 4));

      html += `
        <div class="product-card position-relative">
          ${badge}
          <img src="${imgSrc}" alt="${product.title}" class="product-image" />
          <div class="product-details">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}</p>
            <div class="product-rating">${ratingStars}</div>
            <div class="product-price">$${product.price}</div>
            <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
          <div class="product-cart mt-3 p-3 border rounded" style="display: none;">
            <div class="d-flex justify-content-between align-items-center">
              <span>Quantity: <span class="cart-qty">1</span></span>
              <button class="btn btn-sm btn-secondary increase-qty">+</button>
            </div>
            <div>Total: $<span class="cart-total">${product.price}</span></div>
            <button class="btn btn-success mt-2 buy-now-btn">Buy Now</button>
          </div>
        </div>
      `;
    }
    productsGrid.innerHTML = html;
  }
const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for contacting us. We will get back to you soon.',
        confirmButtonText: 'OK'
      });

      contactForm.reset();
    });
  }
});
