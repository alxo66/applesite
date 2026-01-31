const products = [
  {
    id: "iphone-15",
    name: "iPhone 15",
    price: 79900,
    image: "/images/iphone-15.jpg"
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    price: 99900,
    image: "/images/iphone-15-pro.jpg"
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    price: 119900,
    image: "/images/iphone-15-pro-max.jpg"
  },
  {
    id: "macbook-air-13",
    name: "MacBook Air 13",
    price: 109900,
    image: "/images/macbook-air-13.jpg"
  }
];

exports.list = (req, res) => {
  res.json(products);
};

exports.getById = (id) => {
  return products.find(p => p.id === id);
};
