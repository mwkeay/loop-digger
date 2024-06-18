interface SpotifyOAuthResponse {
    access_token: string
    token_type: string // "Bearer"
    expires_in: number // 3600
    refresh_token: string
    scope: string
}
