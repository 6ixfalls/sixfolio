export async function onRequest(context) {
    const { searchParams } = new URL(context.request.url);
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = context.env;
    /** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping */

    const code = searchParams.get("code");
    let provider;
    let token;
    let error;

    // GitHub
    if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET && code) {
        provider = 'github';

        try {
            const response = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: GITHUB_CLIENT_ID,
                    client_secret: GITHUB_CLIENT_SECRET,
                    code,
                }),
            });

            ({ access_token: token, error } = await response.json());
        } catch ({ message }) {
            error = message;
        }
    }

    if (!provider || !(token || error)) {
        return new Response('');
    }

    const state = error ? 'error' : 'success';
    const content = error ? { error } : { provider, token };

    return new Response(
        `
          <!doctype html><html><body><script>
            (() => {
              window.addEventListener('message', ({ origin }) => {
                window.opener.postMessage(
                  'authorization:${provider}:${state}:${JSON.stringify(content)}',
                  origin
                );
              }, { once: true });
              window.opener.postMessage('authorizing:${provider}', '*');
            })();
          </script></body></html>
        `,
        {
            headers: {
                'Content-Type': 'text/html;charset=UTF-8',
            },
        },
    );
}