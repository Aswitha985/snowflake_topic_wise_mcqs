import admin from 'firebase-admin';
import { readFileSync } from 'fs';
const serviceAccount = JSON.parse(readFileSync('./src/services/serviceAccountKey.json', 'utf8'));

async function loadLocalQuestions() {
  const { default: localQuestions } = await import('./src/services/localQuestions.js');
  return localQuestions;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function uploadQuestions() {
  const localQuestions = await loadLocalQuestions();
  console.log('Uploading', localQuestions.length, 'questions...');
  
  // Clear existing
  const snapshot = await db.collection('questions').get();
  const batch = db.batch();
  snapshot.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  
// Upload new
  let uploadBatch = db.batch();
  let batchCount = 0;
  for (const q of localQuestions) {
    const docRef = db.collection('questions').doc(q.id);
    uploadBatch.set(docRef, q);
    batchCount++;
    if (batchCount === 500) {
      await uploadBatch.commit();
      uploadBatch = db.batch();
      batchCount = 0;
    }
  }
  if (batchCount > 0) {
    await uploadBatch.commit();
  }
  
  console.log('✅ Uploaded to Firestore!');
}

uploadQuestions().catch(console.error);
