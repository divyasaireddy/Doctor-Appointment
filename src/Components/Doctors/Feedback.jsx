import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feedback = () => {
  // Initial feedback data
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ali Ahmed", date: "Feb 14, 2023", rating: 5, feedback: "Good services, highly recommended 👍" },
    { id: 2, name: "Sarah Khan", date: "Mar 10, 2023", rating: 4, feedback: "Very friendly and professional!" }
  ]);

  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  // Handle star rating selection
  const handleRating = (index) => {
    setRating(index);
  };

  // Handle feedback submission
  const handleSubmit = () => {
    if (!rating || !feedbackText.trim()) {
      toast.error("Please provide a rating and feedback!");
      return;
    }

    // Create new feedback object
    const newFeedback = {
      id: reviews.length + 1,
      name: "You", // Replace with logged-in user's name if available
      date: new Date().toDateString(),
      rating: rating,
      feedback: feedbackText
    };

    // Update the reviews list
    setReviews([newFeedback, ...reviews]);

    // Success message
    toast.success("Feedback successfully submitted!");

    // Clear input fields
    setRating(0);
    setFeedbackText("");
  };

  return (
    <div className="mt-4">
      <h4 className="mb-3">All reviews ({reviews.length})</h4>

      {/* Display previous feedbacks */}
      <div>
        {reviews.map((review) => (
          <div key={review.id} className="mb-3 p-3 border rounded shadow-sm">
            <strong>{review.name}</strong> <span className="text-muted">({review.date})</span>
            <div>
              {[...Array(5)].map((_, index) => (
                <span key={index} style={{ color: index < review.rating ? "gold" : "gray", fontSize: "18px" }}>
                  ★
                </span>
              ))}
            </div>
            <p className="mb-0">{review.feedback}</p>
          </div>
        ))}
      </div>

      {/* Feedback submission section */}
      <h4 className="mt-4">How would you rate the overall experience?</h4>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{ cursor: "pointer", fontSize: "24px", color: star <= rating ? "gold" : "gray" }}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Share your feedback or suggestions"
        className="form-control mt-3"
      />

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
