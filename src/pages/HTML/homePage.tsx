/* This page is the home page of our website. It contains a brief description of the website and its purpose, 
as well as two buttons that link to the basic and detailed quiz pages. It also contains a pie chart that 
displays the results of the reviews left by users who have taken the quiz. The user can also input their API key 
in the text box provided. The API key is stored in local storage and is used to access the OpenAI API. */

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import splash from "../../images/businessman.png"
import '../CSS/homePage.css';
import { HomeLink } from "../../components/NavbarElements"
import { reviews } from "./ResultsPage"


    //local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
    let keyData = "";
    const saveKeyData = "MYKEY";

    const HomePage = () => {

    const [key, setKey] = useState<string>(keyData); //for api key input
  
    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));       
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }

    let goodDegs = 360;
    let medDegs = 0;
    let badDegs = 0;
    let fixedReviews: number[] = [0,0,0];

    if(!(localStorage.getItem("MYPIE"))){
        goodDegs = 360;
        medDegs = 0;
        badDegs = 0;
    } else {
        fixedReviews = JSON.parse(reviews);

        const totalReviews = fixedReviews[0] + fixedReviews[1] + fixedReviews[2];
        goodDegs = (fixedReviews[0] / totalReviews) * 360 
        medDegs = (fixedReviews[1] / totalReviews) * 360 + goodDegs;
        badDegs = (fixedReviews[2] / totalReviews) * 360 + medDegs;
    }


    return (
        <>
        <div className="splash-container" style={{display: "flex", justifyContent: "end", alignItems: "center", flexDirection: "column"}}>
            <img src={splash} alt="businessMountains" className="splashPage"></img>
            <div className="one">Struggling to find your way?</div>
            <div className="two">Looking for answers and coming up short?</div>
            <div className="three">Take the quiz that best suits your needs and worry no longer!</div>
            <div className="splash-button"> <Button size="lg" style={{width: "100%", height:"80%", fontSize: "2vw", backgroundColor: "white", color: "rgb(33, 72, 197)", border: "4px solid rgb(33, 72, 197)"}} onClick={() => window.scrollTo({top: 990, behavior: "auto"})}>Find your quiz!</Button></div>
        </div>
        <div id="quiz-descs"></div>
        <div className="quiz-desc-container" data-testid="quiz-desc-holder">
            <HomeLink to="/BasicPage">
                <div className="quiz-desc">
                    <h3>Basic Quiz</h3>
                    <p className="text">Want to take a peek into your career’s future, but don’t have time to take the full career assessment? The basic career quiz is a smaller, faster alternative that gives similar results to the detailed assessment. With only 8 true or false questions, this quiz should only take 5 minutes of your time to show you your future career.</p>
                </div>
            </HomeLink>
            <HomeLink to="/DetailedPage">
                <div className="quiz-desc">
                    <h3>Detailed Quiz</h3>
                    <p className="text">If you want to gain in-depth insight into your career path, this quiz is for you! Multiple-choice, personality-based questions will analyze your core values and identify your ideal career path, selecting from numerous high-profile industries.</p>
                </div>
            </HomeLink>
        </div>
        <div className="quiz-data-row">
            <div className="quiz-data-container">
                <div className="quiz-data-text">
                    <p>See what other people are saying about their JobNav.com results!</p>
                </div>
                <div className="quiz-data-graph">
                    <div className="piechart" data-testid="pieChart">
                        <div style={{
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            background: 'conic-gradient(#386e2d ' + goodDegs + 'deg, #dbd52c ' + goodDegs + 'deg ' + medDegs + 'deg, #b32b2b ' + medDegs + 'deg ' + badDegs + 'deg)'
                        }}></div>
                        <div className="legend">
                            <p style={{color: "#386e2d"}}>"I Loved It!"</p>
                            <p style={{color: "#dbd52c"}}>"It was alright."</p>
                            <p style={{color: "#b32b2b"}}>"I'm not so impressed."</p>
                        </div>
                    </div>
                    <p>~All real data collected on our site~</p>
                </div>
            </div>
        </div>
        <div className="apikey-container-container" >
            <div className="apikey-container" data-testid="api-container">
            <Form style={{marginTop: "10px"}}>
                    <Form.Label>API Key:</Form.Label>
                    <Form.Control role="textbox"type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
                    <br></br>
                    <Button className="Submit-Button" onClick={handleSubmit} style={{marginBottom: "30px"}}>Submit</Button>
                </Form>
            </div>
        </div>
        </>
    );
};

export const key = localStorage.getItem("MYKEY") || ""; //this is to get the api key from the local storage
export default HomePage;

