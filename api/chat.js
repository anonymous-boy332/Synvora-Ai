export default async function handler(req, res) {

if(req.method!=="POST"){

return res.status(405).json({

error:"Method not allowed"

});

}

const {message}=req.body;

try{

const response=await fetch("https://api.groq.com/openai/v1/chat/completions",{

method:"POST",

headers:{

"Authorization":`Bearer ${process.env.GROQ_API_KEY}`,

"Content-Type":"application/json"

},

body:JSON.stringify({

model:"llama-3.1-8b-instant",

messages:[

{

role:"system",

content:"You are Synvora AI. You help users with business, coding, AI, marketing and productivity."

},

{

role:"user",

content:message

}

]

})

});

const data = await response.json();

console.log(data);

if (!response.ok) {

    return res.status(response.status).json({

        reply: data.error?.message || "Groq API Error",

        debug: data

    });

}

return res.status(200).json({

    reply: data.choices?.[0]?.message?.content || "No response from AI."

});

}catch(err){

return res.status(500).json({

error:err.message

});

}

}