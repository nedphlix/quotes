var quote;
var author;
var newquote;
var credits;
var share;

var url = "https://crossorigin.me/http://quotes.stormconsultancy.co.uk/random.json";

var colors = [
	"#FFD454", // yellow
];

function sendRequest(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var data = JSON.parse(xmlhttp.responseText);
			var res = {};
			res.quote = data.quote;
			res.author = data.author;
			update(res);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function update(res) {
	quote.innerHTML = res.quote;
	author.innerHTML = "&mdash;&nbsp;" + res.author;

	var tweetAuthor = res.author;
	var tweet = res.quote;

	if (tweetAuthor.length + tweet.length < 136) {
		share.href = "http://twitter.com/home/?status=" + tweet + " - " + tweetAuthor;
	} else {
		tweet = tweet.substring(0, 140 - tweetAuthor.length - 6);
		share.href = "http://twitter.com/home/?status=" + tweet + "... - " + tweetAuthor;
	}
} 

function setBackgroundColor() {
	//var num = Math.round(Math.random() * colors.length);
	var num = 0;
	document.body.style.backgroundColor = colors[num];
}

function displayCredits() {
	alert("Built by Sebastien Phlix for Free Code Camp. Thanks to Storm Consultancy for the great quotes!");
}

window.onload = function() {
	quote = document.getElementById("quote");
	author = document.getElementById("author");
	newquote = document.getElementById("newquote");
	credits = document.getElementById("credits");
	share = document.getElementById("share");

	newquote.addEventListener("click", sendRequest(url));
	credits.addEventListener("click", displayCredits);
	setBackgroundColor();

	// sendRequest(url);
	// console.log(quote.text);
}