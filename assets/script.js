//VARIABLES
let intSpan = document.querySelector("#dailyInt");
let totalInteractions = document.querySelector("#total-int");

// ARRAY
let tipsArray = [
  "It's okay to take breaks from people.",
  "If you're worried about getting stuck in social settings, set an alarm that matches your ringtone. Pretend you've got a call and dip.",
  "There's nothing wrong with ghosting.",
  "Videogames are a viable alternative to face-to-face interactions",
  "When someone calls you, text back: 'In a meeting'",
  "Bring a buddy and come up with code words.",
  "No is an acceptable response when people ask you things.",
  "You're dope. Don't forget that.",
  "Add some extroverts to your squad.",
  "Afraid of rejection or embarassment? Remember that ice cream exists.",
];

// RUNNING ON PAGE LOAD
displayInteractions();

// FUNCTIONS
function generateRandomTip() {
  for (let i = 0; i < 1; i++) {
    let randomTipNum = Math.floor(Math.random() * tipsArray.length);
    let randomTipText = tipsArray[randomTipNum];
    console.log("Hello", randomTipNum);
    console.log(randomTipText);

    $("#daily-tip-array").text(randomTipText);
  }
}

// Joke Api Version 2 (Working Properly) Different Api
function dadJokes() {
  $.getJSON("https://icanhazdadjoke.com/", function (dadJokeUrl) {
    //console.log("Here's some data on jokes: ", dadJokeUrl);
    let joke = dadJokeUrl.joke;
    $("#joke-result").text(joke);
  });
}

function articleInfo() {
  let input = $("#news-input").val();
  let webUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + input + "&api-key=XdqYsMJQiUIzGOnjulFokGyATyRNJe2K";

  //Ajax Call
  $.ajax({
    url: webUrl,
    method: "GET",
  }).then(function (web) {
    console.log(web);
    // Generate random number
    let i = [Math.floor(Math.random() * 10)];
    //Headline/Title
    let title = web.response.docs[i].headline.main;
    $("#news-titleHtml").text(title);
    //Abstract
    let abstract = web.response.docs[i].abstract;
    $("#news-abstractHtml").text(abstract);
    //Url
    let url = web.response.docs[i].web_url;
    $("#news-urlHtml").attr({href: url, target: "_blank" });
    $("#news-urlHtml").text("Click for full article");
  });
}

function convoCounter() {
  if (typeof Storage !== "undefined") {
    if (localStorage.dailyinteractions) {
      localStorage.dailyinteractions =
        Number(localStorage.dailyinteractions) + 1;
    } else {
      localStorage.dailyinteractions = 1;
    }
    $("#dailyInt").text(localStorage.dailyinteractions);
  } else {
    $("#dailyInt").text("Browser does not support storage");
  }
}

// Get the item from local storage and update the text of the span
function displayInteractions() {
  $("#dailyInt").text(localStorage.getItem("dailyinteractions"));
}

// BUTTONS
$("#advice-btn").on("click", generateRandomTip);
$("#joke-btn").on("click", dadJokes);
$("#news-btn").on("click", articleInfo);
$("#submitInt").on("click", function () {
  displayInteractions();
  convoCounter();
});

$(document).ready(function(){
  $('.fixed-action-btn').floatingActionButton();
});

$(document).ready(function(){
  $('.modal').modal();
});