import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import "./Homepage.css";
import { getFollowInfo } from "../../store/user";
import { Link } from "react-router-dom";

export default function Homepage({isLoaded}) {

    // which stuff to show as trending
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const peopleYoureFollowing = useSelector(state => state.user.following);

    useEffect(()=> {
        dispatch(getFollowInfo(sessionUser?.id));
    }, [dispatch]);

    // useEffect(() => {}, [dispatch, peopleYoureFollowing]);

    let following = (sessionUser && peopleYoureFollowing) ? "following" : "";

    return (
        <div className="homepage">
            <div className={`banner ${following}`}>
                <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/sunset-people.jpg" className="sunset"></img>
                <div class="top-left">Welcome to Mach1Harmony</div>
                <div class="bottom-right">Say hello to a new site for sharing your tracks with the world. A bit derivative of SoundCloud, but with a few more tweaks and user feedback, Mach1Harmony will soon fill the silence of the internet with its boom. Sign up to get started!</div>
            </div>
            <div className={`trending ${following}`}></div>
            <div className={`newFeatures ${following}`}></div>
            <div className={`getStarted ${following}`}></div>
            {sessionUser && (
                <div className="followingDiv">
                    <h3 style={{marginLeft: 25, marginRight: 25, textAlign: "center"}}>People You're Following</h3>
                    {peopleYoureFollowing && peopleYoureFollowing.map(user => {
                        return (
                            <div className="eachFollowing">
                                <img src={user.profilePic} style={{width: 80}} className="userPic"/>
                                <div>
                                    <Link to={`/${user.id}`}>{user.username}</Link>
                                </div>
                            </div>
                        )})
                    }
                </div>
            )}
        </div>
    );
}
