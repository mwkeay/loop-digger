export type Me = {
    country: string
    display_name: string
    email: string
    explicit_content: {
        filter_enabled: boolean
        filter_locked: boolean
    }
    external_urls: {
        spotify: string
    }
    followers: number
    href: string
    id: string
    images: Image[]
    product: string
    type: "user"
    uri: string
}
