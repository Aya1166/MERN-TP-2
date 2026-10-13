const express = require("express");

const router = express.Router();

const articleController = require("../controllers/articleController");

// GET : Tous les articles
router.get("/", articleController.getAllArticles);

// GET : Un article par ID
router.get("/:id", articleController.getArticleById);

// POST : Creer un article
router.post("/", articleController.createArticle);

// PUT : Modifier un article
router.put("/:id", articleController.updateArticle);

// DELETE : Supprimer un article
router.delete("/:id", articleController.deleteArticle);

module.exports = router;