import { useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    issue: "",
    category: "",
  });

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/submit",
        formData
      );

      setResponse(res.data.message);
      setFormData({
        name: "",
        issue: "",
        category: "",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Submit Your Issue</h2>

        <form onSubmit={handleSubmit} className="issue-form">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />

        <input
          type="text"
          name="issue"
          placeholder="Enter your issue"
          value={formData.issue}
          onChange={handleChange}
          disabled={isLoading}
        />

        <input
          type="text"
          name="category"
          placeholder="Enter category"
          value={formData.category}
          onChange={handleChange}
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        </form>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        {response && (
          <div className="response-box">
            <h3>Response</h3>
            <p>{response}</p>
          </div>
        )}
        
        </div>
    </div>
  );
};

export default Form;
