export async function onRequest(context) {
    const { searchParams } = new URL(context.request.url);
    const { GITHUB_CLIENT_ID, ALLOWED_DOMAINS } = context.env;
    /** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping */
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const provider = searchParams.get('provider');
    const domain = searchParams.get('site_id');

    // Check if the domain is whitelisted
    if (
        ALLOWED_DOMAINS &&
        !ALLOWED_DOMAINS.split(/,/).some((str) =>
            // Escape the input, then replace a wildcard for regex
            domain.match(new RegExp(`^${escapeRegExp(str.trim()).replace('\\*', '.+')}$`)),
        )
    ) {
        return new Response('');
    }

    // GitHub
    if (provider === 'github' && GITHUB_CLIENT_ID) {
        return Response.redirect(
            `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`,
        );
    }

    return new Response('');
}