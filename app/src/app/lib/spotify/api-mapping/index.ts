import AlbumsMap from "./albums-map";
import ArtistsMap from "./artists-map";
import TracksMap from "./tracks-map";
import UsersMap from "./users-map";

// Combined endpoint maps from each category
export type EndpointMap = AlbumsMap & ArtistsMap & TracksMap & UsersMap;

// Type for an API endpoint route (e.g. "/tracks", "/me/albums")
export type Endpoint = keyof EndpointMap;

// Type for an API request body
export type BodyMap = {
	[K in Endpoint]: EndpointMap[K] extends { body: infer B } ? B : never
};

// Type for an API request parameters object
export type ParamMap = {
	[K in Endpoint]: EndpointMap[K] extends { params: infer P } ? P : never
};

// Type for an API request method (e.g. "GET", "POST")
export type MethodMap = {
	[K in Endpoint]: EndpointMap[K] extends { method: infer M } ? M : never
};

// Type for an API response body
export type ResponsesMap = {
	[K in Endpoint]: EndpointMap[K] extends { responseData: infer R } ? R : never
};
