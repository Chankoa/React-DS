// test-db.js
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgresql://utilisateur:motdepasse@hote/dbname?sslmode=require',
});

client.connect()
  .then(() => {
    console.log('Connexion réussie à Neon !');
    return client.end();
  })
  .catch(err => {
    console.error('Erreur de connexion :', err);
  });