 xconst express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/install', (req, res) => {
  const { packageName, installCmd } = req.body;
  if (!packageName || !installCmd) {
    return res.status(400).json({ error: 'packageName and installCmd are required' });
  }

  const child = exec(installCmd, { shell: '/bin/bash' });

  child.stdout.on('data', (data) => {
    // Could implement WebSocket or SSE for real-time logs
    console.log(`[${packageName}] stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`[${packageName}] stderr: ${data}`);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`[${packageName}] Installation succeeded`);
      res.json({ success: true, message: `${packageName} installed successfully.` });
    } else {
      console.log(`[${packageName}] Installation failed with code ${code}`);
      res.json({ success: false, message: `${packageName} installation failed with code ${code}.` });
    }
  });
});

app.listen(port, () => {
  console.log(`Pck3r web installer backend listening at http://localhost:${port}`);
});
