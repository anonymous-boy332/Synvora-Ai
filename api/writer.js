export default async function handler(req, res) {

  console.log("Writer API Loaded");

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { type, prompt } = req.body;

    try {

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    model: "llama-3.1-8b-instant",

                    messages: [

                        {
                            role: "system",
                            content:
                                "You are Synvora AI Writer. Create professional, detailed and well-formatted content."
                        },

                        {
                            role: "user",
                            content: `Content Type: ${type}\n\n${prompt}`
                        }

                    ]

                })

            });

        const data = await response.json();

        if (!response.ok) {

            return res.status(response.status).json({
                error: data.error?.message || "Groq API Error"
            });

        }

        return res.status(200).json({

            success: true,

            content: data.choices[0].message.content

        });

    }

    catch (err) {

        return res.status(500).json({

            error: err.message

        });

    }

}