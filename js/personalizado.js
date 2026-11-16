const productData = {
  adesivos: {
    title: 'Adesivos',
    characteristics: 'Vendidos por unidade: de 3 a 4 cm por R$ 2,50 cada e de 5 a 6 cm por R$ 3,00 cada.',
    options: [
      { name: 'Adesivo de 3 a 4 cm (unidade)', price: 2.50 },
      { name: 'Adesivo de 5 a 6 cm (unidade)', price: 3.00 }
    ]
  },
  bottons: {
    title: 'Bottons Redondos',
    characteristics: 'Escolha o modelo e a quantidade. Consulte “Ver mais” em cada opção para ver preços por faixa e limite de artes.',
    artworkLimits: 'Limite de 2 artes diferentes a partir de 25 unidades e 5 artes a partir de 50.',
    options: [
      {
        name: 'Botton 32 mm',
        price: 5.00,
        priceLabel: 'R$ 5,00 / un.',
        priceTiers: [
          { minQuantity: 50, price: 3.50 },
          { minQuantity: 25, price: 4.00 }
        ]
      },
      {
        name: 'Botton 44 mm',
        price: 8.00,
        priceLabel: 'R$ 8,00 / un.',
        priceTiers: [
          { minQuantity: 50, price: 5.00 },
          { minQuantity: 25, price: 6.00 }
        ]
      },
      {
        name: 'Botton 58 mm',
        price: 10.00,
        priceLabel: 'R$ 10,00 / un.',
        priceTiers: [
          { minQuantity: 50, price: 7.50 },
          { minQuantity: 25, price: 8.50 }
        ]
      }
    ]
  },
  chaveiros: {
    title: 'Chaveiros',
    characteristics: 'Escolha entre as opções Padrão, Premium e Deluxe.',
    options: [
      { name: 'Chaveiro Padrão', price: 15.00 },
      { name: 'Chaveiro Premium', price: 18.00 },
      { name: 'Chaveiro Deluxe', price: 22.00 }
    ]
  },
  bottons_espelhos: {
    title: 'Bottons Espelhos',
    characteristics: 'Bottons espelho disponíveis em 32 mm, 44 mm e 58 mm.',
    options: [
      { name: 'Botton Espelho 32mm', price: 12.00 },
      { name: 'Botton Espelho 44mm', price: 14.00 },
      { name: 'Botton Espelho 58mm', price: 16.00 }
    ]
  },
  bottons_coracao: {
    title: 'Bottons de Coração',
    characteristics: 'Modelos disponíveis nos tamanhos pequeno, médio e grande.',
    options: [
      { name: 'Botton Coração Pequeno', price: 10.00 },
      { name: 'Botton Coração Médio', price: 12.00 },
      { name: 'Botton Coração Grande', price: 14.00 }
    ]
  },
  botton_retangular: {
    title: 'Botton Retangular',
    characteristics: 'Botton em formato retangular.',
    options: [
      { name: 'Botton Retangular', price: 12.00 }
    ]
  }
};

const quantityInput = document.querySelector('#quantity');
const decreaseBtn = document.querySelector('#decreaseBtn');
const increaseBtn = document.querySelector('#increaseBtn');
const optionsContainer = document.querySelector('#optionsContainer');
const subtotalDisplay = document.querySelector('#subtotal');
const totalDisplay = document.querySelector('#total');
const modalArtworkLimits = document.querySelector('#modalArtworkLimits');

let currentPrice = 0;
let selectedOption = null;

function renderProduct(product) {
  document.querySelector('#modalTitle').textContent = product.title;
  document.querySelector('#modalDescription').textContent = `Características: ${product.characteristics}`;
  modalArtworkLimits.textContent = product.artworkLimits || '';
  modalArtworkLimits.hidden = !product.artworkLimits;
  optionsContainer.innerHTML = '';
  selectedOption = null;
  currentPrice = 0;
  quantityInput.min = 1;
  quantityInput.value = 1;

  product.options.forEach((option, index) => {
    const radioId = `option-${index}`;
    const optionGroup = document.createElement('div');
    optionGroup.className = 'option-group';
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-item';
    const optionPrice = option.priceLabel || `R$ ${option.price.toFixed(2).replace('.', ',')}`;
    optionDiv.innerHTML = `
      <input type="radio" id="${radioId}" name="product-option" value="${index}">
      <label for="${radioId}">
        <span>${option.name}</span>
        <span class="option-price">${optionPrice}</span>
      </label>
    `;
    optionGroup.appendChild(optionDiv);

    if (option.priceTiers) {
      const details = document.createElement('details');
      details.className = 'option-more';
      const summary = document.createElement('summary');
      summary.textContent = 'Ver mais';
      const table = document.createElement('table');
      table.className = 'option-price-table';
      table.innerHTML = `
        <thead><tr><th>Quantidade</th><th>Valor unitário</th></tr></thead>
        <tbody>
          <tr><td>Compra por unidade</td><td>R$ ${option.price.toFixed(2).replace('.', ',')} / un.</td></tr>
          ${option.priceTiers.slice().sort((a, b) => a.minQuantity - b.minQuantity).map(tier =>
            `<tr><td>A partir de ${tier.minQuantity} unidades</td><td>R$ ${tier.price.toFixed(2).replace('.', ',')} / un.</td></tr>`
          ).join('')}
        </tbody>
      `;
      details.append(summary, table);
      optionGroup.appendChild(details);
    }

    optionsContainer.appendChild(optionGroup);
  });

  const radios = optionsContainer.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      selectedOption = product.options[parseInt(radio.value, 10)];
      updateTotal();
    });
  });

  updateTotal();
}

function updateTotal() {
  const quantity = Math.max(1, parseInt(quantityInput.value, 10) || 1);
  quantityInput.value = quantity;
  const priceTier = selectedOption?.priceTiers?.find(tier => quantity >= tier.minQuantity);
  currentPrice = priceTier ? priceTier.price : selectedOption?.price || 0;
  const total = currentPrice * quantity;
  subtotalDisplay.textContent = `R$ ${currentPrice.toFixed(2).replace('.', ',')}`;
  totalDisplay.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

decreaseBtn.addEventListener('click', () => {
  const current = parseInt(quantityInput.value) || 1;
  const minimumQuantity = parseInt(quantityInput.min, 10) || 1;
  if (current > minimumQuantity) {
    quantityInput.value = current - 1;
    updateTotal();
  }
});

increaseBtn.addEventListener('click', () => {
  const current = parseInt(quantityInput.value) || 1;
  quantityInput.value = current + 1;
  updateTotal();
});

quantityInput.addEventListener('input', () => {
  if (quantityInput.value !== '') updateTotal();
});
quantityInput.addEventListener('change', updateTotal);

const productKey = new URLSearchParams(window.location.search).get('produto');
if (Object.hasOwn(productData, productKey)) {
  const product = productData[productKey];
  document.title = `${product.title} | Bea Studio Criativo`;
  document.querySelector('#product-details').hidden = false;
  document.querySelector('#product-not-found').hidden = true;
  renderProduct(product);
}

