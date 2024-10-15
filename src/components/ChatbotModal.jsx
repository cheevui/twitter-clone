import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


export default function ChatbotModal({ show, handleClose }) {
    const [message, setMessage] = useState("");
    const [allMessage, setAllMessage] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const API_URL = "https://api.openai.com/v1/chat/completions";
        // const apiKey = "";
        const apiKey = import.meta.env.VITE.OPENAI_API_KEY;

        const messageToSend = [
            ...allMessage,
            {
                role: "user",
                content: message
            }
        ];

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                'AUthorization': `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                message: messageToSend
            })
        })

        const data = await response.json();

        if (data) {
            let newAllMessage = [
                ...messageToSend,
                data.choices[0].message
            ]
            setAllMessage(newAllMessage);
            setMessage("");
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton className="fs-4">
                AI Chatbot
            </Modal.Header>
            <Modal.Body>
                <div>
                    {allMessage.map((msg, index) => (
                        <p key={index}><strong>{msg.role}:</strong> {msg.content}</p>
                    ))}
                </div>

                <Form onSubmit={sendMessage}>
                    <Form.Control
                        type="text"
                        placeholder="Ask chatbot something..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <Button type="submit" className="mt-3">Send</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}