chrome.runtime.sendMessage({ message: "getScoreboard" }, function (response) {
  let data = response;

  //parse the data
  let games = data.games;

  // Create html elements for each game
  games.forEach(function (game) {
    // create the div
    const div = document.createElement("div");
    div.className = "game";

    // add text content
    const location = document.createElement("p");
    location.textContent = `${game.arena.name} | ${game.arena.city} | ${game.arena.stateAbbr} | ${game.arena.country}`;
    div.appendChild(location);

    const time = document.createElement("p");
    time.textContent = `Start time: ${game.startTimeEastern} | Current Duration: ${game.gameDuration.hours} hours and ${game.gameDuration.minutes} minutes`;
    div.appendChild(time);

    // game
    const gameStats = document.createElement("div");

    const visitorTeam = document.createElement("div");
    vteam = document.createElement("a");
    vteam.textContent = `${game.vTeam.triCode} - ${game.vTeam.score}`;
    vteam.onclick = function () {
      test(game.vTeam.teamId);
    };
    visitorTeam.append(vteam);
    gameStats.append(visitorTeam);

    score = document.createElement("div");
    score.textContent = ` vs `;
    gameStats.append(score);

    const homeTeam = document.createElement("div");
    hteam = document.createElement("a");
    hteam.textContent = `${game.hTeam.triCode} - ${game.hTeam.score}`;
    hteam.onclick = function () {
      test(game.hTeam.teamId);
    };
    homeTeam.append(hteam);
    gameStats.append(homeTeam);

    div.appendChild(gameStats);

    // append to the html page
    document.querySelector("#games").appendChild(div);
  });
});

// Test method
function test(teamId) {
  chrome.runtime.sendMessage(
    {
      message: "showTeam",
      teamId: teamId,
    },
    function (response) {
      if (response === "success") {
        window.location.href = "../pages/team.html";
      }
    }
  );
}
