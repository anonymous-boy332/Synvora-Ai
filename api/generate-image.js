export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({
            error: "Prompt is required"
        });
    }

    const imageUrl =
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Date.now()}`;

    return res.status(200).json({
    success: true,
    image: imageUrl,
    message: "Image URL created"
});

}