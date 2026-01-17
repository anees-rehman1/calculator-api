const express = require('express');
const { add, subtract, multiply, divide } = require('./calculator');

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Calculator endpoints
app.get('/add/:a/:b', (req, res) => {
  const result = add(Number(req.params.a), Number(req.params.b));
  res.json({ operation: 'addition', result });
});

app.get('/subtract/:a/:b', (req, res) => {
  const result = subtract(Number(req.params.a), Number(req.params.b));
  res.json({ operation: 'subtraction', result });
});

app.get('/multiply/:a/:b', (req, res) => {
  const result = multiply(Number(req.params.a), Number(req.params.b));
  res.json({ operation: 'multiplication', result });
});

app.get('/divide/:a/:b', (req, res) => {
  try {
    const result = divide(Number(req.params.a), Number(req.params.b));
    res.json({ operation: 'division', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Calculator API running on http://localhost:${PORT}`);
});
