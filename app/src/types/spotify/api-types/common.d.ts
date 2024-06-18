type Image = {
    /**
     * The source URL of the image.
     * @example "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
     */
    url: string
    /** The image height in pixels. */
    height: number | null
    /** The image width in pixels. */
    width: number | null
};

/** 
 * An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.
 * 
 * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
 * 
 * ***Note**: If neither market or user country are provided, the content is considered unavailable for the client.*
 * 
 * Users can view the country that is associated with their account in the {@link https://www.spotify.com/se/account/overview/ account settings}.
 * @example
 * console.log(track.market);
 * // >> "market=ES"
 */
type Market = string;
