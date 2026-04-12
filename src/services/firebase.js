import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, addDoc, serverTimestamp, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMDqHl-VY0S4QwMvUbLruaI3X7cD_9pQY",
  authDomain: "snowflake-mcq-app.firebaseapp.com",
  projectId: "snowflake-mcq-app",
  storageBucket: "snowflake-mcq-app.firebasestorage.app",
  messagingSenderId: "108356901848",
  appId: "1:108356901848:web:75e86b2356d9dbdb7130ad",
  measurementId: "G-QKCG7EYHCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get all topics
export const getTopics = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "snowflake_topics"));
    return querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return data?.topic_name
          ? { id: doc.id, topic_name: data.topic_name }
          : null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Error getting topics:", error);
    return [
      { id: "1", topic_name: "SnowPipe" },
      { id: "2", topic_name: "Streams" },
    ];
  }
};

// Get questions by topic
export const getQuestionsByTopic = async (topic) => {
  try {
    if (!topic) {
      return [];
    }

    const subcollectionMap = {
      SnowPipe: "snowpipe_topic_questions",
      Streams: "stream_topic_questions",
    };

    const subcollectionName = subcollectionMap[topic] || `${topic.toLowerCase().replace(/\s+/g, "")}_topic_questions`;
    const topicDocRef = doc(db, "questions", topic);
    const q = collection(topicDocRef, subcollectionName);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting questions:", error);
    const localQuestions = (await import('./localQuestions.js')).default;
    if (topic) {
      return localQuestions.filter(q => q.topic === topic);
    }
    return localQuestions;
  }
};

// Add new question
export const addQuestion = async (questionData) => {
  try {
    questionData.createdAt = serverTimestamp();
    const docRef = await addDoc(collection(db, "questions"), questionData);
    console.log("Question added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding question: ", error);
    throw error;
  }
};

