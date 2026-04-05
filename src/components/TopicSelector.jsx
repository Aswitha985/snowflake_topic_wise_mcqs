import { useState, useEffect } from "react";
import { getTopics } from "../services/firebase";
import "../App.css";

function TopicSelector({ onSelect }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      const loadedTopics = await getTopics();
      setTopics(loadedTopics);
      setLoading(false);
    };
    loadTopics();
  }, []);

  if (loading) {
    return (
      <div className="topic-selector">
        <div className="login-wrapper">
          <div className="topic-card">
            <h2>Loading topics...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-selector">
      <div className="login-wrapper">
        <div className="topic-card">
          <h2>Select Python Topic</h2>
          <div className="topics-grid">
            {topics.map((topic) => (
              <button 
                key={topic}
                className="topic-btn"
                onClick={() => onSelect(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicSelector;
