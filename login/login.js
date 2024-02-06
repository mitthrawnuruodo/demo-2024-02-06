console.log("Here we go again...");

const loginForm = document.querySelector("form#login");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Trying to login");
    const username = loginForm.username.value;
    console.log("username: ", username);
    if (username) {
        console.log("Going to get token")
        getToken(username);
    }
});

async function getToken(username) {
    try {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        };
        console.log(options);
        const response = await fetch(`https://api.noroff.dev/api/v1/auth/login`, options); 
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            localStorage.setItem("username", username);
            localStorage.setItem("token", data.accessToken);
            //window.location = "index.html"; // Automatic
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(error.message);
    }
}
