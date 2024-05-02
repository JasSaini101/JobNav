
import "./detailedPage.css";
import React, { useEffect, useState } from "react";
import { Form, ProgressBar, Alert, /*FormLabel*/ } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
//import constructWithOptions from "styled-components/dist/constructors/constructWithOptions";
import OpenAI from "openai";
import { key } from "./homePage"

const QUESTIONSTARTS = [" If I slept through my alarm, I would ", 
						" If I was assigned to create a presentation for a conference, I would ",
						" If a coworker tells me to redo my part of the presentation, I would ", 
						" If I was in charge of scheduling the meetings for my presentation group, we would meet ", 
						" If I felt that I deserved a higher salary, I would ", 
						" If I saw a stressed coworker with a pile of paperwork on their desk, I would ", 
						" To relax on the weekend, I would "];

const DetailedPage = () => {
	const [Response1, setResponse1] = useState<(boolean | string)[]> ([false, false, false, false, ""]) //create state for all of the questions
	const [Response2, setResponse2] = useState<(boolean | string)[]> ([false, false, false, false, ""])
	const [Response3, setResponse3] = useState<(boolean | string)[]> ([false, false, false, false, ""])
	const [Response4, setResponse4] = useState<(boolean | string)[]> ([false, false, false, false, ""])
	const [Response5, setResponse5] = useState<(boolean | string)[]> ([false, false, false, false, ""])
	const [Response6, setResponse6] = useState<(boolean | string)[]> ([false, false, false, false, ""])
	const [Response7, setResponse7] = useState<(boolean | string)[]> ([false, false, false, false, ""])
	const [otherSelected, setOtherSelected] = useState<boolean[]>([false, false, false, false, false, false, false]); //correlates to the the "other" text inputs will be true if the "other" option is selected
	
	function handleRadio(option:string, questionNum:number, index:number, otherIndex:number) {  //handles regular radio buttons
		const newOtherStatus = [...otherSelected];
		const responseState = questionNum === 1 ? Response1 : //chooses which array to use based on the hardcoded question num
        questionNum === 2 ? Response2 :
		questionNum === 3 ? Response3 :
        questionNum === 4 ? Response4 :
        questionNum === 5 ? Response5 :
        questionNum === 6 ? Response6 :
        questionNum === 7 ? Response7 : [];
    	const newResponse = [...responseState];
		if (option === "Other:") {
			newOtherStatus[otherIndex] = true; //changes the otherSelected index to true
			setOtherSelected(newOtherStatus);	
			newResponse.fill(false, 0, 4); // Reset all options for this question to false
			} else {
			newOtherStatus[otherIndex] = false;
			setOtherSelected(newOtherStatus);
			newResponse.fill(false,0,4);
			newResponse[index] = true; // Set the selected option to true
		}
		switch(questionNum){ //change the array state based on the questionNum
			case 1:
				setResponse1(newResponse);
				break;
			case 2:
				setResponse2(newResponse);
				break;
			case 3:
				setResponse3(newResponse);
				break;		
			case 4:
				setResponse4(newResponse);
				break;
			case 5:
				setResponse5(newResponse);
				break;
			case 6:
				setResponse6(newResponse);
				break;
			case 7:
			setResponse7(newResponse);
				break;
		}
	}
	function handleOtherSelect(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, questionNum: number, index:number){ //handles the "Other:" radio button and updates the text input box
		const responseState = questionNum === 1 ? Response1 : //chooses which array to use based on questionNum
            questionNum === 2 ? Response2 :
            questionNum === 3 ? Response3 :
            questionNum === 4 ? Response4 :
            questionNum === 5? Response5 :
            questionNum === 6 ? Response6 :
            questionNum === 7 ? Response7 : [];
    const newResponse = [...responseState];
		newResponse[index] = event.target.value; //updates the state realtime
		switch (questionNum) { //sets the response of the array based on the questionNum
			case 1:
				setResponse1(newResponse);
				break;
			case 2:
				setResponse2(newResponse);
				break;	
			case 3:
				setResponse3(newResponse);
				break;
			case 4:
				setResponse4(newResponse);
				break;
			case 5:
				setResponse5(newResponse);
				break;
			case 6:
				setResponse6(newResponse);
				break;
			case 7:
				setResponse7(newResponse);
				break;
			default:
				break;
		}
	}
//checks which questions are answered
	function updateProgress(Response1: (boolean| string)[], Response2: (boolean| string)[], Response3: (boolean| string)[], Response4: (boolean| string)[], Response5: (boolean| string)[],
		Response6: (boolean| string)[], Response7: (boolean| string)[]): number { 
		const responses = [Response1, Response2, Response3, Response4, Response5, Response6, Response7]
		const completed: number = responses.reduce((count, response) => {
			const check: boolean = response.some(option => {
				return (
					(typeof option === "boolean" && option === true) || (typeof option ==="string" && option.trim().length > 0) 
				);
			});
			return count + (check ? 1 : 0)
		},0)
		return completed;
	}	
	function doReset(): void{ //clears all the choices 
		const defaultResponse: (boolean |string)[] = [false, false, false, false, ""];
		const resetOther: boolean[] = [false, false, false, false, false, false, false];
		setOtherSelected(resetOther);
		setResponse1(defaultResponse);
		setResponse2(defaultResponse);
		setResponse3(defaultResponse);
		setResponse4(defaultResponse);
		setResponse5(defaultResponse);
		setResponse6(defaultResponse);
		setResponse7(defaultResponse);
	  }

	let answered = updateProgress(Response1, Response2, Response3, Response4, Response5, Response6, Response7);
    const [allow, setAllow] = useState<boolean>(false);
	const [alert, setAlert] = useState<boolean>(false);
   
	useEffect(() => {
       setAllow(answered === 7); //checks the amount of questions answered
	   setAlert(answered === 7)
    }, [answered]);
	return (<>
		<style>{`
        .question-box {
		display:flex;
		gap:10px	
        }
		h3 {
		margin-left: 25px
		}
		.answer-box{
			flex-grow: 1;
			margin-left: 10px
			}
		.questionPrompt{
			font-weight:bold;
			margin-left: 25px;
		}
		.reg-radio{
			display: inline-block;
   			border: 1px solid #ccc; /* Add a border around the radio button */
   			border-radius: 5px; /* Rounded corners */
    		padding: 5px; /* Add padding around the radio button */
    		margin-right: 2px; /* Add space between radio buttons */
			transition: background-color 0.75s ease; /* Makes the container blue and changes text to white */
    		&:hover {
        background-color: #0d6efd;
		color: white;
   			 }
		}
        `}</style>
		<div className="info-portion">
			<h1>
				Detailed Quiz
			</h1>
			<p style={{textAlign:"center", marginLeft: "25px", marginRight: "25px"}}>
				Welcome! For this quiz, you will answer the statements by 
				choosing one of the corresponding multiple choice options
				 below! You will be able to click the "Answer" which will 
				allow you to see the results of you future career.
			</p>
		</div>
		<div style={{textAlign:"center"}}>

		<Button size="lg" onClick={sendRespone} disabled={!allow}>Get Answer!</Button> <Button size="lg" onClick={(doReset)}>Clear All</Button>
		<ProgressBar animated variant="success" now={answered} max={7} style={{marginLeft:"100px", marginRight:"100px", marginTop:"25px"}}></ProgressBar>
		<Alert show={alert} variant="success" onClose={() => setAlert(false)} dismissible>
				<p>You've completed all the questions, you can now click the answer button to get your results!</p>
			</Alert>
		</div>
		<h3>Question 1.</h3>
		<span className="questionPrompt">You slept through your alarm and barely missed the train to work. The next train isn’t for another 30 minutes, so you’ll definitely be late now. What do you do?</span> 
		<div id="q1" className="question-box">
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q1-Option1"
				role="radio-1"
				label="I’ll call my boss and let them know I’ll be late."
				value="call my boss and let them know I’ll be late."
				name="question1"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 1, 0, 0)}
				checked={Response1[0] === true}/>
				</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q1-Option2"
				label="I'll call my friend to see if they can pick me up."
				value = "call my friend to see if they can pick me up."
				name="question1"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 1,1, 0)}/>
				{Response1[1] === true}
				</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q1-Option3"
				value="call in sick and take the day off."
				label = "I'll call in sick and take the day off."
				name="question1"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder",1, 2, 0)}
				checked={Response1[2] === true}/>
				</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q1-Option4"
				label="I’ll take a taxi to work."
				value="take a taxi to work."
				name="question1"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 1, 3, 0)}
				checked={Response1[3] === true}/>
			</div>
			<Form.Check
					inline
					type="radio"
					id="q1-Option5"
					label="Other:"
					value= "Other (not figured out yet)"
					name="question1"
					onChange={() => handleRadio("Other:",1,  4, 0)}
					checked={otherSelected[0] === true}/>
			<div className="answer-box"><Form.Control
					type="text"
					placeholder="Enter your answer"
					value={String(Response1[4])}
					onChange={(event) => handleOtherSelect(event,1, 4)}
					disabled={!otherSelected[0]}	/>
				</div>
			</div>
			<h3>Question 2.</h3>
			<span className="questionPrompt">You and a few coworkers are assigned to create a presentation for a conference that many shareholders of your company will be attending. What’s the first thing you’ll do?</span>
			<div id="q2" className="question-box">
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q2-Option1"
				label="I would try to meet shareholders to find out what think about our company."
				value={"try to meet shareholders to find out what think about our company."}
				name="question2"
				style={{width:"200px"}}
				onChange={() => handleRadio("holder",2,  0, 1)}
				checked={Response2[0] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q2-Option2"
				label="I would assign tasks to our group members to organize our workflow."
				value={"assign tasks to our group members to organize our workflow."}
				name="question2"
				style={{width:"230px"}}
				onChange={() => handleRadio("holder",2,  1, 1)}
				checked={Response2[1] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q2-Option3"
				label="I would start researching the topic and create a rough outline of the presentation."
				value={"start researching the topic and create a rough outline of the presentation."}
				name="question2"
				style={{width:"275px"}}
				onChange={() => handleRadio("holder",2,  2, 1)}
				checked={Response2[2] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q2-Option4"
				label="I would begin designing the slides and decide what topics should be included."
				value={"begin designing the slides and decide what topics should be included."}
				name="question2"
				style={{width:"300px"}}
				onChange={() => handleRadio("holder",2,  3, 1)}
				checked={Response2[3] === true}/>
			</div>
			<Form.Check
					inline
					type="radio"
					id="q2-Option5"
					label="Other:"
					value={"Other (not figured out yet)"}
					name="question2"
					onChange={() => handleRadio("Other:",2, 4, 1)}
					checked={otherSelected[1] === true}/>	
				<div className="answer-box"><Form.Control
					type="text"
					placeholder="Enter your answer"
					value={String(Response2[4])}
					onChange={(event) => handleOtherSelect(event,2, 4)}
					disabled={!otherSelected[1]}/>
				</div>
			</div>
		<h3>Question 3.</h3>
		<span className="questionPrompt">A coworker comments on your part of the presentation and says it isn’t on the correct topic even though you think it is. What do you do to resolve the situation?</span>
		<div id="q3" className="question-box">
		<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q3-Option1"
				label="I would ask my coworker to explain what they think the topic is about."
				value={"ask my coworker to explain what they think the topic is about."}
				name="question3"
				style={{width:"275px"}}
				onChange={() => handleRadio("holder", 3, 0, 2)}
				checked={Response3[0] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q3-Option2"
				label="I would ask my boss what they think about my part of the presentation."
				value={"ask my boss what they think about my part of the presentation."}
				name="question3"
				style={{width:"275px"}}
				onChange={() => handleRadio("holder", 3, 1, 2)}
				checked={Response3[1] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q3-Option3"
				label="I wouldn't change it because I know I'm right."
				value={"not change it because I know I'm right."}
				name="question3"
				style={{width:"250px"}}
				onChange={() => handleRadio("holder",3, 2, 2)}
				checked={Response3[2] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q3-Option4"
				label="I would review the topic and see if I can make my part clearer."
				value={"review the topic and see if I can make my part clearer."}
				name="question3"
				style={{width:"200px"}}
				onChange={() => handleRadio("holder",3,3, 2)}
				checked={Response3[3] === true}/>
			</div>
			<Form.Check
					inline
					type="radio"
					id="q3-Option5"
					label="Other:"
					value={"Other (not figured out yet)"}
					name="question3"
					onChange={() => handleRadio("Other:",3, 4 , 2)}
					checked={otherSelected[2] === true}/>
				<div className="answer-box"><Form.Control
					type="text"
					placeholder="Enter your answer"
					value={String(Response3[4])}
					onChange={(event) => handleOtherSelect(event,3, 4)}
					disabled={!otherSelected[2]}/>
				</div>
			</div>
		<h3>Question 4.</h3>
		<span className="questionPrompt">You’re in charge of scheduling the meetings for your presentation group. How often should you meet, and for how long?</span>
		<div id="q4" className="question-box">
		<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q4-Option1"
				label="We should check in every day for 15 minutes."
				value={"every day for 15 minutes."}
				name="question4"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 4, 0, 3)}
				checked={Response4[0] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q4-Option2"
				label="We should only meet once a week for an hour."
				value={"once a week for an hour."}
				name="question4"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 4, 1, 3)}
				checked={Response4[1] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q4-Option3"
				label="We should meet a few times a week."
				value={"a few times a week."}
				name="question4"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 4, 2, 3)}
				checked={Response4[2] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q4-Option4"
				label="I don't think we need to meet at all, email is fine."
				value={"never. Email is fine."}
				name="question4"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 4, 3, 3)}
				checked={Response4[3] === true}/>
			</div>
			<Form.Check
					inline
					type="radio"
					id="q4-Option5"
					label="Other:"
					value={"Other (not figured out yet)"}
					name="question4"
					onChange={() => handleRadio("Other:", 4, 4, 3)}
					checked={otherSelected[3] === true}/>
			<div className="answer-box"><Form.Control
					type="text"
					placeholder="Enter your answer"
					value={String(Response4[4])}
					onChange={(event) => handleOtherSelect(event,4, 4)}
					disabled={!otherSelected[3]}/>
				</div>
			</div>
		<h3>Question 5.</h3>
		<span className="questionPrompt">Recently, you feel that you have been working hard and deserve a higher salary. How will you go about asking your boss for a raise?</span>
		<div id="q5" className="question-box">
		<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q5-Option1"
				label="I would ask for a raise during my next performance review."
				value={"ask for a raise during my next performance review."}
				name="question5"
				style={{width:"265px"}}
				onChange={() => handleRadio("holder", 5, 0, 4)}
				checked={Response5[0] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q5-Option2"
				label="I’ll just keep quiet until my boss notices my hard work."
				value={"keep quiet until my boss notices my hard work."}
				name="question5"
				style={{width:"265px"}}
				onChange={() => handleRadio("holder", 5, 1, 4)}
				checked={Response5[1] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q5-Option3"
				label="I'll talk to my coworker about how to ask for a raise."
				value={"ask my coworker about how to ask for a raise."}
				name="question5"
				style={{width:"265px"}}
				onChange={() => handleRadio("holder", 5, 2, 4)}
				checked={Response5[2] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q5-Option4"
				label="I need to research how much I should ask for first."
				value={"research how much I should ask for first."}
				name="question5"
				style={{width:"235px"}}
				onChange={() => handleRadio("holder", 5, 3, 4)}
				checked={Response5[3] === true}/>
			</div>
			<Form.Check
					inline
					type="radio"
					id="q5-Option5"
					label="Other:"
					value={"Other (not figured out yet)"}
					name="question5"
					onChange={() => handleRadio("Other:", 5, 4, 4)}
					checked={otherSelected[4] === true}	/>
			<div className="answer-box">
				<Form.Control
					type="text"
					placeholder="Enter your answer"
					value={String(Response5[4])}
					onChange={(event) => handleOtherSelect(event,5, 4)}
					disabled={!otherSelected[4]}/>
				</div>
			</div>
		<h3>Question 6.</h3>
		<span className="questionPrompt">As you’re leaving your job for the day, you see a stressed coworker with a pile of paperwork on their desk. What do you do?</span>
		<div id="q6" className="question-box">
		<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q6-Option1"
				label="I would offer to help them finish their work."
				value={"offer to help them with it."}
				name="question6"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 6, 0, 5)}
				checked={Response6[0] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q6-Option2"
				label="I'm going home. I have my own work to do."
				value={"go home. I have my own work to do."}
				name="question6"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 6, 1, 5)}
				checked={Response6[1] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q6-Option3"
				label="I would wait until tommorow to ask if they need help."
				value={"wait until tommorow to ask if they need help."}
				name="question6"
				style={{width:"275px"}}
				onChange={() => handleRadio("holder", 6, 2, 5)}
				checked={Response6[2] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q6-Option4"
				label="I would let my boss know that they need help."
				value={"let my boss know that they need help."}
				name="question6"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 6, 3, 5)}
				checked={Response6[3] === true}/>
			</div>
			<Form.Check
					inline
					type="radio"
					id="q6-Option5"
					label="Other:"
					value={"Other (not figured out yet)"}
					name="question6"
					onChange={() => handleRadio("Other:", 6, 4, 5)}
					checked={otherSelected[5] === true}	/>
			<div className="answer-box"><Form.Control
					type="text"
					placeholder="Enter your answer"
					value={String(Response6[4])}
					onChange={(event) => handleOtherSelect(event,6, 4)}
					disabled={!otherSelected[5]}/>
				</div>
			</div>
		<h3>Question 7.</h3>
		<span className="questionPrompt">After a very stressful workweek, it’s finally time to relax. What do you do to destress over the weekend?</span>
		<div id="q7" className="question-box">
		<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q7-Option1"
				label="I would go out with friends to relax."
				value={"go out with friends to relax."}
				name="question7"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 7, 0, 6)}
				checked={Response7[0] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q7-Option2"
				label="I would stay home and watch TV to relax."
				value={"stay home and watch TV to relax."}
				name="question7"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 7, 1, 6)}
				checked={Response7[1] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q7-Option3"
				label="I would go to the gym to relax."
				value={"go to the gym to relax."}
				name="question7"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 7, 2, 6)}
				checked={Response7[2] === true}/>
			</div>
			<div className="reg-radio">
			<Form.Check
				inline
				type="radio"
				id="q7-Option4"
				label="I would go to the beach to relax."
				value={"go to the beach to relax."}
				name="question7"
				style={{width:"auto"}}
				onChange={() => handleRadio("holder", 7, 3, 6)}
				checked={Response7[3] === true}/>
			</div>
			<Form.Check
					inline
					type="radio"
					id="q7-Option5"
					label="Other:"
					value={"Other (not figured out yet)"}
					name="question7"
					onChange={() => handleRadio("Other:", 7, 4, 6)}	
					checked={otherSelected[6] ===true}/>
			<div className="answer-box"><Form.Control
					type="text"
					placeholder="Enter your answer"
					value={String(Response7[4])}
					onChange={(event) => handleOtherSelect(event,7, 4)}
					disabled={!otherSelected[6]}/>
				</div>
			</div>
	</>
	);

	function getResponses(): string { //returns the responses of the user
		let answers: string = "";

		let index = Response1.findIndex((option) => option === true); //returns index of answer in that question

		if (index === -1) {
			index = Response1.findIndex((option) => typeof option === "string" && option.trim().length > 0);
		}

		for(let i = 0; i < 7; i++) {
			let container = document.getElementById("q" + (i + 1));
			if (container) {
				const mini = container.querySelector('input[type="radio"]:checked');
				//console.log("Container: " + mini?.getAttribute("value"));
				if(mini?.getAttribute("value")) {answers = answers + QUESTIONSTARTS[i] + mini?.getAttribute("value");}			
			}
			else {
				console.log("Container is null");
			}
		}


		console.log(answers);
		return answers;
	}

	function sendRespone(): void { //Uses the answers from the quiz and sends it all to the GPT-4 model
		const openai = new OpenAI({
			apiKey: key.replaceAll('"',"") || "", //The key has quotes for some reason so this removes them
			dangerouslyAllowBrowser: true, //this is to allow the api key to be stored in the local storage
		});
		  
		async function runGPT() { //Creates conversation with the GPT-4 model
			console.log("API Key: " + key); //for testing purposes
			try{
				const response = await openai.chat.completions.create({
				model: "gpt-4-turbo",
				messages: [
					{
					"role": "system",
					"content": "You are a helpful assistant that will generate a potential career path for the user based on a few hypothetical situations. You will also generate three other career paths the user may like.Please complete this in this format, with each field contained in quotes and separated by commas:[ Main Career Path, very Detailed reasoning for Main Career Path with at least 4 sentences, Other Career Path 1, Reasoning for Other Career Path 1, Other Career Path 2, Reasoning for Other Career Path 2, Other Career Path 3, Reasoning for Other Career Path 3 ]" //What we want GPT to do
					},
					{
					"role": "user",
					"content": getResponses(), //calls the function that gets the description
					}
				],
				temperature: 0.8,
				max_tokens: 64,//should be 512
				top_p: 1,
				});
	
				console.log(response.choices[0].message.content); //GPT Response to the user's input
			}
			catch(e){ //catches any errors that may occur with an invalid API key
				console.log(e);
			}  
		}

		runGPT(); //run the function at the end
	
	}
};
export default DetailedPage;