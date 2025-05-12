let songIndex=0;
let audioElement=new Audio("Asset/Song/1.mp3");
let masterPlay=document.getElementById('masterPlay');
let progressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let isSeeking = false;



let songs=[
    {songName:"songname", filePath: 'Asset/Song/1.mp3', coverPath: "Asset/Cover/1.jpg"},
    {songName:"songname", filePath: 'Asset/Song/2.mp3', coverPath: "Asset/Cover/2.jpg"},
    {songName:"songname", filePath: 'Asset/Song/3.mp3', coverPath: "Asset/Cover/3.jpg"},
    {songName:"songname", filePath: 'Asset/Song/4.mp3', coverPath: "Asset/Cover/4.jpg"},
    {songName:"songname", filePath: 'Asset/Song/5.mp3', coverPath: "Asset/Cover/5.jpg"},
    {songName:"songname", filePath: 'Asset/Song/6.mp3', coverPath: "Asset/Cover/6.jpg"},
]


//audioElement.play();

//play/pause

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

document.addEventListener('keydown', (e) => {

    if (e.code === 'Space') {
        e.preventDefault();

        if (audioElement.paused) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity=1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity=0;    
        }
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
