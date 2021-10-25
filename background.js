chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getScoreboard") {
    fetch("http://data.nba.net/10s/prod/v1/20211021/scoreboard.json")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        sendResponse(json);
      })
      .catch((err) => console.log(err));
    return true;
  }
});
