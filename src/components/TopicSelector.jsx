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

  if (topics.length === 0) {
    return (
      <div className="topic-selector">
        <div className="login-wrapper">
          <div className="topic-card">
            <h2>No topics available</h2>
            <p>Please check your Firebase collection.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-selector">
      <div className="login-wrapper">
        <div className="topic-card">
          <h2>Select Quiz Topic</h2>
          <div className="topics-grid">
            {topics.map((topic) => (
              <button
                key={topic.id}
                className="topic-btn"
                onClick={() => onSelect(topic.topic_name)}
              >
                {topic.topic_name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicSelector;
