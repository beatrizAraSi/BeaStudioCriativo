const categoryKey = new URLSearchParams(window.location.search).get('categoria');
const category = Object.hasOwn(categories, categoryKey) ? categories[categoryKey] : null;

if (category) {
  document.querySelector('#category-title').textContent = category.title;
  document.querySelector('#category-message').textContent = 'Adicione as fotos e os preços dos produtos desta categoria.';
  document.title = `${category.title} | Bea Studio Criativo`;
  document.querySelector(`[data-category="${categoryKey}"]`).setAttribute('aria-current', 'page');

  const productGrid = document.querySelector('#category-products');
  const imageColors = ['image-pink', 'image-yellow', 'image-blue'];

  category.products.forEach((product, index) => {
    const card = document.createElement('article');
    card.className = 'ready-product-card';

    const imageContainer = document.createElement('div');
    imageContainer.className = `ready-product-image ${imageColors[index % imageColors.length]}`;
    setupProductGallery(imageContainer, product.images, product.name);

    const info = document.createElement('div');
    info.className = 'ready-product-info';
    const name = document.createElement('h2');
    setupProductCardLink(card, name, categoryKey, index, product.name);
    const price = document.createElement('p');
    price.className = 'ready-product-price';
    const priceLabel = document.createElement('span');
    priceLabel.textContent = 'Preço a partir de';
    const priceValue = document.createElement('strong');
    priceValue.textContent = getStartingPrice(product);
    price.append(priceLabel, priceValue);
    info.append(name, price);
    card.append(imageContainer, info);
    productGrid.appendChild(card);
  });
}
