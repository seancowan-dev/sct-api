CREATE TABLE IF NOT EXISTS
      install(
        id uuid NOT NULL,
        name VARCHAR(1024) NOT NULL,
        installed BOOLEAN NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id)
      )