import React, {useState, useEffect, useRef} from 'react'
import {
    styled, Typography, Slider,
    Paper, Stack, Box
} from '@mui/material';

import musicImage from '../src/assets/humanoid.svg';

import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import  GetAppIcon  from '@mui/icons-material/GetApp';




const CustomPaper = styled(Paper)(({theme}) => ({
    backgroundColor: '#181818',
    padding: theme.spacing(2),
    position:'fixed',
    right:'0',
    bottom:'0'
}))

const PSlider = styled(Slider)(({theme, ...props}) => ({
    color:'#ECE817',
    height: 2,
    '&:hover': {
        cursor: 'auto',
    },
    '& .MuiSlider-thumb': {
        width: '13px',
        height: '13px',
        display: props.thumbless ? 'none' : 'block',
    }
}))

const playlist = [
    {
      url:
        "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
      cover:
        "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
      title: "Despacito",
      artist: ["Luis Fonsi", "Daddy Yankee"]
    },
    {
      url:
        "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3",
      cover:
        "http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg",
      title: "Bedtime Stories",
      artist: ["Jay Chou"]
    },
    {
      url:
        "http://res.cloudinary.com/alick/video/upload/v1502444212/Actor_ud8ccw.mp3",
      cover:
        "http://res.cloudinary.com/alick/image/upload/v1502444304/actor_umzdur.jpg",
      title: "演员",
      artist: ["薛之谦"]
    },
    {
      url:
        "http://res.cloudinary.com/alick/video/upload/v1502444215/Bridge_of_Fate_aaksg1.mp3",
      cover:
        "http://res.cloudinary.com/alick/image/upload/v1502444306/Bridge_of_Fate_o36rem.jpg",
      title: "Bridge of Fate",
      artist: ["王力宏", "谭维维"]
    },
    {
      url:
        "http://res.cloudinary.com/alick/video/upload/v1502444222/Goodbye_byaom5.mp3",
      cover:
        "http://res.cloudinary.com/alick/image/upload/v1502444310/Goodbye_hpubmk.jpg",
      title: "Goodbye",
      artist: ["G.E.M."]
    }
  ];

export default function Player() {
    const audioPlayer = useRef()

    const [index, setIndex] = useState(0);
    
    const [currentSong, setCurrentSong] = useState(playlist[index]);

    
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(30);
    const [mute, setMute] = useState(false);

    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if(audioPlayer){
            audioPlayer.current.volume = volume / 100;
        }

        
        if(isPlaying){
            setInterval(() => {
                const _duration = Math.floor(audioPlayer?.current?.duration);
                const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

                setDuration(_duration);
                setElapsed(_elapsed);
            }, 100);
        }

    }, [
        volume, isPlaying
    ]);

    function formatTime(time) {
        if(time && !isNaN(time)){
            const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
            const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

            return `${minutes}:${seconds}`;
        }
        return '00:00';
    }

    const togglePlay = () => {
        if(!isPlaying) {
            audioPlayer.current.play()
        }else {
            audioPlayer.current.pause()
        }
        setIsPlaying(prev => !prev)
    }

    const toggleForward = () => {
        audioPlayer.current.currentTime += 10;
    }

    const toggleBackward = () => {
        if(audioPlayer.current.currentTime> 9){
            audioPlayer.current.currentTime -= 10;
        }
        else{
            audioPlayer.current.currentTime = 0;
        }
        
    }

    const toggleSkipForward = () => {
        if(index >= playlist.length - 1) {
            setIndex(0);
            audioPlayer.current.src = playlist[0];
            audioPlayer.current.play();

        } else {
            setIndex(prev => prev + 1);
            setCurrentSong(playlist[index + 1]);
            audioPlayer.current.play();
            console.log(index);
        }

    }

    const toggleSkipBackward = () => {
        if(index > 0) {
            setIndex(prev => prev - 1);
            audioPlayer.current.src = playlist[index - 1];
            audioPlayer.current.play();
        }
    }
    const toggleDownload = () =>{
        return console.log(playlist.length);
    }
    
    function VolumeBtns(){
        return mute
            ? <VolumeOffIcon sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={() => setMute(!mute)} />
            : volume <= 20 ? <VolumeMuteIcon sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={() => setMute(!mute)} />
            : volume <= 75 ? <VolumeDownIcon sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={() => setMute(!mute)} />
            : <VolumeUpIcon sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={() => setMute(!mute)} />
    }
    


    return (
        <div>
            <audio src={currentSong.url} ref={audioPlayer} muted={mute} />
            <CustomPaper sx={{width:'400px'}}>
                <Stack
                    sx={{display:'flex',alignItems:'center',flexDirection:'row',gap:'30px'}}
                >
                    <img style={{width:'100px'}} src={currentSong.cover} alt="music" />
                    <h1 style={{color:'#Fff'}}>{currentSong.title}</h1>    
                    
                </Stack>
                    
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Stack direction='row' spacing={1} 
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            width: '25%',
                            alignItems: 'center'
                        }}
                    >
                        <VolumeBtns  />

                        <PSlider min={0} max={100} value={volume}
                            onChange={(e, v) => setVolume(v)}
                        />
                    </Stack>

                    <Stack direction='row' spacing={1}
                        sx={{
                            display: 'flex',
                            width:'40%',
                            justifyContent:'center',
                            alignItems: 'center'
                        }}>
                        <SkipPreviousIcon 
                            sx={{
                                color: 'white', 
                                '&:hover': {color: '#ECE817'}
                            }} 
                            onClick={toggleSkipBackward} disabled={true}/>
                        <FastRewindIcon sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={toggleBackward}/>

                        {!isPlaying
                            ?   <PlayArrowIcon fontSize={'large'} sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={togglePlay}/>
                            :   <PauseIcon fontSize={'large'} sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={togglePlay}/>
                        }


                        <FastForwardIcon sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={toggleForward} />
                        <SkipNextIcon sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={toggleSkipForward}/>
                    </Stack>

                   
                    <Stack spacing={1} direction='row'
                        sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '25%',
                        alignItems: 'center'}}
                    >
                        <GetAppIcon fontSize={'large'} sx={{color: 'white', '&:hover': {color: '#ECE817'}}} onClick={toggleDownload}/>
                    </Stack>
                </Box>
                <Stack spacing={1} direction='row' sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Typography sx={{color: 'white'}}>{formatTime(elapsed)}</Typography>
                    <PSlider thumbless value={elapsed} max={duration} />
                    <Typography sx={{color: 'white'}}>{formatTime(duration - elapsed)}</Typography>
                </Stack>
            </CustomPaper>
        </div>
    )
}
