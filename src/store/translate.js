export const translate = (message, source, target) => {
    return fetch(
        `https://api.edenai.run/v2/translation/automatic_translation`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWRhYTU3NDktZGQ5Zi00OTI0LTg2MjUtNDJhYjg1ZjBhNjYyIiwidHlwZSI6ImFwaV90b2tlbiJ9.ou4xqkrq3sCJzKU5tErRyhZi5ht7rYurrhFjbqGUxHM'
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