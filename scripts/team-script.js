chrome.runtime.sendMessage({ message: "getTeam" }, function (response) {
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
  const stats = document.createElement("p");
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

  // team.teamId (pic)

  document.querySelector("#team").appendChild(div);
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
