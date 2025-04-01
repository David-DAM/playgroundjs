const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const PRODUCT_ID_EN = process.env.PRODUCT_ID_EN;
const PRODUCT_ID_ES = process.env.PRODUCT_ID_ES;

exports.handler = async (event) => {
    try {
        
        const body = JSON.parse(event.body);
        const code = body.code;
        const userLanguage = body.language ?? "es";

        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code: code
            },
            {headers: {Accept: "application/json"}}
        );

        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "No se pudo obtener el token de GitHub"})
            };
        }

        const userResponse = await axios.get("https://api.github.com/user", {
            headers: {Authorization: `token ${accessToken}`}
        });

        const githubUsername = userResponse.data.login;
        if (!githubUsername) {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "No se pudo obtener el usuario de GitHub"})
            };
        }

        const selectedProductId = userLanguage === "es" ? PRODUCT_ID_ES : PRODUCT_ID_EN;

        const paymentLink = await stripe.paymentLinks.create({
            line_items: [{price: selectedProductId, quantity: 1}],
            metadata: {githubUsername: githubUsername},
            after_completion: {
                type: "redirect",
                redirect: {url: `https://davinchicoder.dev/gracias/?user=${githubUsername}&language=${userLanguage}`}
            },
            allow_promotion_codes: true,
        });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({payment_link: paymentLink.url})
        };
    } catch (error) {
        console.error("Error en la Lambda:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Error interno del servidor"})
        };
    }
};
