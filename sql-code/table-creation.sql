CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,
    spotify_user_id VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_authorization (
    user_id BIGINT PRIMARY KEY,
    access_token VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    expires TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_account(id)
);
