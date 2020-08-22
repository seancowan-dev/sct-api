CREATE TABLE IF NOT EXISTS
      registered_users(
        id uuid NOT NULL,
        name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        perm_level VARCHAR(128) NOT NULL,
        PRIMARY KEY(id)
      )