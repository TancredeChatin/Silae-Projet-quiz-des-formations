document.addEventListener("DOMContentLoaded", function () {
    const quizLink = document.getElementById("quizLink");

    // Ajoutez un gestionnaire d'événements pour le clic sur le lien
    quizLink.addEventListener("click", function (e) {
        e.preventDefault(); // Empêche le comportement de lien par défaut

        // Ajoutez une classe d'animation pour la transition
        document.body.classList.add("page-transition-out");

        // Redirigez vers la deuxième page après un certain délai pour permettre l'animation
        setTimeout(function () {
            window.location.href = "Formation PAAV niv2/Quiz_PAAV_Niv2.html";
        }, 1000); // Réglez le délai en millisecondes en fonction de la durée de votre animation CSS
    });
});