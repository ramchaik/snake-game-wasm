
const express = require('express');
const compression = require('compression');
const path = require('path');

const PORT = process.env.PORT || 3000;

const public = path.resolve(__dirname, "..", "www", "public");

const app = express();

app.use(compression());
app.use(express.static(public));

app.get("*", (_, res) => {
    res.sendFile(public + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running... [${PORT}]`);
})

