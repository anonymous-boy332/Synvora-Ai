// ==========================
// AI CHAT
// ==========================


const chatInput = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");
const chatWindow = document.querySelector(".chat-window");

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "user-message" : "ai-message";
    msg.innerText = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {

    const message = chatInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    chatInput.value = "";

    addMessage("🤖 Synvora AI is thinking...", "ai");

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        chatWindow.removeChild(chatWindow.lastChild);

        addMessage(data.reply, "ai");

    } catch (err) {

        chatWindow.removeChild(chatWindow.lastChild);

        addMessage("❌ Unable to connect with AI.", "ai");

    }

}

if (sendButton) {

    sendButton.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

}



// ==========================
// AI IMAGE GENERATOR
// ==========================


const generateBtn = document.querySelector(".generate-btn");
const promptBox = document.querySelector("#imagePrompt");
const imageArea = document.querySelector(".image-placeholder");


if (generateBtn) {


generateBtn.addEventListener("click", async()=>{


const prompt = promptBox.value.trim();


if(!prompt){

alert("Please enter your image prompt");

return;

}


imageArea.innerHTML = `

<h3>🎨 Generating AI Image...</h3>
<p>Please wait...</p>

`;



try{


const response = await fetch("/api/generate-image",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

prompt:prompt

})

});



const data = await response.json();



if(data.error){

imageArea.innerHTML=`

<h3>⚠️ AI Server Busy</h3>

<p>${data.message}</p>

`;

return;

}




if(!data.success){

imageArea.innerHTML=`

<h3>❌ Image generation failed</h3>

`;

return;

}




imageArea.innerHTML=`

<div class="preview-content">


<img

src="${data.image}"

alt="Synvora AI Image"

class="generated-image"

style="
width:100%;
border-radius:20px;
"

onerror="imageError(this)"

>


<br><br>


<button class="download-btn"
onclick="openImage('${data.image}')">

Download Image

</button>


</div>

`;



}

catch(error){


imageArea.innerHTML=`

<h3>❌ Error</h3>

<p>${error.message}</p>

`;


}



});


}



// ==========================
// IMAGE ERROR
// ==========================


function imageError(img){

img.style.display="none";


imageArea.innerHTML += `

<h3>⚠️ Image failed to load</h3>

<p>AI server did not return image.</p>

`;

}



// ==========================
// DOWNLOAD / OPEN IMAGE
// ==========================


function openImage(url){


window.open(url,"_blank");


}

// ==========================
// AI WRITER
// ==========================

const writerBtn = document.getElementById("generateWriter");
const writerPrompt = document.getElementById("writerPrompt");
const writerType = document.getElementById("writerType");
const writerResult = document.getElementById("writerResult");

if (writerBtn) {

    writerBtn.addEventListener("click", async () => {

        const prompt = writerPrompt.value.trim();

        if (!prompt) {

            alert("Please enter your content request.");

            return;

        }

        writerResult.innerHTML = "✍️ Synvora AI is writing...";

        try {

            const response = await fetch("/api/writer", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    type: writerType.value,

                    prompt: prompt

                })

            });

            const data = await response.json();

            if (!response.ok) {

                writerResult.innerHTML = "❌ " + (data.error || "Something went wrong.");

                return;

            }

            writerResult.innerHTML = `
                <pre style="white-space:pre-wrap;font-family:inherit;">
${data.content}
                </pre>
            `;

        }

        catch (err) {

            writerResult.innerHTML = "❌ " + err.message;

        }

    });

}

// ==========================
// AI CODE GENERATOR
// ==========================

const codeBtn = document.getElementById("generateCode");
const codePrompt = document.getElementById("codePrompt");
const codeLanguage = document.getElementById("codeLanguage");
const codeResult = document.getElementById("codeResult");
const copyCodeBtn = document.getElementById("copyCode");

if (codeBtn) {

    codeBtn.addEventListener("click", async () => {

        const prompt = codePrompt.value.trim();

        if (!prompt) {

            alert("Please enter your coding request.");

            return;

        }

        codeResult.textContent = "💻 Synvora AI is generating code...";

        try {

            const response = await fetch("/api/code", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    language: codeLanguage.value,

                    prompt: prompt

                })

            });

            const data = await response.json();

            if (!response.ok) {

                codeResult.textContent = "❌ " + (data.error || "Something went wrong.");

                return;

            }

            codeResult.textContent = data.code;

        }

        catch (err) {

            codeResult.textContent = "❌ " + err.message;

        }

    });

}

if (copyCodeBtn) {

    copyCodeBtn.addEventListener("click", () => {

        navigator.clipboard.writeText(codeResult.textContent);

        alert("✅ Code copied successfully!");

    });

}

