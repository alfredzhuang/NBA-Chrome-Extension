chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getScoreboard") {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

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
  }
});
