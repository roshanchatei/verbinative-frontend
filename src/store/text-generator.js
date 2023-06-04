import {apiTranslateToken} from "@/src/store/config";

export const generateText = (prompt, maxToken) => {
    return fetch(`https://api.edenai.run/v2/text/generation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${apiTranslateToken}`
        },
        body: JSON.stringify({
            providers: 'openai',
            text: prompt,
            temperature: 0.5,
            max_tokens: maxToken || 500,
        })
    })
        .then(response => response.json())
        .then(result => {
            return result.openai.generated_text;
        })
        .catch(error => console.log('error', error));
};