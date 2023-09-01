import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswer: 0,
            wrongAnswer: 0,
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        this.state = {
            score: (state.score / state.numberOfQuestions) * 100,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswer: state.correctAnswer,
            wrongAnswer: state.wrongAnswer,
        };
    }

    render() {
        const { state } = this.props.location;
        let stats;
        if (state !== undefined) {
            stats = (<h1>Stats is available</h1>);
        }
        else {
            stats = (<h1>No</h1>);
        }
        return (
            <Fragment>
                <Helmet><title>SUMMARY</title></Helmet>
                {stats}
            </Fragment>
        );
    }
}

export default QuizSummary;