const categories = {
  redondos: {
    title: 'Bottons redondos',
    products: [
      {
        name: 'Botton Pokémon',
        images: ['produtos/BOTTONS POKEMON/01.png', 'produtos/BOTTONS POKEMON/02.png', 'produtos/BOTTONS POKEMON/03.png', 'produtos/BOTTONS POKEMON/04.png', 'produtos/BOTTONS POKEMON/05.png', 'produtos/BOTTONS POKEMON/06.png', 'produtos/BOTTONS POKEMON/07.png', 'produtos/BOTTONS POKEMON/08.png'],
        price: 'R$ 10,00',
        sizes: [
          { name: '32 mm', price: 5.00 },
          { name: '44 mm', price: 8.00 },
          { name: '58 mm', price: 10.00 }
        ]
      },
      { name: 'Botton redondo 01', images: ['', ''], price: '', sizes: [] },
      { name: 'Botton redondo 02', images: ['', ''], price: '', sizes: [] },
      { name: 'Botton redondo 03', images: ['', ''], price: '', sizes: [] }
    ]
  },
  coracao: {
    title: 'Bottons coração',
    products: [
      { name: 'Botton coração 01', images: ['', ''], price: '', sizes: [] },
      { name: 'Botton coração 02', images: ['', ''], price: '', sizes: [] },
      { name: 'Botton coração 03', images: ['', ''], price: '', sizes: [] }
    ]
  },
  retangular: {
    title: 'Bottons retangulares',
    products: [
      { name: 'Botton retangular 01', images: ['', ''], price: '', sizes: [] },
      { name: 'Botton retangular 02', images: ['', ''], price: '', sizes: [] },
      { name: 'Botton retangular 03', images: ['', ''], price: '', sizes: [] }
    ]
  },
  stickers: {
    title: 'Stickers',
    products: [
      { name: 'Sticker 01', images: ['', ''], price: '', sizes: [] },
      { name: 'Sticker 02', images: ['', ''], price: '', sizes: [] },
      { name: 'Sticker 03', images: ['', ''], price: '', sizes: [] }
    ]
  }
};

function getStartingPrice(product) {
  if (product.sizes.length > 0) {
    const minimum = Math.min(...product.sizes.map(size => size.price));
    return `R$ ${minimum.toFixed(2).replace('.', ',')}`;
  }
  return product.price || 'R$ --,--';
}
