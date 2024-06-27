import React, { useState } from "react";
import "./App.css";
import questions from "./components/question-bank";

export default function APP() {
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerArray, setAnswerArray] = useState(
    Array(questions.length).fill("")
  );
  const [showScore, setShowScore] = useState(false);

  function prevQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  }

  function handleClick(e) {
    setSelectedAnswer(e.target.value); //Select one answer

    const newAnswerArray = [...answerArray]; // Storing the selected ans in an array
    newAnswerArray[questionIndex] = e.target.value;
    setAnswerArray(newAnswerArray);
  }

  console.log(answerArray);

  const correctAnswers = [];
  correctAnswers.push === questions.answer;

  function handleSubmit() {
    for (let i = 0; i < answerArray.length; i++) {
      if (questions[i].options[questions[i].answer] === answerArray[i]) {
        setScore((score) => score + 1);
      }
    }
    setShowScore(true);
  }

  return (
    <>
      <h1>Quiz App</h1>
      {!showScore && (
        <div className="display">
          <h4>
            Question {questionIndex + 1}/{questions.length}{" "}
          </h4>
          <h3>{questions[questionIndex].question}</h3>
          {questions[questionIndex].options.map((option, index) => (
            <>
              <input
                type="radio"
                name="practiceRadio"
                value={option}
                checked={answerArray[questionIndex] === option}
                onChange={handleClick}
                id={questionIndex + "-option-" + index}
                key={index}
              />
              <label for={questionIndex + "-option-" + index} key={index}>
                {option}
              </label>
              <br />
            </>
          ))}
        </div>
      )}
      {!showScore && (
        <div className="butons">
          <button onClick={prevQuestion} disabled={questionIndex === 0}>
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={questionIndex === questions.length - 1}
          >
            Next
          </button>
          <br />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {showScore && (
        <>
          <h3>Result: {score}/10</h3>
          <button onClick={() => window.location.reload()}>Restart</button>
        </>
      )}
    </>
  );
}
