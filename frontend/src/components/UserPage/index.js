import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./UserPage.css";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
import { updateFollow } from "../../store/user";
import { sendSong } from "../../store/playbar";
import UserProfile from "../UserProfile";

export default function UserPage({isLoaded}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams();


    const foundSongs = useSelector((state) => Object.values(state.song));
    const sessionUser = useSelector(state => state.session.user);
    const [following, setFollowing] = useState(false); //Array.some

    useEffect(() => {
        dispatch(loadSongsThunk(userId))
    }, [dispatch]);

    async function playSong(song) {
        await dispatch(sendSong(song));
        // add to numListens
    }

    async function handleFollow(){
        let isFollowing = await dispatch(updateFollow(userId, sessionUser.id));
        console.log(isFollowing);
        setFollowing(isFollowing);
    }

    if(!sessionUser) history.push(`/`);
    else if(sessionUser.id === Number(userId)){
        return <UserProfile sessionUser={sessionUser} isLoaded={isLoaded}/>
    }

    return (
        <>
            <div className="coverBanner"></div>
            <button onClick={handleFollow}>{
                following ? "Unfollow" : "Follow"
            }</button>
            <div className="songsList">
                <h1>User's Songs</h1>
                {foundSongs && foundSongs.map(song => {
                    if(song){
                        return (
                            <div>
                                <img src={song.coverPhoto} height="100" width="100" value={song.filePath} onClick={()=>playSong(song)}/>
                                <Link to={`/${song.userId}/${song.id}`}>
                                    {song.title}
                                </Link>
                                <p>{song.artist}</p>
                            </div>
                        );
                    }
                })}
            </div>

            {/* <Route path={`/${sessionUser.id}/new-song`}>Upload New Song
                <SongUploadFormModal/>
            </Route> */}
        </>
    );
}
