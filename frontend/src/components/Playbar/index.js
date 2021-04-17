import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementListen } from "../../store/playbar";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./Playbar.css";

export default function Playbar(){

    const audioRef = useRef()
    const dispatch = useDispatch();
    const addedSong = useSelector(state => state.playBar.currSong);

    const [playing, setPlaying] = useState(false);

    useEffect(async () => {
        // if(audioRef.current){
        //     audioRef.current.pause();
        //     setPlaying(false);
        //     audioRef.current.load();
        //     audioRef.current.play();
        //     await dispatch(incrementListen(addedSong.id));
        //     setPlaying(true);
        // }
    }, [addedSong]);

    function handlePlay(){
        if(playing){
            audioRef.current.pause();
            setPlaying(false)
        }else{
            audioRef.current.play();
            setPlaying(true);
        }
    }

    return (
        <div className="barContainer">
            {addedSong && (
                <>
                    <div><img style={{height: 40}} alt={addedSong.title} src={addedSong.coverPhoto}/></div>
                    <div style={{fontSize: 20, fontWeight: "bold"}}>{addedSong.title}</div>
                    <div>{addedSong.album}</div>
                    <AudioPlayer src={addedSong.filePath} ref={audioRef} style={{marginRight: 100}} className="audioControls"/>
                    {/* <span style={{width: 40, border: "black"}}>
                        {audioRef.current && (
                            playing ? <img className="playPause" src="https://www.freeiconspng.com/thumbs/pause-button-png/pause-button-png-32.png" onClick={handlePlay}></img> : <img className="playPause" src="https://www.freeiconspng.com/uploads/play-button-icon-png-0.png" onClick={handlePlay}></img>
                            )}

                        <audio src={addedSong.filePath} ref={audioRef} className="audioControls"></audio>
                    </span> */}
                </>
            )}
        </div>
    );
}
