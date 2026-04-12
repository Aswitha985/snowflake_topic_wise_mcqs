import admin from "firebase-admin";
import fs from "fs";

// Read JSON file manually
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadQuestions() {
  const questions = [
    { id: 1, question: "What is Python?" },
    { id: 2, question: "What is a variable?" }
  ];

  for (let q of questions) {
    await db.collection("questions").doc(String(q.id)).set(q);
  }

  console.log("✅ Uploaded successfully");
}

uploadQuestions();