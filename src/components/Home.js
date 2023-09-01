import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';


const Home = () => (
    <Fragment>
        <Helmet><title>Quiz-App</title></Helmet>
        <div id="home">
            <section>
                <h1>Quiz App</h1>
                <div className="startButton">
                    <ul>
                        <li><Link className="start" to="/start">START</Link></li>
                    </ul>
                </div>
                <div className="container">
                    <Link to="/login" className="buttons" id="loginButton">Login</Link>
                    <Link ti="/signup" className="buttons" id="signupButton">Sign up</Link>
                </div>
            </section>
        </div>
    </Fragment>
);


export default Home;