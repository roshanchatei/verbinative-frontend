export const translate = (message, target) => {
    return fetch(
        `https://api.edenai.run/v2/translation/automatic_translation`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM5NmE1OTktNjA5Zi00YTY0LWI3YWEtOTllNjExYjM5ZDg5IiwidHlwZSI6ImFwaV90b2tlbiJ9.4ATUxRmI9zw4wHXrGlJUjtRh8mrxEXCC8mCLmb_8_0U'
            },
            body: JSON.stringify({
                providers: 'phedone',
                text: message,
                source_language: 'auto-detect',
                target_language: target
            })
        }
    )
        .then(response => response.json())
        .then(result => {
            return result.phedone.text;
        })
        .catch(error => console.log('error', error));
}