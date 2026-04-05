# Firebase Quiz Flow TODO

**Goal: Login → Topics from Firebase → Quiz from Firebase → Result**

- [x] Step 1: Create src/data/ and move src/questions.jsx → src/data/questions.jsx
- [x] Step 2: Update src/components/quiz.jsx to use Firebase getQuestionsByTopic(topic) exclusively
- [x] Step 3: Add getTopics() to src/services/firebase.js
- [x] Step 4: Update src/components/TopicSelector.jsx to fetch topics from Firebase
- [ ] Step 5: Update firebase.js with mock/working config
- [x] Step 6: Fix src/components/result.jsx to fetch from Firebase
- [ ] Step 7: Test full flow with `npm run dev`
- [ ] Step 8: Complete
