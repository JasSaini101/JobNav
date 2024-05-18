/* This page is the basic quiz page of our website. It contains 8 questions that the user can answer 
by selecting one of two radio buttons. Once the user has answered all the questions, they can click 
the "Get Answer!" button to get their results. The button creates an OPENAI object that takes the users
responses and generates careers based on them. The user is then redirected to the results page */

import { useEffect, useState } from "react";
import { Form, Alert, Stack, ProgressBar, Offcanvas} from "react-bootstrap";
import OpenAI from "openai";
import { key } from "./homePage"
import { parseAnswers } from "./ResultsPage";
import "../CSS/basicPage.css"
import LoaderComp from "../../components/loader";


const BasicPage = () => {
	const [response, setResponse] = useState<(number)[]>
	([-1, -1, -1, -1, -1, -1, -1, -1]) //initializes the responses to -1 so no radio button is checked

	function updateChoice(index:number){
		setResponse(prevResponse => {
			const updatedResponse = [...prevResponse];
			if(index % 2 === 0){
				updatedResponse[index/2] = 1; //if the index is even, the first radio button is selected
			}
			else{
				updatedResponse[Math.floor(index/2)] = 0; // the second radio button is selected
			}
			return updatedResponse;
		  });
	}

	function getResponses(): string { //returns a string of all the user's responses to the questions
		let description = "";

		if(response[0]){
			description += "I prefer working in a group.\n";
		}
		else{
			description += "I prefer working on my own.\n";
		}

		if(response[1]){
			description += "I prefer having my schedule made for me.\n";
		}
		else{
			description += "I want to be able to work when I want.\n";
		}
        
		if(response[2]){
			description += "I like having detailed instructions when doing a task.\n";
		}
		else{
			description += "I prefer having creative freedom when doing a task.\n";
		}

		if(response[3]){
			description += "I enjoy a job that challenges me.\n";
		}
		else{
			description	+= "I want a job that is easy.\n";
		}

		if(response[4]){
			description += "I enjoy working with my hands.\n";
		}
		else{
			description += "I don't like working with my hands.\n";
		}

		if(response[5]){
			description += "I would work a job I dislike for the money.\n";
		}
		else{
			description += "I would only ever work a job I like.\n";
		}

		if(response[6]){
			description	+= "I want to make a difference in the world.\n";
		}
		else{
			description += "I just want a job.\n";
		}
		if(response[7]){
			description += "I love to travel.\n";
		}
		else{
			description += "I don't like to travel.\n";
		}
		return description;
	}

	const openai = new OpenAI({
		apiKey: key.replaceAll('"',"") || "", //The key has quotes for some reason so this removes them
		dangerouslyAllowBrowser: true, //this is to allow the api key to be stored in the local storage
	});

	async function sendResponse() { //Give the user's answers to the GPT-4 model and get the response
		try{
			setIsLoading(true); //starts the loading animation
			const response = await openai.chat.completions.create({
			model: "gpt-4-turbo",
			messages: [
				{
				"role": "system",
				"content": "You are a helpful assistant that will generate a potential career path for the user based on their preferences. You will also generate three other career paths the user may like. Please complete this in this format, with each field contained in quotes and separated by commas: [Main Career Path, very Detailed reasoning for Main Career Path with at least 4 sentences, Other Career Path 1, Reasoning for Other Career Path 1, Other Career Path 2, Reasoning for Other Career Path 2, Other Career Path 3, Reasoning for Other Career Path 3]"
				//What we want GPT to do
				},
				{
				"role": "user",
				"content": getResponses(), //calls the function that gets the user's responses to the quiz
				}
			],
			temperature: 0,
			max_tokens: 512, //should be 512
			top_p: 1,
			});

			localStorage.setItem("GPTresponse", JSON.stringify(parseAnswers(response.choices[0].message.content)));
			setIsLoading(false); //stops the loading animation
			window.location.href = "/starter_helpi/#/ResultsPage/"; 
		}
		catch(e){ //catches any errors that may occur with an invalid API key
			setIsLoading(false); //stops the loading animation
			window.alert("Invalid API Key, please enter a valid key at the bottom of the home page.");
			window.location.href = "/starter_helpi/";  //redirects to the home page
		}  
	}
	
	const [isLoading, setIsLoading] = useState<boolean>(false); //varaible that controls the loading animation

	const answered = response.reduce((currentTotal: number, num: number) => num !== -1 ?  currentTotal+=1 : currentTotal+=0, 0); //counts the number of questions answered

	function doReset(): void{ //clears all the choices by setting all elements in array to -1
		const resetResponse: number[] = Array(response.length).fill(-1);
		setResponse(resetResponse)
	}

	const [allow, setAllow] = useState<boolean>(false); //variable that allows the user to get the answer
	const [alert, setAlert] = useState<boolean>(false); //variable that shows the alert when the user has answered all the questions
	
    useEffect(() => { //checks if the user has answered all the questions
        if (answered === 8) {
            setAllow(true);
			setAlert(true);
        } else {
            setAllow(false);
			setAlert(false);
        }
    }, [answered]);


	//HTML for the basic quiz page
	return (<>
		<div className="Page-Container">
			<div className="quiz-desc-header-container">
				<div className="quiz-desc-header">
					<h1>
						Basic Quiz
					</h1>
					<p style={{ textAlign: "center" }}>
						Want to take a peek into your career’s future, but don’t have time to take the full career assessment? 
						The basic career quiz is a smaller, faster alternative that gives similar results to the detailed assessment.
						With only 8 parts, choose the statement that best suites you, this quiz should only take 5 minutes of your time to show you the future of your career.
					</p>
					
				</div>
			</div>
			<div style={{textAlign: "center"}}>
	
				<button className="button" hidden={!allow} onClick={sendResponse}>Get Answer!</button>
				<button className="button" disabled={isLoading} onClick={doReset} > Clear All</button>
				<Offcanvas show={isLoading} placement={"top"} scroll={false} backdrop={true}>
					<Offcanvas.Body style={{margin:"50px", display:"flex", flexDirection: "row",  fontSize:"18px", justifyContent:"center"}}>
						<div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
							<p >Calculating your results...</p>
							<p><LoaderComp/></p>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
				<div style={{display: "flex", justifyContent:"center"}}>
		  			<Alert show={alert} variant="success" onClose={() => setAlert(false)}dismissible style={{ marginTop:"10px"}}>
		   				 <p>You've completed all the questions, you can now click the "Get Answer!" button to get your results!</p>
		  			 </Alert>
				</div>
		</div>
		<div className="question-row">
		<div className="question">
			<span className="QuestionNum">#1</span> 
			<span className="radio-container">
				<Stack  className="stack" gap={3}>
				<Form.Check 
						type="radio"
						id="q1-Option1"
						label="I prefer working in a group."
						name="question1"
						onChange={() => updateChoice(0)}
						checked={response[0] === 1 }/>
					<Form.Check
						type="radio"
						id="q-1Option2"
						label="I prefer working on my own."
						name="question1"
						onChange={() => updateChoice(1)}
						checked={response[0] === 0}/>
				</Stack>
			</span>
		</div>
		<div className="question">
			<span className="QuestionNum">#2</span> 
			<span className="radio-container">
			<Stack className="stack" gap={3}> 
			<Form.Check 
					type="radio"
					id="q2-Option1"
					label="I prefer having my schedule made for me."
					name="question2"
					onChange={() => updateChoice(2)}
					checked={response[1] === 1}/>
				<Form.Check 
					type="radio"
					id="q2-Option2"
					label="I want to be able to work whenever I want."
					name="question2"
					onChange={() => updateChoice(3)}
					checked={response[1] === 0}/>
			</Stack>
			</span>
		</div>
		<div className="question">
			<span className="QuestionNum">#3</span> 
			<span className="radio-container">
				<Stack className="stack" gap={3}> 
				<Form.Check 
					type="radio"
					id="q3-Option1"
					label="I like having detailed instructions for tasks."
					name="question3"
					onChange={() => updateChoice(4)}
					checked={response[2] === 1}/>
				<Form.Check 
					type="radio"
					id="q3-Option2"
					label="I prefer having creative freedom for tasks."
					name="question3"
					onChange={() => updateChoice(5)}
					checked={response[2] === 0}/>
				</Stack>
			</span>
		</div>
		<div className="question">
			<span className="QuestionNum">#4</span> 
			<span className="radio-container">
				<Stack className="stack" gap={3}> 
				<Form.Check 
					type="radio"
					id="q4-Option1"
					label="I enjoy a job that challenges me."
					name="question4"
					onChange={() => updateChoice(6)}
					checked={response[3] === 1}/>
				<Form.Check 
					type="radio"
					id="q4-Option2"
					label="I want a job that is easy."
					name="question4"
					onChange={() => updateChoice(7)}
					checked={response[3] === 0}/>
				</Stack>
			</span>	
		</div>
		</div>
		<div className="question-row">
			<div className="question">
				<span className="QuestionNum">#5</span> <span>
				<Stack className="stack" gap={3}>
				<Form.Check 
							type="radio"
							id="q5-Option1"
							label="I enjoy working with my hands."
							name="question5"
							onChange={() => updateChoice(8)}
							checked={response[4] === 1}/>
						<Form.Check  
							type="radio"
							id="q5-Option2"
							label="I don't like working with my hands."
							name="question5"
							onChange={() => updateChoice(9)}
							checked={response[4] === 0}/>
				</Stack>
				</span>	
			</div>	
			<div className="question">		
				<span className="QuestionNum">#6</span> <span className="basic-radials">
				<Stack  className="stack" gap={3}> 
						<Form.Check 
							type="radio"
							id="q6-Option1"
							label="I would work a job I dislike for the money."
							name="question6"
							onChange={() => updateChoice(10)}
							checked={response[5] === 1}
					
							/>
						<Form.Check 
							type="radio"
							id="q6-Option2"
							label="I would only ever work a job I like."
							name="question6"
							onChange={() => updateChoice(11)}
							checked={response[5] === 0}
					
						/>
					</Stack>
				</span>
			</div>
			<div className="question">
				<span className="QuestionNum">#7</span> <span>
				<Stack className="stack" gap={3} > 
				<Form.Check 
							type="radio"
							id="q7-Option1"
							label="I want to make a difference in the world."
							name="question7"
							onChange={() => updateChoice(12)}
							checked={response[6] === 1}/>
						<Form.Check 
							type="radio"
							id="q7-Option2"
							label="I just want a job."
							name="question7"
							onChange={() => updateChoice(13)}
							checked={response[6] === 0}/>
				</Stack>
				</span>	
			</div>
			<div className="question">
			<span className="QuestionNum">#8</span> <span>
			<Stack className="stack" gap={3}> 
			<Form.Check 
						type="radio"
						id="q8-Option1"
						label="I love to travel."
						name="question8"
						onChange={() => updateChoice(14)}
						checked={response[7] === 1}
						/>
					<Form.Check 
						type="radio"
						id="q8-Option2"
						label="I don't love to travel."
						name="question8"
						onChange={() => updateChoice(15)}
						checked={response[7] === 0}/>
					</Stack>
				</span>	
			</div>
			</div>
			
		</div>
		<div style={{marginLeft:"200px", marginRight:"200px", marginBottom:"10px"}}>
		<ProgressBar variant="success" now={answered} animated max={8} />
		</div>

	</>
	);
};
export default BasicPage;
