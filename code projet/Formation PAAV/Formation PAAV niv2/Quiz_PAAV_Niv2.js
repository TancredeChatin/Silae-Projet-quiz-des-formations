// Liste des questions
const questions = [
    {
        question: "Comment se nomme le profil de prime dans lequel se trouve l’ensemble des primes ?",
        answers: ["PCCN", "PGP.FR", "Profil utilisateur", "Je ne sais pas"],
        correctAnswerIndex: [1],  //
        isRadio: true
    },
    {
        question: "Quelle est la particularité du paramétrage de la prime d’ancienneté ?",
        answers: ["Elle est paramétrée dans le profil de prime D01", "Elle est paramétrée dans le libellé de prime D01", "Elle est paramétrée le profil CPANC"],
        correctAnswerIndex: [1],  //
        isRadio: true
    },
    {
        question: "Un libellé peut-il exécuter un profil ?",
        answers: ["Vrai", "Faux", "Je ne sais pas"],
        correctAnswerIndex: [1],  //
        isRadio: true
    },
    {
        question: "Un profil peut-il exécuter un profil?",
        answers: ["Vrai", "Faux", "Je ne sais pas"],
        correctAnswerIndex: [0],  //
        isRadio: true
    },
    {
        question: "Quelle(s) information(s) sont/est correcte(s) concernant les profils de prime ?",
        answers: ["Ils déterminent les modalités de calcul des primes", "Ils permettent l’exécution des libellés de prime", "Ils permettent de générer les différents maintiens de salaire"],
        correctAnswerIndex: [0, 1],  //
        isRadio: false
    },
    {
        question: "Quelle(s) information(s) sont/est correcte(s) concernant les libellés de prime ?",
        answers: ["Ils déterminent les modalités de calcul des primes", "Ils déterminent les caractéristiques de base des primes (soumis à cotisation, imposable, inclus dans les CP, etc..)", 
        "Ils déterminent les modalités de calcul de la prime d’ancienneté"],
        correctAnswerIndex: [1, 2],  //
        isRadio: false
    },
    {
        question: "Dans quels cas doit-on utiliser une fonction calcul ?",
        answers: ["Ajouter un bout de paramétrage", "Créer un profil de prime", "Je ne sais pas"],
        correctAnswerIndex: [0],  //
        isRadio: true
    },
    {
        question: "Savez-vous initialiser une variable ?",
        answers: ["Oui", "Non"],
        correctAnswerIndex: [],  // il n'y a pas de bonne reponse normalement
        isRadio: true
    },
    {
        question: "Le print sert ?",
        answers: ["A afficher des informations dans un encadré du bulletin", "A imprimer le programme", "Je ne sais pas"],
        correctAnswerIndex: [0],  //
        isRadio: true
    },
    {
        question: "Quelle est l’utilité de la fonction return ?",
        answers: ["Stopper la lecture du code", "Récupérer le résultat du dernier calcul", "Aucune des deux autres propositions"],
        correctAnswerIndex: [0],  //
        isRadio: true
    },
    {
        question: "Quel est l’impact de la suppression du pgc.fr dans la fiche salarié ?",
        answers: ["Disparition de la fiche salarié", "Disparition des cotisations sur le bulletin"],
        correctAnswerIndex: [1],  //
        isRadio: true
    },
    {
        question: "Quelle est la signification de Pgp ?",
        answers: ["Profil général de Primes", "Plan général de Programme"],
        correctAnswerIndex: [1],  //
        isRadio: true
    },
    {
        question: "Quelle est la signification de Pgc ?",
        answers: ["Programme de Gestion Comptable", "Plan Général de Cotisations"],
        correctAnswerIndex: [1],  //
        isRadio: true
    },
    {
        question: "Que dois-je mettre au début et fin d’un code (hors fonction calcul) ?",
        answers: ["Commence par une majuscule et se termine par un point", "Commencer par Begin et finir par End"],
        correctAnswerIndex: [1],  //
        isRadio: true
    },
    {
        question: "Quels sont les principes des INIT ?",
        answers: ["Permet d’insérer des conditions sur des primes ou des cotisations sans pour autant interférer dans la base commune", "Permet de créer des primes ou des cotisations"],
        correctAnswerIndex: [0],  //
        isRadio: true
    },
    {
        question: "Quelle est la bonne réponse pour stocker une valeur ?",
        answers: ["Stockevar(Demo, x)", "Call stockvar(Demo, x)", "Call stockevar(Demo, x)", "Stockvar(Demo)"],
        correctAnswerIndex: [2],  //
        isRadio: true
    },
    {
        question: "Quelle fonction permet de lister tous les cas possibles ?",
        answers: ["Fonction if - Endif", "Select case - Endselect"],
        correctAnswerIndex: [1],  //
        isRadio: true
    }
];

