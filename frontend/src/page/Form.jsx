import { useEffect, useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://patient-support-system.onrender.com/api/users";

  const [formData, setFormData] = useState({
    name: "",
    issue: "",
    category: "",
  });

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmittedData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/all`);
      setSubmissions(res.data);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch submitted data.";
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setResponse("");

    try {
      const res = await axios.post(`${API_BASE_URL}/submit`, formData);

      setResponse(res.data.message);
      setSubmissions((prev) => [res.data.data, ...prev]);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setSubmissions((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to delete submission.";
      setErrorMessage(message);
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

        <div className="submission-list">
          <h3>Submitted Issues</h3>

          {submissions.length === 0 ? (
            <p className="empty-text">No submissions yet.</p>
          ) : (
            submissions.map((item) => (
              <div key={item._id} className="submission-item">
                <div>
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Issue:</strong> {item.issue}
                  </p>
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