function toggleSidebar() {

    const sidebar = document.querySelector(".ai-sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

}

// ==========================
// BUSINESS PLANNER
// ==========================

const businessBtn = document.getElementById("generateBusiness");
const businessPrompt = document.getElementById("businessPrompt");
const businessType = document.getElementById("businessType");
const businessResult = document.getElementById("businessResult");

if (businessBtn) {

    businessBtn.addEventListener("click", () => {

        const prompt = businessPrompt.value.trim();

        if (!prompt) {
            alert("Please enter your business idea.");
            return;
        }

        businessResult.innerHTML = "📊 Synvora AI is preparing your business plan...";

        setTimeout(() => {

            businessResult.innerHTML = `
<h3>📄 Business Plan</h3>

<b>Business Type:</b> ${businessType.value}

<br><br>

<b>Business Idea:</b><br>
${prompt}

<br><br>

<b>Target Customers</b><br>
• Define your ideal customer.<br>
• Identify your target market.

<br><br>

<b>Revenue Model</b><br>
• Product Sales<br>
• Monthly Subscription<br>
• Premium Services

<br><br>

<b>Marketing Strategy</b><br>
• Social Media Marketing<br>
• SEO<br>
• Google Ads<br>
• Influencer Marketing

<br><br>

<b>Growth Plan</b><br>
• Launch MVP<br>
• Acquire first customers<br>
• Scale nationally<br>
• Expand internationally

<br><br>

✅ This is a demo plan. Later we'll connect it to the AI API for fully customized business plans.
`;

        }, 2000);

    });

}

// ==========================
// MARKETING AI
// ==========================

const marketingBtn = document.getElementById("generateMarketing");
const marketingPrompt = document.getElementById("marketingPrompt");
const marketingType = document.getElementById("marketingType");
const marketingResult = document.getElementById("marketingResult");

if (marketingBtn) {

    marketingBtn.addEventListener("click", () => {

        const prompt = marketingPrompt.value.trim();

        if (!prompt) {
            alert("Please enter your marketing request.");
            return;
        }

        marketingResult.innerHTML =
            "📢 Synvora AI is creating your marketing content...";

        setTimeout(() => {

            marketingResult.innerHTML = `
<h3>🚀 Marketing Content Ready</h3>

<b>Content Type:</b> ${marketingType.value}

<br><br>

<b>Prompt:</b><br>
${prompt}

<br><br>

<b>Generated Content:</b>

<br><br>

✨ Discover premium quality with our latest products!

Whether you're looking for style, performance, or value, we've got you covered.

✅ Premium Quality
✅ Affordable Prices
✅ Fast Delivery
✅ Trusted Brand

📩 Order today and experience the difference.

<br><br>

<b>Suggested Hashtags:</b><br>

#SynvoraAI #Marketing #Business #DigitalMarketing #AI #Growth

<br><br>

⚡ Demo Mode: Later this will generate fully AI-powered marketing content using the API.

`;

        }, 2000);

    });

}

/* =====================================
   SYNVORA AI RESUME BUILDER
===================================== */

const photoInput = document.getElementById("resumePhoto");
const previewPhoto = document.getElementById("previewPhoto");

if(photoInput){

photoInput.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(file){

previewPhoto.src=URL.createObjectURL(file);

}

});

}

const generateResume=document.getElementById("generateResume");


async function generateAIResume(){

const result=document.getElementById("resumeResult");

result.innerHTML=`

<div style="text-align:center;padding:60px;">

<h2>🤖 Synvora AI is generating your resume...</h2>

<br>

<p>Please wait...</p>

</div>

`;

const data={

name:document.getElementById("name").value,

job:document.getElementById("job").value,

email:document.getElementById("email").value,

phone:document.getElementById("phone").value,

address:document.getElementById("address").value,

dob:document.getElementById("dob").value,

linkedin:document.getElementById("linkedin").value,

portfolio:document.getElementById("portfolio").value,

summary:document.getElementById("summary").value,

education:document.getElementById("education").value,

experience:document.getElementById("experience").value,

skills:document.getElementById("skills").value,

languages:document.getElementById("languages").value,

certificates:document.getElementById("certificates").value,

projects:document.getElementById("projects").value,

contact:document.getElementById("contact").value

};

try{

const response=await fetch("/api/resume",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

const resultData=await response.json();

if(resultData.success){

showFormattedResume(resultData.resume);

}else{

document.getElementById("resumeResult").innerHTML=

`<h2>❌ ${resultData.error}</h2>`;

}

}

catch(error){

document.getElementById("resumeResult").innerHTML=

"<h2>❌ Unable to connect with AI Server.</h2>";

}

}

/* =====================================
   DOWNLOAD PDF
===================================== */

const downloadBtn = document.getElementById("downloadResume");

if(downloadBtn){

downloadBtn.addEventListener("click",()=>{

const resume=document.getElementById("resumeResult").innerHTML;

if(
resume.includes("Your Professional Resume Will Appear Here") ||
resume.includes("Your AI generated professional resume will appear here")
){

alert("Please generate your resume first.");

return;

}

window.print();

});

}

/* =====================================
   SIMPLE VALIDATION
===================================== */

function validateResume(){

const name=document.getElementById("name").value.trim();

const job=document.getElementById("job").value.trim();

if(name===""){

alert("Please enter your Full Name.");

return false;

}

if(job===""){

alert("Please enter your Job Title.");

return false;

}

return true;

}

/* =====================================
   OVERRIDE BUTTON CLICK
===================================== */

if(generateResume){

generateResume.onclick=async()=>{

if(!validateResume()) return;

await generateAIResume();

setTimeout(()=>{

document.getElementById("resumeResult").scrollIntoView({

behavior:"smooth"

});

},500);

};

}

/* =====================================
   FORMAT GENERATED RESUME
===================================== */

function showFormattedResume(text){

const result=document.getElementById("resumeResult");

result.innerHTML=`

<div class="generated-resume">

${text.replace(/\n/g,"<br>")}

</div>

`;

}