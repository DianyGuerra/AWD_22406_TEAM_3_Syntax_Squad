const express = require('express');
const path    = require('path');
const app     = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Frontend running on http://localhost:${PORT}`)
);
