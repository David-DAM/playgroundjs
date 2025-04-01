const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;

exports.handler = async (event, context) => {
    const sigHeader = event.headers['stripe-signature'];
    const payload = event.body;

    try {
        const eventData = stripe.webhooks.constructEvent(payload, sigHeader, STRIPE_WEBHOOK_SECRET);

        const session = eventData.data.object;
        const githubUsername = session.metadata.githubUsername;
        switch (eventData.type) {
            case "checkout.session.completed": {
                const message = await giveGithubRepositoryAccess(githubUsername);
                return {
                    statusCode: 200,
                    body: JSON.stringify({message}),
                };
            }
            case "charge.refunded": {
                const message = await removeGithubRepositoryAccess(githubUsername);
                return {
                    statusCode: 200,
                    body: JSON.stringify({message}),
                };
            }
            default: {
                return {
                    statusCode: 400,
                    body: JSON.stringify({error: 'Invalid event type'}),
                };
            }
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message}),
        };
    }
};

const giveGithubRepositoryAccess = async (username) => {
    const headers = {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    };
    const inviteUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/collaborators/${username}`;
    const inviteData = {permission: 'pull'}; // "pull" = solo lectura, "push" = escritura


    const response = await axios.put(inviteUrl, inviteData, {headers});

    if (response.status === 201 || response.status === 204) {
        return `Se ha enviado la invitación a ${username}.`;
    } else {
        throw new Error(`Error al invitar al usuario: ${response.data}`);
    }

};

const removeGithubRepositoryAccess = async (username) => {
    const headers = {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    };
    const removeUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/collaborators/${username}`;

    const response = await axios.delete(removeUrl, {headers});

    if (response.status === 204) {
        return `Se ha eliminado a ${username} del repositorio.`;
    } else {
        throw new Error(`Error al eliminar al usuario: ${response.data}`);
    }

};
