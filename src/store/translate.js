import {apiTranslateToken} from "@/src/store/config";

export const translate = (message, source, target) => {
    return fetch(
        `https://api.edenai.run/v2/translation/automatic_translation`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiTranslateToken}`
            },
            body: JSON.stringify({
                providers: 'microsoft',
                text: message,
                source_language: source,
                target_language: target
            })
        }
    )
        .then(response => response.json())
        .then(result => {
            return result.microsoft.text;
        })
        .catch(error => console.log('error', error));
}