export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const {
        business,
        tagline,
        style,
        prompt
    } = req.body;

    try {

        const finalPrompt = `
Professional ${style} logo.

Business Name: ${business}

Tagline: ${tagline}

Description:

${prompt}

Vector logo, premium branding, clean background, modern, high quality.
`;

        const imageUrl =
            `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=1024&seed=${Date.now()}`;

        return res.status(200).json({

            success: true,

            image: imageUrl

        });

    }

    catch (err) {

        return res.status(500).json({

            error: err.message

        });

    }

}