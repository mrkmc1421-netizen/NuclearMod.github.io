const [blockedWords, setBlockedWords] = useState([
    'example'
]);

const [message, setMessage] = useState('');

const censorMessage = (text) => {
    let result = text;

    for (const word of blockedWords) {
        const regex = new RegExp(
            `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
            'gi'
        );

        result = result.replace(
            regex,
            '*'.repeat(word.length)
        );
    }

    return result;
};
const sendMessage = () => {
    if (!message.trim()) return;

    const filtered = censorMessage(message);

    // Add filtered message to chat
    setMessages((current) => [
        ...current,
        filtered
    ]);

    setMessage('');
};
