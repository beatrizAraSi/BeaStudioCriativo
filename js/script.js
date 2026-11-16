const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileScreen = window.matchMedia('(max-width: 600px)');

function updateMenu() {
  const isMobile = mobileScreen.matches;
  navigation.hidden = isMobile;
  menuButton.setAttribute('aria-expanded', String(!isMobile));
}

document.documentElement.classList.add('js');
updateMenu();
mobileScreen.addEventListener('change', updateMenu);

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.hidden = isOpen;
});

navigation.addEventListener('click', (event) => {
  if (mobileScreen.matches && event.target.closest('a')) {
    navigation.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

const catalogSearchInput = document.querySelector('#catalogSearch');
const catalogSearchMessage = document.querySelector('#catalogSearchMessage');
const catalogItems = document.querySelectorAll('.product-card');
const normalizeSearchText = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

catalogSearchInput.addEventListener('input', () => {
  const searchTerm = normalizeSearchText(catalogSearchInput.value.trim());
  let visibleProductCount = 0;

  catalogItems.forEach((card) => {
    const productName = normalizeSearchText(card.querySelector('h3').textContent);
    const matches = productName.includes(searchTerm);
    card.hidden = !matches;
    if (matches) visibleProductCount += 1;
  });

  catalogSearchMessage.hidden = visibleProductCount > 0;
});

catalogItems.forEach(card => {
  card.addEventListener('click', event => {
    if (!event.target.closest('a')) {
      window.location.href = card.querySelector('.product-more').href;
    }
  });
});
