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
    author BIGINT NOT NULL,
    breakdown_track_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (author) REFERENCES user_account(id)
);

CREATE TABLE breakdown_sample (
    id SERIAL PRIMARY KEY,
    breakdown_id BIGINT NOT NULL,
    track_id VARCHAR(255) NOT NULL,
    start_ms INT NOT NULL,
    duration_ms SMALLINT NOT NULL,
    interpolated BOOLEAN NOT NULL,
    FOREIGN KEY (breakdown_id) REFERENCES breakdown(id)
);

CREATE TABLE breakdown_sequenece_step (
    id SERIAL PRIMARY KEY,
    breakdown_id BIGINT NOT NULL,
    sample_id BIGINT NOT NULL,
    start_ms INT NOT NULL,
    new_duration_ms SMALLINT,
    loops SMALLINT,
    reversed BOOLEAN NOT NULL,
    FOREIGN KEY (breakdown_id) REFERENCES breakdown(id),
    FOREIGN KEY (sample_id) REFERENCES breakdown_sample(id)
);
