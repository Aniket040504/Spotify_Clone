let songIndex=0;
let audioElement=new Audio("Asset/Song/1.mp3");
let masterPlay=document.getElementById('masterPlay');
let progressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let isSeeking = false;
let songItems = Array.from(document.getElementsByClassName('songItem'));
const volumeSlider = document.getElementById('volumeSlider');
let masterSongName=document.getElementById('masterSongName');

let songs = [
    { songName: "Lover - Taylor Swift", filePath: 'Asset/Song/1.mp3', coverPath: "Asset/Cover/1.jpg" },
    { songName: "Salvatore - Lana Del Rey", filePath: 'Asset/Song/2.mp3', coverPath: "Asset/Cover/2.jpg" },
    { songName: "Flashing Lights - Drake", filePath: 'Asset/Song/3.mp3', coverPath: "Asset/Cover/3.jpg" },
    { songName: "Please Please Please - Sabrina Carpenter", filePath: 'Asset/Song/4.mp3', coverPath: "Asset/Cover/4.jpg" },
    { songName: "Fein - Travis Scott", filePath: 'Asset/Song/5.mp3', coverPath: "Asset/Cover/5.jpg" },
    { songName: "Chemtrails Over The County Club - Lana Del Rey", filePath: 'Asset/Song/6.mp3', coverPath: "Asset/Cover/6.jpg" },
    { songName: "Young and Beautiful - Lana Del Rey", filePath: 'Asset/Song/7.mp3', coverPath: "Asset/Cover/7.jpg" },

];

songItems.forEach((element, i) => {
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songNames')[0].innerText = songs[i].songName;
});

//audioElement.play();

//play/pause

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        makeAllPlays(); // Reset all icons
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-pause-circle');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-play-circle');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (audioElement.paused) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
            document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
    
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-pause-circle');
            document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-play-circle');
        }
    } else if (e.code === 'ArrowRight') {
        audioElement.currentTime = Math.min(audioElement.currentTime + 5, audioElement.duration);
    } else if (e.code === 'ArrowLeft') {

        audioElement.currentTime = Math.max(audioElement.currentTime - 5, 0);
    }
});

//seekBar

audioElement.addEventListener('timeupdate', () => {
    if (!isSeeking) {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = progress;
    }
});

progressBar.addEventListener('mousedown', () => {
    isSeeking = true;
});

progressBar.addEventListener('mouseup', () => {
    isSeeking = false;
});

progressBar.addEventListener('change', () => {
    const seekTime = (progressBar.value * audioElement.duration) / 100;
    audioElement.currentTime = seekTime;
    isSeeking = false;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        if (songIndex === i) {
            // User clicked the same song
            if (audioElement.paused) {
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                masterSongName.innerText=songs[songIndex].songName;
                gif.style.opacity = 0;
            }
        } else {
            makeAllPlays(); // Reset all to play icon
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();

            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            masterSongName.innerText=songs[songIndex].songName;
            gif.style.opacity = 1;
        }
    });
});


volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
});
volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
    document.getElementById('volumeLabel').textContent = Math.round(volumeSlider.value * 100) + '%';
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    makeAllPlays(); 

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;

    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
});

document.getElementById('prev').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }

    makeAllPlays(); 

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;

    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
});