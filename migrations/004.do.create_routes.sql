CREATE TABLE IF NOT EXISTS
      routes(
        id uuid NOT NULL,
        site_id uuid NOT NULL,
        name VARCHAR(128) NOT NULL,
        component_name VARCHAR(128) NOT NULL,
        route_path VARCHAR(2048) NOT NULL,
        prop_names VARCHAR(2048),
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id)
      )