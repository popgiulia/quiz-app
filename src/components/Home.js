import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz-App</title></Helmet>
        <div id="home">
            <section>
                <h1>Quiz App</h1>
                <div className="paly-button-container">
                    <ul>
                        <li><Link to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    <Link to="/login">Login</Link>
                    <Link ti="/register">Sign up</Link>
                </div>
            </section>
        </div>
    </Fragment>
);


export default Home;