import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from 'materialize-css';
import questions from '../../../src/questions.json';
import isEmpty from "../../functions/is_empty";
import classnames from 'classnames';


class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            nextButtonDisable: false,
            previousButtonDisable: true,
            time: {}
        };
        this.interval = null;
    }

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    componentUnmount() {
        clearInterval(this.interval);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer

            }, () => {
                this.handleDisableButton();
            });
        }
    };

    handleNextButtonClick = () => {
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };

    handlePreviousButtonClick = () => {
        if (this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };

    handleFinishButtonClick = () => {
        window.location.href = '/';
    };

    handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'nextButton':
                this.handleNextButtonClick();
                break;
            case 'previousButton':
                this.handlePreviousButtonClick();
                break;
            case 'finishButton':
                this.handleFinishButtonClick();
                break;
            default:
                break;
        }
    };

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correctAnswermethod();
        }
        else { this.wrongAnswermethod(); }
    }

    correctAnswermethod = () => {
        M.toast({
            html: 'corect',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    wrongAnswermethod = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'gresit',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    startTimer = () => {
        const countTime = Date.now() + 30000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            }
            else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000);
    }

    handleDisableButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisable: true
            });
        } else {
            this.setState({
                previousButtonDisable: false
            });
        }
        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisable: true
            });
        } else {
            this.setState({
                nextButtonDisable: false
            });
        }
    }

    endGame = () => {
        alert('Quiz has ended!');
        const { state } = this;
        const studentStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestion: state.numberOfAnsweredQuestion,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        };
        console.log(studentStats);
        setTimeout(() => {
            window.location.href = ('/start/quizSummary', studentStats);
        }, 1000);
    }


    render() {
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, time } = this.state;
        return (
            <Fragment>
                <Helmet><title>Quiz</title></Helmet>
                <div className="questions">
                    <div className="top-container">
                        <div className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</div>
                        <div className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></div>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="buttonContainer">
                        <button className={classnames('', { 'disable': this.state.previousButtonDisable })} id="previousButton" onClick={this.handleButtonClick}>Previous</button>
                        <button className={classnames('', { 'disable': this.state.nextButtonDisable })} id="nextButton" onClick={this.handleButtonClick}>Next</button>
                        <button id="finishButton" onClick={this.handleButtonClick}>Finish</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Play;