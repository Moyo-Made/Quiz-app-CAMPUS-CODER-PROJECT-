const questions = [
	{
		question: "Who is the CEO of OpenAI?",
		answers: [
			{
				text: "Mark Zuckerberg",
				correct: false,
			},
			{
				text: "Sam Altman",
				correct: true,
			},
			{
				text: "Jeff Bezos",
				correct: false,
			},
			{
				text: "Tim Cook",
				correct: false,
			},
		],
	},
	{
		question: "Who is the richest man in the world according to Forbes",
		answers: [
			{
				text: "Bernard Arnault",
				correct: true,
			},
			{
				text: "Elon Musk",
				correct: false,
			},
			{
				text: "Jeff Bezos",
				correct: false,
			},
			{
				text: "Bill Gates",
				correct: false,
			},
		],
	},
	{
		question: "Which book has the shortest verse in the Bible?",
		answers: [
			{
				text: "Revelation 3:6",
				correct: false,
			},
			{
				text: "Matthew 1:3",
				correct: false,
			},
			{
				text: "Joshua 12:2",
				correct: false,
			},
			{
				text: "John 11:35",
				correct: true,
			},
		],
	},
	{
		question: "What is the name of the shortest bone in the body?",
		answers: [
			{
				text: "Femur",
				correct: false,
			},
			{
				text: "Stapes bone",
				correct: true,
			},
			{
				text: "Scapula",
				correct: false,
			},
			{
				text: "Rib",
				correct: false,
			},
		],
	},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
	resetState();

	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion() {
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + "." + currentQuestion.question;

	answerButtons.innerHTML = "";

	currentQuestion.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function resetState() {
	nextButton.style.display = "none";
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if (isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	} else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach((button) => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < questions.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
});

startQuiz();
