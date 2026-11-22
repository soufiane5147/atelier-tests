
const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route de consultation des utilisateurs
app.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ erreur: 'id invalide' });
  }

  try {
    const { rows } = await db.query(
      'SELECT id, nom FROM users WHERE id = $1',
      [id]
    );

    if (!rows[0]) {
      return res.status(404).json({ erreur: 'introuvable' });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// Route de connexion pour le TP
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'a@test.fr' && password === 'secret') {
    return res.status(200).json({
      message: 'Connexion réussie',
      success: true
    });
  }

  return res.status(401).json({
    message: 'Identifiants invalides',
    success: false
  });
});

module.exports = app;
