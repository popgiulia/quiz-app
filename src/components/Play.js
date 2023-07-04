import React, { useState } from 'react';

function Play() {
    const questions = [
        {
            question: 'Care este capitala Franței?',
            answers: ['Londra', 'Paris', 'Berlin', 'Madrid'],
            correctAnswer: 'B'
        },
        {
            question: 'Câte planete există în sistemul nostru solar?',
            answers: ['7', '8', '9', '10'],
            correctAnswer: 'B'
        },
        {
            question: 'Care este cel mai mare ocean de pe Pământ?',
            answers: ['Oceanul Atlantic', 'Oceanul Indian', 'Oceanul Pacific', 'Oceanul Arctic'],
            correctAnswer: 'C'
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const displayQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];

            return (
                <div id="question-container">
                    <h1>Întrebare:</h1>
                    <p id="question">{currentQuestion.question}</p>
                    <ul id="answers">
                        {currentQuestion.answers.map((answer, index) => (
                            <li key={index}>
                                <input type="radio" name="answer" value={String.fromCharCode(65 + index)} /> {answer}
                            </li>
                        ))}
                    </ul>
                    <button onClick={checkAnswer}>Verifică răspunsul</button>
                </div>
            );
        } else {
            return <div id="question-container"><h1>Final</h1></div>;
        }
    };

    const checkAnswer = () => {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            const answerValue = selectedAnswer.value;
            const currentQuestion = questions[currentQuestionIndex];
            if (answerValue === currentQuestion.correctAnswer) {
                alert('Răspunsul este corect!');
            } else {
                alert('Răspunsul este greșit!');
            }

            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Vă rugăm să selectați un răspuns!');
        }
    };

    return <div className="App">{displayQuestion()}</div>;
}

export default Play;

