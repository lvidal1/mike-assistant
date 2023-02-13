import React, { useState } from 'react';

const Form = () => {
    const [text, setText] = useState('');
    const API_URL = "http://localhost:3000"

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/text-to-speech/${text}`);

            if (response.status === 200) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Form;