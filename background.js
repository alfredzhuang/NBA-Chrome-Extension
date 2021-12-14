chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getScoreboard") {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    console.log(month);

    const formattedDate = `${year}${month}${day}`;
    console.log(formattedDate);

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
