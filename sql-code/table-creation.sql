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

CREATE TABLE breakdown (
    id SERIAL PRIMARY KEY,
    track_id VARCHAR(255) NOT NULL,
    author BIGINT NOT NULL,
    created DATE NOT NULL,
    public BOOLEAN NOT NULL,
    FOREIGN KEY (author) REFERENCES user_account(id)
);

CREATE TABLE breakdown_sample (
    breakdown_id BIGINT NOT NULL,
    sample_no SMALLINT NOT NULL,
    track_id VARCHAR(255),
    start_ms INT,
    duration_ms INT,
    FOREIGN KEY (breakdown_id) REFERENCES breakdown(id),
    PRIMARY KEY (breakdown_id, sample_no)
);
