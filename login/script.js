console.log("Here we go...");

const isLoggedIn = () => {
    const out = document.querySelector("p#status");
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
    console.log({token: token, username: username});

    if (token && username) {
        console.log ("Logged in");
        out.innerHTML = `Welcome, <strong>${username}<strong><br><button id="logout">Log out</button>`;
        document.querySelector("button#logout").addEventListener("click", () => {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            window.location = "login.html"; // Automatic
        });
        getQuote();
    } else {
        console.log ("NOT Logged in");
        out.innerHTML = `You need to <a href="login.html">Log in</a> to see this page`;
        //window.location = "login.html"; // Automatic
    }
}

window.addEventListener("load", isLoggedIn);

const quoteOut = document.getElementById("quote");

function getQuote() {
    const url = "https://api.noroff.dev/api/v1/quotes/random";
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    };
    getRandomQuote(url, options);
}

async function getRandomQuote(url, options) {
    console.log(url, options);
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    displayQuote(data, quoteOut);
}
function displayQuote({id, content, author}, outElement) {
    console.log(id, content, author);
    outElement.innerHTML = `
    Random quote #${id}:<br>
    <em>${content}</em><br>
    - ${author}
`;
}