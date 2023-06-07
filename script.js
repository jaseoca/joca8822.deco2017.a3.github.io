const form = document.getElementById("songform");
const tasklistElem = document.querySelector('#songlist');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  console.log(form.elements.artistName.value);
  addTask(
    form.elements.artistName.value,
    form.elements.songTitle.value,
    form.elements.albumName.value,
    form.elements.comments.value

  );
  form.reset();
});

function displayListing(task) {
  let item = document.createElement('li');
  item.innerHTML = `<p>${task.artist} - ${task.song}</p>`;
  songlist.appendChild(item);
}

var songList = [];

function addTask(artist, song, album, comments) {
  let task = {
    artist, 
    song,
    id: Date.now(),
    date: new Date().toISOString(),
    album,
    comments
  };

  songList.push(task);
  displayListing(task);
}

console.log(songList);









