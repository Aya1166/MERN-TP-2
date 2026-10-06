
const produits = [
    { nom: 'Clavier', prix: 45 },
    { nom: 'Écran', prix: 320 },
    { nom: 'Souris', prix: 25 }
];

const { nom, prix } = produits[0];
console.log(nom, prix);

const souris = produits.find(produit => produit.nom === 'Souris');
console.log(souris.prix);

const produitsMoinsDe100 = produits.filter(produit => produit.prix < 100);
console.log(produitsMoinsDe100);

const avecRemise = prix => prix - prix * 0.10;
console.log(avecRemise(320));