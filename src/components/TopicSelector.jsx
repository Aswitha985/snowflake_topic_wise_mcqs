import "../App.css";

const topics = [
  "Operators",
  "Functions",
  "Syntax",
  "Data Types",
  "Input/Output",
  "Data Structures",
  "Loops"
];

function TopicSelector({ onSelect }) {
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
