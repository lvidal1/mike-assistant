require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const AmazonPollyService = require('./services/TextToSpeechService/AmazonPollyService');

app.use(cors({
    origin: '*'
}));

// Route para convertir texto a voz
app.get('/text-to-speech/:text', (req, res) => {
    const text = req.params.text;
    const language = req.query.language || 'es';

    //const textToSpeechService = new GoogleSpeechToTextService();
    const textToSpeechService = new AmazonPollyService();

    console.log(textToSpeechService)
    textToSpeechService
        .convertTextToSpeech(text, language)
        .then((response) => {
            res.setHeader('Content-Type', "audio/wav");
            res.send(response);
        })
        .catch(error => {
            console.log(error.message)
            res.status(500).send(error);
        });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});