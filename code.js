setScreen("welcomeScreen"); playSound("assets/diand.mp3", true); 
//declares variables that use lists containing data about the lyric
var lyric = getColumn("yeLyrics", "lyric");
var album = getColumn("yeLyrics", "album");
var albumCover = getColumn("yeLyrics", "image");
var song = getColumn("yeLyrics", "song");
//declares variables that hold filtered information about list
var filteredLyric = [];
var filteredAlbum = [];
var filteredAlbumCover = [];
var filteredSong = [];
//variable that holds what albums are usable
var usableAlbums = [];
//onEvents for changing screens and using functions
onEvent("nextButton", "click", function( ) {
  setScreen("selectScreen");
});
onEvent("startButton", "click", function( ) {
  setScreen("typingScreen");
  stopSound("assets/diand.mp3");
  updateScreen(checkerBox());
});
onEvent("checkAll", "click", function( ) {
  checkAllBoxes();
});
onEvent("backButton", "click", function( ) {
  stopSound("assets/bad.mp3");
  setScreen("selectScreen");
  playSound("assets/diand.mp3");
  setText("input", "");
});
onEvent("input", "input", function( ) {
  checkText(getText("lyrics"), checkerBox());
});
// i made this
//decides what albums are selected by user
function checkerBox() {
  //resets value of variables
  usableAlbums = [];
  filteredLyric = [];
  filteredAlbum = [];
  filteredAlbumCover = [];
  filteredSong = [];
  //decides what album is selected, then adds them to usableAlbums list
  for (var i = 1; i < 8; i++) {
    var album = getText("album" + i);
    if (getChecked("checkbox" + i)) {
      appendItem(usableAlbums, album);
    }
  }
  return usableAlbums;
}
// i wrote this
//function to update typing screen after new albums are selected, or user finishes typing
function updateScreen(compare) {
  //finds what lyrics, album name, album cover, and song name to add to filtered lists
  for (var i = 0; i < lyric.length; i++) {
    if (album[i] == compare[0] || album[i] == compare[1] || album[i] == compare[2] || album[i] == compare[3] || album[i] == compare[4] || album[i] == compare[5] || album[i] == compare[6]) {
      appendItem(filteredLyric, lyric[i]);
      appendItem(filteredAlbum, album[i]);
      appendItem(filteredAlbumCover, albumCover[i]);
      appendItem(filteredSong, song[i]);
    }
  }
  var randNum = randomNumber(0, filteredLyric.length - 1);
  // updates all properties and checks if no albums are selected, if none are selected the user is told that there are none selceted
  if (compare == "") {
    setProperty("lyrics", "text", "No Album Selected");
    setProperty("albumName", "text", "No Album Selected");
    setProperty("albumImage", "image", "assets/otis.jpg");
    setProperty("songName", "text", "No Album Selected");
    playSound("assets/bad.mp3", true);
  } else {
    setProperty("lyrics", "text", "" + filteredLyric[randNum]);
    setProperty("albumName", "text", "Album: " + filteredAlbum[randNum]);
    setProperty("albumImage", "image", "" + filteredAlbumCover[randNum]);
    setProperty("songName", "text", "Song: " + filteredSong[randNum]);
  }
}
// my partner made this
//function to see if text input is correct or incorrect
function checkText(lyrics, checking) {
  var currentText = getText("input");
  var length = currentText.length;
  if (checking!="") {
    if (getText("lyrics") == getText("input")) {
      updateScreen(checkerBox());
      setText("input", "");
    } else if ((currentText == lyrics.substring(0, length))) {
      console.log("correct");
      stopSound("assets/bad.mp3");
      setProperty("lyrics", "text-color", "rgb(196, 171, 255)");
    } else {
      setTimeout(function() {
        hideElement("madYe");
      }, 10);
      showElement("madYe");
      console.log("mistake");
      playSound("assets/bad.mp3", true);
      setProperty("lyrics", "text-color", "red");
    }
  }
}
// my partner made this
//function to have all checkboxes selected or not selected
function checkAllBoxes() {
  var checkboxchecker = getChecked("checkAll");
  for (var i = 1; i < 8; i++) {
    if (checkboxchecker == true) {
      setChecked("checkbox" + i, true);
    } else {
      setChecked("checkbox" + i, false);
    }
  }
}


