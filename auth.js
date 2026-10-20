// Sign-in aur registration pages ko Business OS par bhejo
const currentFile = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

if (currentFile === "login.html" || currentFile === "register.html") {
    window.location.replace("business-os.html");
}