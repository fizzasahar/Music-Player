// Elements
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const volumeIcon = document.getElementById('volumeIcon');

// Track State
let isPlaying = false;
let isMuted = false;
let currentTrackIndex = 0;

// Playlist Array
const playlist = [
  {
    src: 'songs/Husun.mp3',  
    title: 'HUSN',
    artist: 'Anuv Jain', 
    cover: 'images/husn.jpeg'  
  },
  {
    src: 'songs/khamoshiyan.mp3',  
    title: 'KHAMOSHIYAN', 
    artist: 'Arijit Singh', 
    cover: 'images/khamoshiyan.jpeg'  
  },
  {
    src: 'songs/Salamat.mp3',  
    title: 'Salamat', 
    artist: 'Arijit Singh', 
    cover: 'images/salamat.jpg'  
  },
  {
    src: 'songs/Tu-Hai-Kahan.mp3',  
    title: 'Song Title 2', 
    artist: 'Raffey, Usama', 
    cover: 'images/tu hai kahan.jpg' 
  }
];

// Audio Element
let audio = new Audio(playlist[currentTrackIndex].src);

// Play/Pause Button Functionality
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶️'; // Change icon to play
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸️'; // Change icon to pause
  }
  isPlaying = !isPlaying;
});

// Next Button Functionality
nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  updateSongInfo();
  audio.src = playlist[currentTrackIndex].src;
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸️';
});

// Previous Button Functionality
prevBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  updateSongInfo();
  audio.src = playlist[currentTrackIndex].src;
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸️';
});

// Update Song Information (title, artist, cover)
function updateSongInfo() {
  document.querySelector('.song-title').textContent = playlist[currentTrackIndex].title;
  document.querySelector('.artist-name').textContent = playlist[currentTrackIndex].artist;
  document.querySelector('.album-art img').src = playlist[currentTrackIndex].cover;
}

// Update Progress Bar and Time
audio.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audio.currentTime);
  const duration = Math.floor(audio.duration);
  progressBar.value = (currentTime / duration) * 100;

  document.getElementById('currentTime').textContent = formatTime(currentTime);
  document.getElementById('totalTime').textContent = formatTime(duration);
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Mute/Unmute Volume and Change Icon
volumeIcon.addEventListener('click', () => {
  if (isMuted) {
    audio.muted = false;
    volumeIcon.textContent = '🔊'; // Change to sound on icon
  } else {
    audio.muted = true;
    volumeIcon.textContent = '🔇'; // Change to mute icon
  }
  isMuted = !isMuted;
});

// Adjust Volume on Hover
volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;
});

// Helper Function to Format Time (Minutes:Seconds)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${sec}`;
}

// Initial Setup: Update UI for the first song
updateSongInfo();
