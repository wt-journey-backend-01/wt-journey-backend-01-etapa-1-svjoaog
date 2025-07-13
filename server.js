const express = require('express')

const app = express();
const path = require('path');
const PORT = 3000;
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Uma rota de API simulada que retorna uma lista de lanches pré-definidos em formato JSON.
app.get('/api/lanches', (req, res) => {
    fs.readFile('./public/data/lanches.json', 'utf-8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Erro ao ler o arquivo' });
      res.json(JSON.parse(data));
    });
});

// Recebe os dados enviados pelo formulário da página inicial.
app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;
    res.send(`
      <h1>Obrigado pela sugestão!</h1>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Ingredientes:</strong> ${ingredientes}</p>
      <a href="/">Voltar ao início</a>
    `);
});


let contatoData = null;

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});

app.post('/contato', (req, res) => {
  contatoData = req.body;
  res.redirect('/contato-recebido');
});

app.get('/contato-recebido', (req, res) => {
  if (!contatoData) return res.redirect('/contato');

  const { nome, email, assunto, mensagem } = contatoData;
  res.send(`
    <h1>Mensagem recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar ao início</a>
  `);
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});

