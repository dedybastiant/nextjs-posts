import { useRef } from "react";

function HomePage() {
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
    // console.log(reqBody);

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
    </div>
  );
}

export default HomePage;
