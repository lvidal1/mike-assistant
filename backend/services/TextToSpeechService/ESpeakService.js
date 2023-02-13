const { spawn } = require('child_process');
const TextToSpeechService = require("./TextToSpeechService");

class EspeakService extends TextToSpeechService {

    constructor() {
        super();
    }

    async convertTextToSpeech(text, language = 'es-mx') {
        return new Promise((resolve, reject) => {
            const espeak = spawn('espeak', ['-v', language, text]);

            let audioData = '';

            espeak.stdout.on('data', data => {
                audioData += data;
            });

            espeak.stderr.on('data', data => {
                reject(`Error: ${data}`);
            });

            espeak.on('close', code => {
                if (code === 0) {
                    resolve(audioData);
                } else {
                    reject(`Proceso terminado con código: ${code}`);
                }
            });
        });
    }
}

module.exports = EspeakService;