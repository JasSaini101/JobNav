import {render, screen, act} from '@testing-library/react';
import ResultsPage from '../HTML/ResultsPage';

test('Renders on No Career', () => {
    render(<ResultsPage />);
    const careerError = screen.getByText(/No Career Found!/);
    const careerHelp = screen.getByText(/Please go to one of JobNav's career quizzes to generate your ideal career paths./);
    const subcareedDivs = screen.getAllByRole("heading", {name: ""}); //all 3 subcareer boxes should be empty
    const mainHeading = screen.getByRole("heading", {name: /Your ideal career is.../});

    expect(careerError).toBeInTheDocument();
    expect(careerHelp).toBeInTheDocument();
    expect(subcareedDivs).toHaveLength(3);
    expect(mainHeading).toBeInTheDocument();
});

test('Renders Review Elements', () => { 
    render(<ResultsPage />);
    
    //text
    const ratingtext1 = screen.getByText(/Consider Giving Us A Rating Below?/);
    const ratingtext2 = screen.getByText(/Are you satisfied with the job recommendations that you received?/);

    expect(ratingtext1).toBeInTheDocument();
    expect(ratingtext2).toBeInTheDocument();

    //submit button    
    const submitButton  = screen.getByRole("button", {name: /Submit/});
    expect(submitButton).toBeInTheDocument();
    
    //radio buttons
    const radios = screen.getAllByRole("radio");
    const radio1 = screen.getByRole("radio", {name: /Absolutely!/});
    const radio2 = screen.getByRole("radio", {name: /They were alright/});
    const radio3 = screen.getByRole("radio", {name: /I'm not so impressed/});
    expect(radios).toHaveLength(3);
    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
    expect(radio3).toBeInTheDocument();
});

test('Review Elements Function 1', () => {
    render(<ResultsPage />);

    const reviewButton = screen.getByRole("button", {name: /Submit/});
    const radio1 = screen.getByRole("radio", {name: /Absolutely!/});
    const radio2 = screen.getByRole("radio", {name: /They were alright/});
    const radio3 = screen.getByRole("radio", {name: /I'm not so impressed/});

    //submit button should be disabled before clicking a radio button
    expect(reviewButton).toBeDisabled();

    act(() => {
        radio1.click();
    });

    expect(reviewButton).toBeEnabled();
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();

    act(() => {
        radio3.click();
    });

    expect(reviewButton).toBeEnabled();
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
});

test('Review Elements Function 2', () => {
    render(<ResultsPage />);

    const reviewButton = screen.getByRole("button", {name: /Submit/});
    const radio1 = screen.getByRole("radio", {name: /Absolutely!/});
    
    act(() => {
        radio1.click();
    });
    
    expect(reviewButton).toBeEnabled();

    act(() => {
        reviewButton.click();
    });

    expect(reviewButton).toBeDisabled();
    expect(radio1).not.toBeChecked();
});

export {}
