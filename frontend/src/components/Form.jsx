import React, { useState } from 'react';

const Form = () => {
    const [text, setText] = useState('');
    const API_URL = "http://localhost:8000"

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/tts/repeat`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              
              const blob = await response.blob();
              const audio = new Audio(URL.createObjectURL(blob));
              audio.play();
        } catch (error) {
            console.error('There was an error:', error);
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