let currentQuestionIndex = 0; // L'indice de la question actuelle
let selectedAnswers = []; // Tableau pour stocker les réponses sélectionnées par l'utilisateur

// Mélanger les questions pour les afficher dans un ordre aléatoire
shuffleQuestions();

// Fonction pour mélanger les questions de manière aléatoire
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Afficher une question aléatoirement
function showQuestion() {
    const questionContainer = document.getElementById("questionContainer");
    const resultContainer = document.getElementById("resultContainer");

    questionContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");

    if (currentQuestionIndex < questions.length) {
        const answerForm = document.getElementById("answerForm");
        const questionText = document.getElementById("question");
        const questionTypeText = document.getElementById("questionTypeText"); // Nouvel élément ajouté

        const question = questions[currentQuestionIndex];

        questionText.innerHTML = question.question;

        if (question.isRadio) {
            questionTypeText.innerHTML = "";
        } else {
            questionTypeText.innerHTML = "<em>Plusieurs réponses sont attendues :</em>";
        }

        answerForm.innerHTML = ""; // Réinitialiser le contenu du formulaire

        displayAnswers();

        const nextBtn = document.getElementById("nextBtn");
        nextBtn.style.display = "block";
        nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Voir le résultat" : "Suivant";

        // Ajout de l'événement "click" sur le bouton "Suivant"
        nextBtn.addEventListener("click", handleNextClick);
    } else {
        // Afficher les résultats après avoir répondu à toutes les questions
        showResults();
    }
}

// Afficher les réponses sous forme de cases à cocher pour les questions à choix multiple
function displayAnswers() {
    const answers = questions[currentQuestionIndex].answers;
    const isRadio = questions[currentQuestionIndex].isRadio;
    const answerForm = document.getElementById("answerForm");
    answerForm.innerHTML = "";

    for (let i = 0; i < answers.length; i++) {
        const answerLabel = document.createElement("label");
        const inputElement = document.createElement("input");
        inputElement.type = isRadio ? "radio" : "checkbox";
        inputElement.name = isRadio ? "answer" : "answer";
        inputElement.value = i;
        answerLabel.appendChild(inputElement);
        answerLabel.appendChild(document.createTextNode(answers[i]));
        answerForm.appendChild(answerLabel);

        // Ajouter une classe de style spécifique au label lorsqu'il est sélectionné (uniquement pour les boutons radio et les cases à cocher)
        inputElement.addEventListener("change", function() {
            const selectedLabels = answerForm.querySelectorAll(".selected");
            selectedLabels.forEach(label => label.classList.remove("selected"));

            const selectedInputs = answerForm.querySelectorAll('input[name="answer"]:checked');
            selectedInputs.forEach(input => {
                const selectedLabel = input.parentElement;
                selectedLabel.classList.add("selected");
            });
        });

        if (!isRadio) { // Pour les questions de type "checkbox"
            answerLabel.classList.add("checkbox"); // Ajouter la classe "checkbox" pour identifier les questions de type "checkbox"
        }
    }
}

// Gérer le bouton "Suivant" pour passer à la question suivante ou afficher le résultat
function handleNextClick() {
    const selectedAnswerElements = document.querySelectorAll('input[name="answer"]:checked');
    const selectedAnswerIndexes = Array.from(selectedAnswerElements).map(element => Number(element.value));

    if (selectedAnswerIndexes.length === 0) {
        alert("Sélectionnez au moins une réponse avant de passer à la suivante.");
        return;
    }

    const isRadio = questions[currentQuestionIndex].isRadio;
    if (isRadio && selectedAnswerIndexes.length !== 1) {
        alert("Sélectionnez une seule réponse avant de passer à la suivante.");
        return;
    }

    selectedAnswers.push(selectedAnswerIndexes);
    currentQuestionIndex++;

    showQuestion();
}

