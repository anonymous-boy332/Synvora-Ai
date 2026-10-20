export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({

            error: "Method not allowed"

        });

    }

    const {
        name,
        job,
        education,
        skills,
        experience,
        contact
    } = req.body;

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

                            content: "You are Synvora AI Resume Builder. Create a professional ATS-friendly resume."

                        },

                        {

                            role: "user",

                            content: `

Full Name: ${name}

Job Title: ${job}

Education: ${education}

Skills: ${skills}

Experience: ${experience}

Contact: ${contact}

Generate a professional resume.

`

                        }

                    ]

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            return res.status(response.status).json({

                error: data.error?.message || "Groq API Error"

            });

        }

        return res.status(200).json({

            success: true,

            resume: data.choices[0].message.content

        });

    }

    catch (err) {

        return res.status(500).json({

            error: err.message

        });

    }

}