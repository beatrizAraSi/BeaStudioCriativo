function setupProductCardLink(card, heading, categoryKey, index, productName) {
  const params = new URLSearchParams({ categoria: categoryKey, produto: String(index) });
  const link = document.createElement('a');
  link.href = `produto.html?${params}`;
  link.textContent = productName;
  heading.appendChild(link);
  card.style.cursor = 'pointer';
  card.addEventListener('click', event => {
    if (!event.target.closest('button, a')) window.location.href = link.href;
  });
}

function setupProductGallery(container, images, productName) {
  if (!Array.isArray(images) || images.length === 0 || !images.every(image => typeof image === 'string')) {
    console.error(`Fotos inválidas para ${productName}.`);
    return;
  }

  container.replaceChildren();
  container.removeAttribute('role');
  container.removeAttribute('aria-label');
  container.classList.add('product-gallery');

  const image = document.createElement('img');
  const placeholder = document.createElement('span');
  const counter = document.createElement('span');
  counter.className = 'gallery-counter';
  counter.setAttribute('aria-live', 'polite');
  container.append(image, placeholder);

  let current = 0;
  function showImage() {
    const source = images[current];
    image.hidden = !source;
    placeholder.hidden = Boolean(source);
    if (source) {
      image.src = source;
      image.alt = `${productName}, foto ${current + 1}`;
    } else {
      image.removeAttribute('src');
      placeholder.textContent = `adicione a foto ${current + 1}`;
    }
    counter.textContent = `${current + 1} / ${images.length}`;
  }

  if (images.length > 1) {
    const previous = document.createElement('button');
    previous.type = 'button';
    previous.className = 'gallery-arrow gallery-previous';
    previous.setAttribute('aria-label', `Foto anterior de ${productName}`);
    previous.textContent = '‹';
    previous.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      showImage();
    });

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'gallery-arrow gallery-next';
    next.setAttribute('aria-label', `Próxima foto de ${productName}`);
    next.textContent = '›';
    next.addEventListener('click', () => {
      current = (current + 1) % images.length;
      showImage();
    });
    container.append(previous, next, counter);
  }

  showImage();
}

document.querySelectorAll('.ready-product-image[data-images]').forEach(container => {
  const productName = container.closest('.ready-product-card').querySelector('h2').textContent;
  setupProductGallery(container, JSON.parse(container.dataset.images), productName);
});

// Galeria Pokémon
const pokemonGallery = document.querySelector('.pokemon-gallery');
if (pokemonGallery) {
  const images = pokemonGallery.querySelectorAll('.gallery-image');
  const prevBtn = pokemonGallery.querySelector('.gallery-prev');
  const nextBtn = pokemonGallery.querySelector('.gallery-next');
  const currentCounter = pokemonGallery.querySelector('.gallery-current');
  let currentIndex = 0;

  function updateGallery() {
    images.forEach(img => img.classList.remove('active'));
    images[currentIndex].classList.add('active');
    currentCounter.textContent = currentIndex + 1;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  });
}
