CREATE TABLE IF NOT EXISTS
      pages(
        id uuid NOT NULL,
        name VARCHAR(1024) NOT NULL,
        page_data VARCHAR(2048) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id)
      )