// Afficher les résultats du quiz
function showResults() {
    const questionContainer = document.getElementById("questionContainer");
    const resultContainer = document.getElementById("resultContainer");
    const result = document.getElementById("result");

    questionContainer.style.display = "none";
    resultContainer.classList.remove("hidden");
    
    const score = calculateScore();

    const failureMessage = `
        Madame, Monsieur ou Cher partenaire,<br><br>
        Vous avez répondu à notre questionnaire de positionnement et nous vous en remercions.<br>
        Après analyse de vos réponses, nous vous confirmer votre inscription à la formation suivante : Apprentissage du paramétrage avancé.<br><br>
        Au terme de la formation « Paramétrages Avancés », vous serez capable de :<br>
        - Personnaliser les cotisations en utilisant le Scriptae.<br>
        - Personnaliser les primes en utilisant le Scriptae.<br>
        - Exploiter les dates dans le paramétrage avancé.<br>
        - Mesurer l’impact et les conséquences de la modification des PCCN.<br>
        - Créer des imports spécifiques aux dossiers.<br><br>
        Cordialement.
    `;


    if (score >= 12) {
        result.innerHTML = "Vous avez réussi le Quiz, vous aurez accès à la formation PAAV2. Vous avez obtenu " + score + " point(s) sur 16";
        result.innerHTML += "<br><br>" + failureMessage;
        const link = document.createElement("a");
        link.href = "https://www.silae.fr/"; // Remplacez "https://www.example.com" par le lien vers la page Internet souhaitée
        link.textContent = "Cliquez ici pour accéder à la page Internet";
        result.appendChild(document.createElement("br")); // Ajouter un retour à la ligne
        result.appendChild(document.createElement("br")); // Ajouter un autre retour à la ligne
        result.appendChild(link);
        
    } else {
        result.innerHTML = "Vous n'avez pas eu un score assez élevé pour avoir accès à la formation. Vous avez obtenu " + score + " point(s) sur 16.";
        const homeBtn = document.createElement("button");
        homeBtn.textContent = "PAAV Niv1";
        homeBtn.addEventListener("click", function() {
            // Rediriger vers la page d'accueil (par exemple, "index.html")
            window.location.href = "../Formation PAAV niv1/Quiz_PAAV_Niv1.html";
        });
        result.appendChild(document.createElement("br")); // Ajouter un retour à la ligne
        result.appendChild(document.createElement("br")); // Ajouter un autre retour à la ligne
        result.appendChild(homeBtn);
    }
}

// Calculer le score en comptant les réponses correctes
function calculateScore() {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        const correctAnswerIndexes = questions[i].correctAnswerIndex;
        const selectedAnswerIndexes = selectedAnswers[i];

        if (questions[i].isRadio) { // Pour les questions de type "radio"
            if (arraysEqual(selectedAnswerIndexes, correctAnswerIndexes)) {
                score++;
            }
        } else { // Pour les questions de type "checkbox"
            if (arraysContainAll(correctAnswerIndexes, selectedAnswerIndexes)) {
                score++;
            }
        }
    }

    return score;
}

// Fonction utilitaire pour vérifier si un tableau contient tous les éléments d'un autre tableau
function arraysContainAll(arr1, arr2) {
    return arr2.every(item => arr1.includes(item));
}

// Vérifier si deux tableaux sont égaux
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

// Ajout de l'événement "click" sur le bouton "Commencer le Quiz"
document.getElementById("startBtn").addEventListener("click", function() {
    startQuiz(); // Appeler la fonction pour commencer le Quiz
    showQuestion(); // Afficher la première question
});

// Fonction pour cacher le bouton "Commencer le Quiz" et afficher le bouton "Suivant"
function startQuiz() {
    const startBtn = document.getElementById("startBtn");
    const nextBtn = document.getElementById("nextBtn");

    startBtn.style.display = "none";
    nextBtn.style.display = "block";
}

// Ajout de l'événement "click" sur le bouton "Abandonner" en dehors de la fonction showQuestion()
const abandonBtn = document.getElementById("abandonBtn");
abandonBtn.addEventListener("click", function() {
    const confirmAbandon = confirm("Êtes-vous sûr de vouloir abandonner le Quiz ?");
    if (confirmAbandon) {
        // Rediriger vers une autre page (par exemple, "index.html")
        window.location.href = "../FormationPAAV.html";
    }
});
