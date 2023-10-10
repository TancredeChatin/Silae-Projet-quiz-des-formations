// Liste des questions
const questions = [
    {
        question: "", //metre une question entre les ""
        answers: ["", "", "", ""], // metre une proposition de reponse entre les "", vous pouvez enlever et rajouter si vous le voulez temps qu'il y a les "" et des virgules pour les séparer
        correctAnswerIndex: [],  //metre un chiffre qui designe la bonne reponse !ATTENTION le chiffre 0 represente la 1ere proposition et donc 1 represente la 2eme reponse
                                // si il a plusieurs reponses, rajouter une virgule entre les 2 chiffres (Exemple : [0, 1])
        isRadio: true //mettre true si la question n'a qu'une seule reponse selectionnable ou false si il y en a plusieurs
    },
    //si vous voulez rajouter des questions il suffit juste de répéter 
    {
        question: "",
        answers: ["", "", ""],
        correctAnswerIndex: [],
        isRadio: true
    },
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
    
    if (score >= 12) {
        result.innerHTML = "Vous avez réussi le Quiz, vous aurez accès à la formation PAAV2. Vous avez obtenu " + score + " point(s) sur 16";
        result.innerHTML = "Vous avez réussi le Quiz, vous aurez accès à la formation PAAV2. Vous avez obtenu " + score + " point(s) sur " + maxScore + ".";
        const link = document.createElement("a");
        link.href = "https://www.silae.fr/"; // Remplacez "https://www.example.com" par le lien vers la page Internet souhaitée
        link.textContent = "Cliquez ici pour accéder à la page Internet";
        result.appendChild(document.createElement("br")); // Ajouter un retour à la ligne
        result.appendChild(document.createElement("br")); // Ajouter un autre retour à la ligne
        result.appendChild(link);
    } else {
        result.innerHTML = "Vous n'avez pas eu un score assez élevé pour avoir accès à la formation. Vous avez obtenu " + score + " point(s) sur 16.";
        result.innerHTML = "Vous n'avez pas eu un score assez élevé pour avoir accès à la formation. Vous avez obtenu " + score + " point(s) sur " + maxScore + ".";
    
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
