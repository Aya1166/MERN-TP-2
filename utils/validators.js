// Verifier qu'une chaine contient du texte
const estNonVide = (chaine) => {
    return typeof chaine === "string" && chaine.trim().length > 0;
};

// Verifier le format simple d'un email
const estEmailValide = (email) => {
    return (
        typeof email === "string" &&
        email === email.trim() &&
        email.includes("@") &&
        email.indexOf("@") > 0 &&
        email.includes(".") &&
        email.lastIndexOf(".") > email.indexOf("@") + 1 &&
        email.lastIndexOf(".") < email.length - 1
    );
};

// Exporter les fonctions
module.exports = {
    estNonVide,
    estEmailValide
};