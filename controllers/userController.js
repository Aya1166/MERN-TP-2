// Importer les fonctions de validation
const {
    estNonVide,
    estEmailValide
} = require("../utils/validators");

// Tableau des utilisateurs
let users = [
    {
        id: 1,
        name: "Aya",
        email: "aya@example.com",
        role: "admin"
    },
    {
        id: 2,
        name: "Ons",
        email: "ons@example.com",
        role: "user"
    }
];

let prochainId = 3;

// GET : Recuperer tous les utilisateurs
const getAllUsers = (req, res) => {
    const { role } = req.query;

    let resultat = users;

    if (role) {
        resultat = users.filter(
            user => user.role.toLowerCase() === role.toLowerCase()
        );
    }

    res.status(200).json({
        total: resultat.length,
        users: resultat
    });
};

// GET : Recuperer un utilisateur par ID
const getUserById = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    res.status(200).json(user);
};

// POST : Creer un utilisateur
const createUser = (req, res) => {
    const { name, email, role } = req.body;

    // Validation du nom
    if (!estNonVide(name)) {
        return res.status(400).json({
            error: "Le nom est obligatoire et ne doit pas etre vide"
        });
    }

    // Validation de l'email
    if (!estEmailValide(email)) {
        return res.status(400).json({
            error: "L'adresse email est invalide"
        });
    }

    // Eviter les emails en double
    const emailExiste = users.some(
        user => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExiste) {
        return res.status(400).json({
            error: "Cette adresse email existe deja"
        });
    }

    const nouveauUser = {
        id: prochainId++,
        name: name.trim(),
        email: email.trim(),
        role: estNonVide(role) ? role.trim() : "user"
    };

    users.push(nouveauUser);

    res.status(201).json({
        message: "Utilisateur cree avec succes",
        user: nouveauUser
    });
};

// DELETE : Supprimer un utilisateur
const deleteUser = (req, res) => {
    const id = Number(req.params.id);

    const userExiste = users.some(user => user.id === id);

    if (!userExiste) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    users = users.filter(user => user.id !== id);

    res.status(200).json({
        message: `Utilisateur ${id} supprime avec succes`
    });
};

// Exporter les fonctions
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
};