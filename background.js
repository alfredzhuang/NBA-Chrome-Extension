let teamId = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getScoreboard") {
    const date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    const year = date.getFullYear();

    // attach 0 to beginning if 1 digit
    if (month >= 1 && month <= 9) {
      month = 0 + String(month);
    }
    if (day >= 1 && day <= 9) {
      day = 0 + String(day);
    }

    const formattedDate = `${year}${month}${day}`;

    fetch(
      "http://data.nba.net/10s/prod/v1/" + formattedDate + "/scoreboard.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        sendResponse(json);
      })
      .catch((err) => console.log(err));
    return true;
  } else if (request.message === "showTeam") {
    teamId = request.teamId;
    chrome.action.setPopup({ popup: "../pages/team.html" });
    sendResponse("success");
  } else if (request.message === "getTeamStandings") {
    fetch("http://data.nba.net/10s/prod/v1/current/standings_conference.json")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // Find the team and send it back
        let teams = json.league.standard.conference;
        let teamStats;
        for (const team of teams.east) {
          if (team.teamId === teamId) {
            teamStats = team;
          }
        }
        for (const team of teams.west) {
          if (team.teamId === teamId) {
            teamStats = team;
          }
        }
        sendResponse(teamStats);
      })
      .catch((err) => console.log(err));
    return true;
  } else if (request.message === "homePage") {
    chrome.action.setPopup({ popup: "../pages/home.html" }, function () {
      teamId = "";
      sendResponse("success");
    });
    return true;
  } else if (request.message === "getTeamStats") {
    const date = new Date();
    const month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month >= 1 || month <= 9) {
      year -= 1;
    }
    fetch(
      "https://data.nba.net/10s/prod/v1/" + year + "/team_stats_rankings.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // Find the team's stats and send it back
        let teams = json.league.standard.regularSeason.teams;
        let teamStats;
        for (const team of teams) {
          if (team.teamId === teamId) {
            teamStats = team;
          }
        }
        sendResponse(teamStats);
      })
      .catch((err) => console.log(err));
    return true;
  }
});
