let songIndex=0;
let audioElement=new Audio("Asset/song.mp3");
let masterPlay=document.getElementById('masterPlay');
let progressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');


let songs=[
    {songName:"songname", filePath: 'Asset/song.mp3', coverPath: "Asset/cover.jpg"},
    {songName:"songname", filePath: 'Asset/song.mp3', coverPath: "Asset/cover.jpg"},
    {songName:"songname", filePath: 'Asset/song.mp3', coverPath: "Asset/cover.jpg"},
    {songName:"songname", filePath: 'Asset/song.mp3', coverPath: "Asset/cover.jpg"},
    {songName:"songname", filePath: 'Asset/song.mp3', coverPath: "Asset/cover.jpg"},
    {songName:"songname", filePath: 'Asset/song.mp3', coverPath: "Asset/cover.jpg"},
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

audioElement.addEventListener('timeupdate', ()=>{
    console.log("timeup");
    //Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    console.log(progress);
    progressBar.value=progress;
})



