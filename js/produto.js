const params = new URLSearchParams(window.location.search);
const categoryKey = params.get('categoria');
const productIndex = params.get('produto');
const category = Object.hasOwn(categories, categoryKey) ? categories[categoryKey] : null;
const product = category && productIndex !== null && /^(0|[1-9]\d*)$/.test(productIndex)
  ? category.products[Number(productIndex)]
  : null;

if (product) {
  document.querySelector('#product-title').textContent = product.name;
  document.title = `${product.name} | Bea Studio Criativo`;
  const photos = product.images.filter(Boolean);
  const message = document.querySelector('#product-message');
  message.textContent = photos.length ? 'Passe o mouse ou clique na foto para ampliar.' : 'Fotos deste produto em breve.';

  const gallery = document.querySelector('#product-photos');
  const lightbox = document.querySelector('#photo-lightbox');
  const lightboxImage = document.querySelector('#photo-lightbox-image');

  lightbox.querySelector('.photo-lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'Escape') lightbox.close();
  });
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });

  photos.forEach((source, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'product-photo-card';
    card.setAttribute('aria-label', `Ampliar foto ${index + 1} de ${product.name}`);

    const frame = document.createElement('span');
    frame.className = 'product-photo-frame';
    const image = document.createElement('img');
    image.src = source;
    image.alt = `${product.name}, foto ${index + 1}`;
    image.loading = 'lazy';
    frame.appendChild(image);

    const label = document.createElement('span');
    label.className = 'product-photo-label';
    label.textContent = `FOTO ${String(index + 1).padStart(2, '0')} ✦`;
    card.append(frame, label);
    card.addEventListener('click', () => {
      lightboxImage.src = source;
      lightboxImage.alt = image.alt;
      lightbox.showModal();
    });
    gallery.appendChild(card);
  });
}
