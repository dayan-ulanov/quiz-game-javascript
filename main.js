const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// start quiz

// find element
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// variables game
let score = 0;
let questionIndex = 0;


// call function
clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

// clear page function
function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	// Questions
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	// Answer options
	questions[questionIndex]['answers'].map((answerText, index ) => {
		index++;
		const questionTemplate =
		` <li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

		let answerHTML = questionTemplate
															.replace('%answer%', answerText)
															.replace('%number%', index);
		listContainer.innerHTML += answerHTML;
	});
}

function checkAnswer() {
	// find the selected radio button
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	const userAnswer = parseInt(checkedRadio.value);

	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}
	console.log('score =', score);

	if (questionIndex !== questions.length - 1) {
		console.log('Dont last question');
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		console.log('Last question');
		clearPage();
		showResult();
	}
}

function showResult() {
	console.log('showResults started!');
	console.log('score: ', score);

	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	// Result!
	let title, message;
	// heading text option
	if (score === questions.length) {
		title = 'Поздровляем! 🥳';
		message = 'Вы ответили верно на все вопросы! 😎';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Не плохой результат! 😉';
		message = 'Вы дали более половины на половины правильных ответов 🤩! 😎';
	} else {
		title = 'Стоит постораться 😔';
		message = 'Пока у вас меньше половины правльных ответов';
	}

	let result = `${score} из ${questions.length}`;

	// the final answer we substitute the data in the template
	const finalMessage = resultsTemplate
														.replace(`%title%`, title)
														.replace(`%message%`, message)
														.replace('%result%', result)

	headerContainer.innerHTML = finalMessage;

	submitBtn.blur();
	submitBtn.innerText = 'Начать заново!';
	submitBtn.onclick = () => history.go();
}
