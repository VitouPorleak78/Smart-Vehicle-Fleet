const express = require('express');
const cors = require('cors');
const fs = require('fs'); // <--- Add Node's File System module
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/telemetry/submit', (req, res) => {
    const newData = req.body;
    newData.timestamp = new Date().toISOString(); // Add a submission timestamp

    // 1. Read existing logs from a local text file, or start an empty array if it doesn't exist
    let localLogs = [];
    if (fs.existsSync('mock_database.json')) {
        const fileContent = fs.readFileSync('mock_database.json', 'utf8');
        localLogs = JSON.parse(fileContent || '[]');
    }

    // 2. Append the new frontend log payload into our array
    localLogs.push(newData);

    // 3. Overwrite and save the updated array back onto your hard drive
    fs.writeFileSync('mock_database.json', JSON.stringify(localLogs, null, 2), 'utf8');

    console.log('💾 Successfully saved a new row into mock_database.json!');

    res.status(200).json({ success: true, message: 'Saved to local file!' });
});

app.listen(5000, () => console.log('Backend listening on port 5000'));