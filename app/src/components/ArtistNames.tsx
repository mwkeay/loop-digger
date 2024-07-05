import { FC } from "react";
import logger from "../lib/logger";
import { redirect } from "next/navigation";

interface ArtistLinkProps {
    route: string
    key?: number
    name: string
}

const ArtistLink: FC<ArtistLinkProps> = ({ route, name }) => (
    <span onClick={() => redirect(route)}>{name}</span>
);

interface ArtistNamesProps {
    artists: Artist[]
    linked?: boolean
}

const ArtistNames: FC<ArtistNamesProps> = ({ artists, linked = true }) => {

    if (artists.length == 0) {
        logger.error("Empty list of artists passed to listArtistsNames.");
        return;
    }

    if (artists.length == 1) return (
        <ArtistLink name={artists[0].name} route={"/artists/" + artists[0].id} />
    );

    const initialArtistNames = artists.slice(0, -1).map((artist) => (
        linked
            ? <span key={artist.id}><ArtistLink name={artist.name} route={"/artists/" + artist.id} />, </span>
            : <span key={artist.id}>{artist.name + ", "}</span>
    ));

    const lastArtist = artists[artists.length - 1];

    const lastArtistName = linked
        ? <span key={lastArtist.id}> and <ArtistLink
            name={lastArtist.name}
            route={"/artists/" + lastArtist.id}
        /></span>
        : " and " + lastArtist.name;

    return (
        <>{[...initialArtistNames, lastArtistName ]}</>
    );
};

export default ArtistNames;
