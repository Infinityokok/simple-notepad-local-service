const express = require('express')
const path = require('path')
const port = process.env.PORT || 443

const app = express()

app.get('/sw.js', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Service-Worker-Allowed', '/');
    res.sendFile(path.resolve(__dirname, 'sw.js'));
});

app.use(express.static('public'))

app.get('/', (req, res) =>  {
    res.sendFile(path.join(__dirname, 'public', 'notepad.html'))
})

app.listen(port, () =>  {
    console.log(`Server listening on port ${port}`)
})