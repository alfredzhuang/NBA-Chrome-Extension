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
    teamName.textContent = `${team.teamSitesOnly.teamName} ${team.teamSitesOnly.teamNickname} (${team.teamSitesOnly.teamTricode})`;
    document.querySelector("#title").appendChild(teamName);
    const teamRank = document.createElement("h1");
    teamRank.textContent = `Conference Rank: ${team.confRank}`;
    document.querySelector("#title").appendChild(teamRank);

    // Stat card
    const stats = document.createElement("div");
    stats.className = "stats";

    // Win/Loss
    const teamRecord = document.createElement("p");
    teamRecord.textContent = `${team.win} W / ${team.loss} L (Win rate: ${team.winPctV2}%)`;
    stats.appendChild(teamRecord);

    document.querySelector(".team-stats").appendChild(stats);
  }
);

chrome.runtime.sendMessage({ message: "getTeamStats" }, function (response) {
  let teamStats = response;

  // Points per game
  const ppg = document.createElement("p");
  ppg.textContent = `Points per game: ${teamStats.ppg.avg} (${teamStats.ppg.rank})`;
  document.querySelector(".team-stats").appendChild(ppg);
  // Assists per game
  const apg = document.createElement("p");
  apg.textContent = `Assists per game: ${teamStats.apg.avg} (${teamStats.apg.rank})`;
  document.querySelector(".team-stats").appendChild(apg);
  // Steals per game
  const spg = document.createElement("p");
  spg.textContent = `Steals per game : ${teamStats.spg.avg} (${teamStats.spg.rank})`;
  document.querySelector(".team-stats").appendChild(spg);
  // Blocks per game
  const bpg = document.createElement("p");
  bpg.textContent = `Blocks per game : ${teamStats.bpg.avg} (${teamStats.bpg.rank})`;
  document.querySelector(".team-stats").appendChild(bpg);

  // Defensive rating per game
  const drpg = document.createElement("p");
  drpg.textContent = `Defensive rating per game: ${teamStats.drpg.avg} (${teamStats.drpg.rank})`;
  document.querySelector(".team-stats").appendChild(drpg);

  // Efficiency
  const eff = document.createElement("p");
  eff.textContent = `Efficiency: ${teamStats.eff.avg} (${teamStats.eff.rank})`;
  document.querySelector(".team-stats").appendChild(eff);
  // Field goal percentage
  const fgp = document.createElement("p");
  fgp.textContent = `Field goal percentage : ${teamStats.fgp.avg} (${teamStats.fgp.rank})`;
  document.querySelector(".team-stats").appendChild(fgp);
  // Free throw percentage
  const ftp = document.createElement("p");
  ftp.textContent = `Free throw percentage : ${teamStats.ftp.avg} (${teamStats.ftp.rank})`;
  document.querySelector(".team-stats").appendChild(ftp);
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
