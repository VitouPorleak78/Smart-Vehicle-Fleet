// backend/src/app.js
const express = require('express');
const cors = require('cors');
const telemetryController = require('./controllers/telemetryControllers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Smart Vehicle Fleet Backend API Engine is Online!');
});

// Clean, decoupled endpoint routing mapping directly to the controller architecture layer
app.post('/api/telemetry/submit', telemetryController.submitLog);

app.listen(PORT, () => {
    console.log(`Smart Fleet Server is live running on http://localhost:${PORT}`);
});