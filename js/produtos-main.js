// Função para renderizar produtos
function renderProducts(productsGrid, allCategories) {
  const imageColors = ['image-pink', 'image-yellow', 'image-blue', 'image-purple', 'image-green'];
  let colorIndex = 0;

  Object.entries(allCategories).forEach(([categoryKey, category]) => {
    category.products.forEach((product, index) => {
      const card = document.createElement('article');
      card.className = 'ready-product-card';
      card.setAttribute('data-category', categoryKey);

      const imageContainer = document.createElement('div');
      imageContainer.className = `ready-product-image ${imageColors[colorIndex % imageColors.length]}`;
      setupProductGallery(imageContainer, product.images, product.name);

      const info = document.createElement('div');
      info.className = 'ready-product-info';
      
      const name = document.createElement('h2');
      setupProductCardLink(card, name, categoryKey, index, product.name);
      
      const description = document.createElement('p');
      description.textContent = 'Edição especial de Pokémon.';
      
      const price = document.createElement('p');
      price.className = 'ready-product-price';
      const priceLabel = document.createElement('span');
      priceLabel.textContent = 'Preço a partir de';
      const priceValue = document.createElement('strong');
      priceValue.textContent = getStartingPrice(product);
      price.append(priceLabel, priceValue);
      
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'ready-product-buttons';

      const verValoresBtn = document.createElement('button');
      verValoresBtn.type = 'button';
      verValoresBtn.className = 'ready-product-order';
      verValoresBtn.textContent = 'Ver valores';
      verValoresBtn.addEventListener('click', () => {
        if (product.sizes.length > 0) openDetailsModal(product);
      });

      buttonsContainer.append(verValoresBtn);
      info.append(name, description, price, buttonsContainer);

      card.append(imageContainer, info);
      productsGrid.appendChild(card);
      
      colorIndex++;
    });
  });
}

// Função para filtrar produtos
function filterProducts(category) {
  const cards = document.querySelectorAll('.ready-product-card');
  cards.forEach(card => {
    if (category === 'todos' || card.getAttribute('data-category') === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Renderiza todos os produtos na página principal
const allProductsGrid = document.querySelector('#all-products');
if (allProductsGrid) {
  renderProducts(allProductsGrid, categories);
  
  // Adiciona listeners aos botões de filtro
  const filterButtons = document.querySelectorAll('.category-filter');
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      filterProducts(e.target.getAttribute('data-category'));
    });
  });
}

// Modals
const detailsModal = document.querySelector('#detailsModal');
const detailsTitle = document.querySelector('#detailsTitle');
const sizesContainer = document.querySelector('#sizesContainer');
const detailsQuantity = document.querySelector('#detailsQuantity');
const decreaseDetailsBtn = document.querySelector('#decreaseDetails');
const increaseDetailsBtn = document.querySelector('#increaseDetails');
const detailsSubtotal = document.querySelector('#detailsSubtotal');
const detailsTotal = document.querySelector('#detailsTotal');

let currentProduct = null;
let selectedSize = null;
let currentPrice = 0;

// Fechar modals
function closeModals() {
  detailsModal.classList.remove('active');
  selectedSize = null;
}

// Listeners para fechar
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeModals);
});

document.querySelectorAll('.btn-cancel').forEach(btn => {
  btn.addEventListener('click', closeModals);
});

detailsModal.addEventListener('click', (e) => {
  if (e.target === detailsModal) closeModals();
});

// Abrir modal de detalhes
function openDetailsModal(product) {
  currentProduct = product;
  detailsTitle.textContent = product.name;
  sizesContainer.innerHTML = '';
  selectedSize = null;
  currentPrice = 0;
  detailsQuantity.value = 1;
  
  if (product.sizes && product.sizes.length > 0) {
    product.sizes.forEach((size, index) => {
      const option = document.createElement('div');
      option.className = 'size-option';
      const radioId = `size-${index}`;
      
      option.innerHTML = `
        <input type="radio" id="${radioId}" name="product-size" value="${index}">
        <label for="${radioId}">
          <span>${size.name}</span>
          <span class="size-price">R$ ${size.price.toFixed(2).replace('.', ',')}</span>
        </label>
      `;
      
      option.addEventListener('click', () => {
        document.querySelector(`#${radioId}`).checked = true;
        selectedSize = size;
        currentPrice = size.price;
        updateDetailsTotal();
      });
      
      sizesContainer.appendChild(option);
    });
  }
  
  detailsModal.classList.add('active');
  updateDetailsTotal();
}

// Atualizar total de detalhes
function updateDetailsTotal() {
  const quantity = Math.max(1, parseInt(detailsQuantity.value) || 1);
  detailsQuantity.value = quantity;
  const total = currentPrice * quantity;
  detailsSubtotal.textContent = `R$ ${currentPrice.toFixed(2).replace('.', ',')}`;
  detailsTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Listeners de quantidade
decreaseDetailsBtn?.addEventListener('click', () => {
  const current = parseInt(detailsQuantity.value) || 1;
  if (current > 1) {
    detailsQuantity.value = current - 1;
    updateDetailsTotal();
  }
});

increaseDetailsBtn?.addEventListener('click', () => {
  const current = parseInt(detailsQuantity.value) || 1;
  detailsQuantity.value = current + 1;
  updateDetailsTotal();
});

detailsQuantity?.addEventListener('input', () => {
  if (detailsQuantity.value !== '') updateDetailsTotal();
});

