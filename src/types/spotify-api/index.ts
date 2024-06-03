import { AlbumsMap } from "./albums";
import { ArtistsMap } from "./artists";
import { TracksMap } from "./tracks";

/**
 * ===================
 *     API MAPPING
 * ===================
 */

// Combine endpoint maps from each category
export type EndpointMap = AlbumsMap & ArtistsMap & TracksMap;

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

/**
 * ==============================
 *     EXPORT ALL API OBJECTS
 * ==============================
 */

export * from "./albums";
export * from "./artists";
export * from "./common";
export * from "./tracks";
