TRUNCATE  routes RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO routes
  (id, site_id, name, component_name, route_path, prop_names, created_at)
  VALUES
    ('0551ed8b-c941-4c3a-8b99-eac27ffbc2ba', '5eef442b-a894-4755-965a-e0174ad2d6c0', 'Primary Route', 'Primary', '/', '', '2020-08-25 12:11:24-07'),
    ('c2741c54-8559-4094-a1a8-ff641a99fb2b', '5eef442b-a894-4755-965a-e0174ad2d6c0', 'Admin Panel Route', 'Admin', '/admin', '', '2020-08-25 12:11:24-07')