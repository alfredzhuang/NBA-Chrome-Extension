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

    teams = document.createElement("p");
    teams.textContent = `${game.vTeam.triCode} (visitors) vs. ${game.hTeam.triCode} (home)`;
    gameStats.append(teams);

    score = document.createElement("p");
    score.textContent = `${game.vTeam.score} - ${game.hTeam.score}`;
    gameStats.append(score);

    div.appendChild(gameStats);

    // append to the html page
    document.querySelector("#games").appendChild(div);
  });
});
