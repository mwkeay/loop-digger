import { FC } from "react";
import logger from "../logger";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ArtistLinkProps {
    route: string
    key?: number
    name: string
}

const ArtistLink: FC<ArtistLinkProps> = ({ route, key, name }) => (
    <span onClick={ () => redirect(route) } key={ key }>{ name }</span>
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
        <ArtistLink name={ artists[0].name } route={ "/artists/" + artists[0].id  } />
    );

    const initialArtistNames = artists.slice(0, -1).map((artist, index) => (
        linked
            ? <><ArtistLink name={ artist.name } route={ "/artists/" + artist.id  } key={ index } />, </>
            : artist.name + ", "
    ));

    const lastArtist = artists[artists.length - 1];

    const lastArtistName = linked
        ? <> and <ArtistLink
            name={ lastArtist.name }
            route={ "/artists/" + lastArtist.id  }
            key={ artists.length -1 }
        /></>
        : " and " + lastArtist.name

    return (
        <>{ [...initialArtistNames, lastArtistName ] }</>
    );
};

export default ArtistNames;
