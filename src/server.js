
const app = require('./app');

const PORT = 3000;

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`Serveur pret sur http://127.0.0.1:${PORT}`);
});

server.on('error', (error) => {
  console.error('Erreur serveur :', error.message);
});
