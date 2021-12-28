chrome.runtime.sendMessage(
  { message: "getTeamStandings" },
  function (response) {
    let team = response;

    // Title
    const teamLogo = document.createElement("img");
    teamLogo.className = "logo";
    teamLogo.src = `../images/${team.teamId}.svg`;
    document.querySelector("#title").appendChild(teamLogo);
    const teamName = document.createElement("h1");
    teamName.textContent =
      team.teamSitesOnly.teamName +
      " " +
      team.teamSitesOnly.teamNickname +
      " (" +
      team.teamSitesOnly.teamTricode +
      ")";
    document.querySelector("#title").appendChild(teamName);

    // Stat card
    const div = document.createElement("div");
    div.className = "team-stats";
    const stats = document.createElement("div");
    stats.className = "stats";
    stats.textContent =
      team.win +
      " W / " +
      team.loss +
      " L | " +
      team.winPctV2 +
      "% " +
      "Rank: " +
      team.confRank;
    div.appendChild(stats);

    document.querySelector("#team").appendChild(div);
  }
);

chrome.runtime.sendMessage({ message: "getTeamStats" }, function (response) {
  let teamStats = response;

  // Points per game
  const ppg = document.createElement("p");
  ppg.textContent = `Points per game: ${teamStats.ppg.avg} (${teamStats.ppg.rank})`;
  document.querySelector(".stats").appendChild(ppg);
  // Assists per game
  const apg = document.createElement("p");
  apg.textContent = `Assists per game: ${teamStats.apg.avg} (${teamStats.apg.rank})`;
  document.querySelector(".stats").appendChild(apg);
  // Steals per game
  const spg = document.createElement("p");
  spg.textContent = `Steals per game : ${teamStats.spg.avg} (${teamStats.spg.rank})`;
  document.querySelector(".stats").appendChild(spg);
  // Blocks per game
  const bpg = document.createElement("p");
  bpg.textContent = `Blocks per game : ${teamStats.bpg.avg} (${teamStats.bpg.rank})`;
  document.querySelector(".stats").appendChild(bpg);

  // Defensive rating per game
  const drpg = document.createElement("p");
  drpg.textContent = `Defensive rating per game: ${teamStats.drpg.avg} (${teamStats.drpg.rank})`;
  document.querySelector(".stats").appendChild(drpg);

  // Efficiency
  const eff = document.createElement("p");
  eff.textContent = `Efficiency: ${teamStats.eff.avg} (${teamStats.eff.rank})`;
  document.querySelector(".stats").appendChild(eff);
  // Field goal percentage
  const fgp = document.createElement("p");
  fgp.textContent = `Field goal percentage : ${teamStats.fgp.avg} (${teamStats.fgp.rank})`;
  document.querySelector(".stats").appendChild(fgp);
  // Free throw percentage
  const ftp = document.createElement("p");
  ftp.textContent = `Free throw percentage : ${teamStats.ftp.avg} (${teamStats.ftp.rank})`;
  document.querySelector(".stats").appendChild(ftp);
});

document.querySelector("#return").addEventListener("click", function () {
  chrome.runtime.sendMessage(
    {
      message: "homePage",
    },
    function (response) {
      if (response === "success") {
        window.location.href = "../pages/home.html";
      }
    }
  );
});
