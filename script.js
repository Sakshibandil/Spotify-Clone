console.log("Welcome To Spotify");

let songindex =0;
let audioElement = new Audio('/songs/1.m4a');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songitem'));


songs =[
    {songname:"dandelions" , filePath:"/songs/0.m4a", coverPath: "/covers/cover.jpg"},
    {songname:"death_bed" , filePath:"/songs/1.m4a", coverPath: "/covers/cover1.jpg"},
    {songname:"double_take" , filePath:"/songs/2.m4a", coverPath: "/covers/cover2.jpg"},
    {songname:"glitch" , filePath:"/songs/3.m4a", coverPath: "/covers/cover3.jpg"},
    {songname:"lost_in_japan" , filePath:"/songs/4.m4a", coverPath: "/covers/cover4.jpg"},
    {songname:"often" , filePath:"/songs/5.m4a", coverPath: "/covers/cover5.jpg"},
    {songname:"reminder" , filePath:"/songs/6.m4a", coverPath: "/covers/cover6.jpg"},
    {songname:"six_feet_under" , filePath:"/songs/7.m4a", coverPath: "/covers/cover7.jpg"},
    {songname:"stuck_with_you" , filePath:"/songs/8.m4a", coverPath: "/covers/cover8.avif"},
    {songname:"umbrella" , filePath:"/songs/9.m4a", coverPath: "/covers/cover9.jpg"},
]

songitem.forEach((element, i)=> {
    console.log(element , i);
    element.getElementsByTagName("img")[0].src =songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText =songs[i].songname;
    
});


//audioElement.play();

masterplay.addEventListener('click' ,()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');

    }
})

audioElement.addEventListener('timeupdate' , ()=>{
    console.log('timeupdate')

    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress)
    myprogressbar.value =progress;

})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}

 Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallplays();
        songindex = parseInt(e.target.id);
        console.log(e.target);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src =`/songs/${songindex}.m4a`;
        mastersongname.innerText = songs[songindex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');


    })
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex>9){
        songindex = 0;
    }
    else{
        songindex +=1;
    }
    audioElement.src =`/songs/${songindex+1}.m4a`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex<0){
        songindex = 0;
    }
    else{
        songindex -=1;
    }
    audioElement.src =`/songs/${songindex+1}.m4a`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

})