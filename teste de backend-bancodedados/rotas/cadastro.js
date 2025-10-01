const express = require('express');
const router = express.Router();
const db = require('../db');

// Cadastro
router.post('/cadastro', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (usuarios.length > 0) {
      return res.status(409).json({ message: 'Usuário já existe.' });
    }

    await db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password]);
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor.', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password]);

    if (usuarios.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
    }

    return res.status(200).json({ message: `Bem-vindo ${username}!`, username });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor.', error });
  }
});

module.exports = router;
