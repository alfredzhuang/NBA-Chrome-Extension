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

    // Start time
    const time = document.createElement("div");
    time.textContent = `Start time: ${game.startTimeEastern}`;
    div.appendChild(time);

    // Current duration
    const totalTime = document.createElement("div");
    totalTime.textContent = `Current Duration: ${
      game.gameDuration.hours == "" ? 0 : game.gameDuration.hours
    } hours and ${
      game.gameDuration.minutes == "" ? 0 : game.gameDuration.minutes
    } minutes`;
    div.appendChild(totalTime);

    // Game score
    const gameStats = document.createElement("div");
    gameStats.className = "game-stats";

    // Visiting team
    const visitorTeam = document.createElement("div");
    vteam = document.createElement("a");
    const vteamLogo = document.createElement("img");
    vteamLogo.src = `../images/${game.vTeam.teamId}.svg`;
    vteam.appendChild(vteamLogo);
    const vteamScore = document.createElement("div");
    vteamScore.textContent = `${game.vTeam.triCode} - ${
      game.vTeam.score == "" ? 0 : game.vTeam.score
    }`;
    vteam.appendChild(vteamScore);
    vteam.onclick = function () {
      test(game.vTeam.teamId);
    };
    visitorTeam.append(vteam);
    gameStats.append(visitorTeam);

    // vs
    versus = document.createElement("div");
    versus.textContent = ` vs `;
    gameStats.append(versus);

    // Home team
    const homeTeam = document.createElement("div");
    hteam = document.createElement("a");
    const hteamLogo = document.createElement("img");
    hteamLogo.src = `../images/${game.hTeam.teamId}.svg`;
    hteam.appendChild(hteamLogo);
    const hteamScore = document.createElement("div");
    hteamScore.textContent = `${game.hTeam.triCode} - ${
      game.hTeam.score == "" ? 0 : game.hTeam.score
    }`;
    hteam.appendChild(hteamScore);
    hteam.onclick = function () {
      test(game.hTeam.teamId);
    };
    homeTeam.append(hteam);
    gameStats.append(homeTeam);

    div.appendChild(gameStats);

    // Location
    const location = document.createElement("div");
    location.textContent = `@ ${game.arena.name} (${game.arena.city}, ${game.arena.stateAbbr}, ${game.arena.country})`;
    div.appendChild(location);

    // Playoffs
    if (game.playoffs) {
      const playoffs = document.createElement("div");
      playoffs.textContent = `Game ${game.playoffs.gameNumInSeries} in Series ${game.playoffs.roundNum} (${game.playoffs.seriesSummaryText})`;
      div.appendChild(playoffs);
    }

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
