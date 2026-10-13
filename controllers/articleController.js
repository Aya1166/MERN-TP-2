// Donnees des articles stockees en memoire
let articles = [
    { id: 1, title: "Bienvenue sur le blog", author: "Admin" },
    { id: 2, title: "Mon premier serveur Express", author: "Aya" },
    { id: 3, title: "Tester une API avec Postman", author: "Aya" }
];

let prochainId = 4;

// GET : Recuperer tous les articles
const getAllArticles = (req, res) => {
    const { author } = req.query;

    let resultat = articles;

    if (author) {
        resultat = articles.filter(a => a.author === author);
    }

    res.status(200).json({
        total: resultat.length,
        articles: resultat
    });
};

// GET : Recuperer un article par son ID
const getArticleById = (req, res) => {
    const id = Number(req.params.id);

    const article = articles.find(a => a.id === id);

    if (!article) {
        return res.status(404).json({
            error: `Article ${id} introuvable`
        });
    }

    res.status(200).json(article);
};

// POST : Creer un nouvel article
const createArticle = (req, res) => {
    const { title, author } = req.body;

    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof author !== "string" ||
        !author.trim()
    ) {
        return res.status(400).json({
            error: "Le titre et l'auteur sont obligatoires"
        });
    }

    const nouvelArticle = {
        id: prochainId++,
        title: title.trim(),
        author: author.trim()
    };

    articles.push(nouvelArticle);

    res.status(201).json({
        message: "Article cree",
        article: nouvelArticle
    });
};

// PUT : Mettre a jour un article
const updateArticle = (req, res) => {
    const id = Number(req.params.id);
    const { title, author } = req.body;

    const index = articles.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: `Article ${id} introuvable`
        });
    }

    if (
        title !== undefined &&
        (typeof title !== "string" || !title.trim())
    ) {
        return res.status(400).json({
            error: "Le titre doit etre une chaine non vide"
        });
    }

    if (
        author !== undefined &&
        (typeof author !== "string" || !author.trim())
    ) {
        return res.status(400).json({
            error: "L'auteur doit etre une chaine non vide"
        });
    }

    if (title !== undefined) {
        articles[index].title = title.trim();
    }

    if (author !== undefined) {
        articles[index].author = author.trim();
    }

    res.status(200).json({
        message: "Article mis a jour",
        article: articles[index]
    });
};

// DELETE : Supprimer un article
const deleteArticle = (req, res) => {
    const id = Number(req.params.id);

    const articleExiste = articles.some(a => a.id === id);

    if (!articleExiste) {
        return res.status(404).json({
            error: `Impossible de supprimer : article ${id} introuvable`
        });
    }

    articles = articles.filter(a => a.id !== id);

    res.status(200).json({
        message: `Article ${id} supprime avec succes`
    });
};

// Exporter les fonctions du controleur
module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};