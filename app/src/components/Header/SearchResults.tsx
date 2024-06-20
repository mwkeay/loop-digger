import { FC } from "react";

const Result: FC<{ imgSrc: string, text: string, subText?: string }> = ({ imgSrc, text, subText }) => {
    return (
        <div>
            <img src={ imgSrc } alt={ text } />
            <div>
                <p className="text">{ text }</p>
                <p className="sub-text">{ subText }</p>
            </div>
        </div>
    );
};

const TrackResults: FC<{ tracks: Track[] }> = ({ tracks }) => {
    return (
        <div className="track-results">
            {
                tracks.map(track => <Result
                    imgSrc={ track.album.images[0].url }
                    text={ track.name }
                    subText={ track.artists.map(artist => artist.name).join(", ") }
                />)
            }
        </div>
    );
};

const ArtistResults: FC<{ artists: Artist[] }> = ({ artists }) => {
    return (
        <div className="track-results">
            {
                artists.map(artist => <Result
                    imgSrc={ artist.images[0]?.url }
                    text={ artist.name }
                />)
            }
        </div>
    );
};

const AlbumResults: FC<{ albums: Album[] }> = ({ albums }) => {
    return (
        <div className="track-results">
            {
                albums.map(album => <Result
                    imgSrc={ album.images[0].url }
                    text={ album.name }
                    subText={ album.artists.map(artist => artist.name).join(", ") }
                />)
            }
        </div>
    );
};

const SearchResults: FC<{ search: Search }> = ({ search }) => {
    return (
        <div className="search-results">
            <TrackResults tracks={ search.tracks?.items ?? [] } />
            <ArtistResults artists={ search.artists?.items ?? [] } />
            <AlbumResults albums={ search.albums?.items ?? [] } />
        </div>
    );
};

export default SearchResults;
