chrome.runtime.sendMessage({ message: "getTeam" }, function (response) {
  let team = response;

  const div = document.createElement("div");

  const teamName = document.createElement("p");
  teamName.textContent =
    team.teamSitesOnly.teamName +
    " " +
    team.teamSitesOnly.teamNickname +
    " (" +
    team.teamSitesOnly.teamTricode +
    ")";
  div.appendChild(teamName);

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

  document.querySelector("#teamStats").appendChild(div);
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
