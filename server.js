// File: server.js
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./todo-app-firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Get all todos for a specific user
app.get('/api/todos/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const todosSnapshot = await db.collection('todos').where('userId', '==', userId).get();
    const todosList = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(todosList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// 2. Create a new todo for a specific user
app.post('/api/todos', async (req, res) => {
  const { text, userId } = req.body;
  if (!text || !userId) return res.status(400).json({ error: 'Todo text and user ID are required' });

  try {
    const docRef = await db.collection('todos').add({ text, completed: false, userId });
    res.status(201).json({ id: docRef.id, text, completed: false });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// 3. Update a todo for a specific user
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed, userId } = req.body;

  try {
    const todoDoc = db.collection('todos').doc(id);
    const docSnapshot = await todoDoc.get();
    
    if (!docSnapshot.exists || docSnapshot.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this todo' });
    }
    
    await todoDoc.update({ completed });
    res.status(200).json({ id, completed });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// 4. Delete a todo for a specific user
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const todoDoc = db.collection('todos').doc(id);
    const docSnapshot = await todoDoc.get();
    
    if (!docSnapshot.exists || docSnapshot.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this todo' });
    }
    
    await todoDoc.delete();
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
