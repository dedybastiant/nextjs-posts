import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeebackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function formSubmitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const eneterdFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: eneterdFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFeebackItems(data.feedback);
      });
    console.log(feedbackItems);
  }

  console.log(feedbackItems);
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input id="email" type="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Submit Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li>{item.feedbackText}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
