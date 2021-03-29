import React, {useState, useEffect} from "react";


export default function UploadSongPage() {

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [year, setYear] = useState("2021");
    const [errors, setErrors] = useState([]);

   useEffect(() => {
       const errorsList = [];
       if(!title) errorsList.push("Song must have a title");
       if(title.length > 0 && title.length < 3) errorsList.push("Song title must be at least 3 characters");
       if(!artist) errorsList.push("Song must have an artist");
       if(artist.length > 0 && artist.length < 3) errorsList.push("Song artist must be at least 3 characters");
       setErrors(errorsList);
    }, [title, artist, album, year]);

    function onSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <div>
                {errors && errors.map(error => {
                    <p key={error} style={{color:"red", lineHeight: 0, margin: "20px"}}>{error}</p>
                })}
            </div>
            <form type="submit" onSubmit={onSubmit}>
                <div>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Artist"
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Album"
                        value={album}
                        onChange={e=>setAlbum(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Year"
                        value={year}
                        onChange={e=>setYear(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <button type="submit" onClick={onSubmit}>Submit</button>
                </div>
            </form>
        </>
    );
}
