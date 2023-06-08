
//The form variable represents the HTML form element with the ID "songform".//
//The songlistElem variable represents the HTML element with the ID "songList", which is the container where the song listings will be displayed.
//The songList variable is an array that will store the song objects entered through the form.

const form = document.getElementById("songform");
const songlistElem = document.querySelector('#songlist');
var songList = [];

//enabling the app to store listings locally between sessions. Listens to when the user loads/reloads the page
window.addEventListener('load', function() {
  const storedSongList = localStorage.getItem('songList');
  if (storedSongList) {
    songList = JSON.parse(storedSongList);
    songList.forEach(displayListing);
  }
});

//An event listener is added for the 'submit' button in the form. The code is executed when the user inputs all necessary values "song, artist, album" and hits submit. 
//The values entered into the form are then retrieved and stored in variables. These variables are used for the addTask function when it is executed. 

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Retrieve values from the form inputs
  const artist = form.elements.artist.value;
  const song = form.elements.song.value;
  const album = form.elements.album.value;
  const comments = form.elements.comments.value;
  const quantity = form.elements.quantity.value;

  addTask(artist, song, album, comments, quantity);

  //resetting the form after submission is completed
  form.reset();
});

function displayListing(task) {
  let item = document.createElement('div');
  item.classList.add('card');
  //The 'card' item is created after the form is submitted. It follows the same hierarchy of the form with the addition of a "delete" button to remove current listings.
  //PLEASE NOTE: When launched in a default browser, after the form is submitted it may display as a dotpoint and not fully function properly. 
  //Launching the file in with the live server plugin gets rid of this problem and the script runs as intended. 
  item.innerHTML = `
    <div class="container">
      <h2>Artist: ${task.artist}</h2>
      <p>Song: ${task.song}</p>
      <p>Album: ${task.album}</p>
      <p>Comments: ${task.comments}</p>
      <p>Rating: ${task.quantity}</p>
      <button class="delete-button">Remove</button>
    </div>
  `;

//event listener for when the remove button is pressed
  const deleteButton = item.querySelector('.delete-button');
  deleteButton.addEventListener('click', function() {
    removeListing(task.id);
    item.remove();
  });

  songlistElem.appendChild(item);
}

//function for the remove button. Called when the remove button is pressed. 
function removeListing(id) {
  songList = songList.filter(task => task.id !== id);
//using local storage to recognise when a listing has been previously deleted. 
  localStorage.setItem('songList', JSON.stringify(songList));
}

//Called when the forum text input is given valid values. Also generated an ID and date added when submitted. 
function addTask(artist, song, album, comments, quantity) {
  let task = {
    artist,
    song,
    id: Date.now(),
    date: new Date().toISOString(),
    album,
    comments,
    quantity
  };

  songList.push(task);
  //displayListing shows the newly created listing card under the favourites page
  displayListing(task);

  console.log(songList);

  //using local storage to store the variables submitted to 'songlist'.
  localStorage.setItem('songList', JSON.stringify(songList));
}



















