 const productsGrid = document.getElementById('productsGrid');
    const loader = document.getElementById('loader');

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
          <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}" class="product-image" />
            <div class="product-details">
            
              <h3 class="product-title">${product.title}</h3>
              <p class="product-description">${product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}</p>
               <div class="product-rating">${ratingStars}</div>
              <div class="product-price">$${product.price}</div>
            </div>
          </div>
        `;
      }
      productsGrid.innerHTML = html;
    }

    fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => renderProducts(data.products))
  .catch(err => productsGrid.innerHTML = 'Failed to load products');



       document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for contacting us!');
      document.getElementById('contactForm').reset();
    });
