const out = document.querySelector("div#output");

const listData = (team) => {
    return `
        <div>
            <h2>Team name: ${team.full_name}</h2>
            <p>Home city: ${team.city}</p>
            <p>Conference: ${team.conference}</p>
            <p>Division: ${team.division}</p>
        </div>
    `;
}

const myRequest = "https://api.noroff.dev/api/v1/nba-teams/random";
fetch(myRequest)
  .then((response) => { 
    console.log(response);
    return response.json()})
  .then(data => {
    console.log (data);
    document.title = data.full_name;
    out.innerHTML = listData(data);
  })
  .catch(console.error);
