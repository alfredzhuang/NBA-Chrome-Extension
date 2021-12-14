chrome.runtime.sendMessage({ message: "getScoreboard" }, function (response) {
  let data = response;
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
