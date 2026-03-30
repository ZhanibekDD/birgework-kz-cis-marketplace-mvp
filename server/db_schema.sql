-- Logical schema (JSON-backed implementation in this environment)
CREATE TABLE users (id TEXT PRIMARY KEY, email TEXT UNIQUE, username TEXT UNIQUE, password_hash TEXT, role TEXT, created_at TEXT);
CREATE TABLE profiles (user_id TEXT PRIMARY KEY, full_name TEXT, city TEXT, bio TEXT, rating REAL);
CREATE TABLE seller_profiles (user_id TEXT PRIMARY KEY, response_rate INT, response_time_hours INT, completion_rate INT, repeat_buyers INT, earnings_month INT, earnings_pending INT);
CREATE TABLE buyer_accounts (user_id TEXT PRIMARY KEY, total_spent INT, active_orders INT, saved_services INT);
CREATE TABLE services (id TEXT PRIMARY KEY, seller_id TEXT, category TEXT, slug TEXT UNIQUE, title TEXT, short_description TEXT, tags TEXT, delivery_days INT, is_archived INT, created_at TEXT);
CREATE TABLE packages (id TEXT PRIMARY KEY, service_id TEXT, tier TEXT, price INT, revisions INT, features TEXT);
CREATE TABLE reviews (id TEXT PRIMARY KEY, service_id TEXT, author_id TEXT, rating INT, text TEXT, created_at TEXT);
CREATE TABLE orders (id TEXT PRIMARY KEY, service_id TEXT, package_id TEXT, buyer_id TEXT, seller_id TEXT, brief TEXT, status TEXT, total INT, created_at TEXT, deadline TEXT);
CREATE TABLE order_events (id TEXT PRIMARY KEY, order_id TEXT, actor_id TEXT, from_status TEXT, to_status TEXT, note TEXT, created_at TEXT);
CREATE TABLE conversations (id TEXT PRIMARY KEY, user_a_id TEXT, user_b_id TEXT, created_at TEXT);
CREATE TABLE messages (id TEXT PRIMARY KEY, conversation_id TEXT, sender_id TEXT, text TEXT, is_read INT, created_at TEXT);
CREATE TABLE notifications (id TEXT PRIMARY KEY, user_id TEXT, type TEXT, title TEXT, action_path TEXT, is_read INT, created_at TEXT);
CREATE TABLE favorites (id TEXT PRIMARY KEY, user_id TEXT, service_id TEXT, created_at TEXT);
