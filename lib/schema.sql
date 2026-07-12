-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  clerk_id VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sürücüler tablosu
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  profile_image_url TEXT,
  car_image_url TEXT,
  car_seats INTEGER NOT NULL DEFAULT 4,
  rating DECIMAL(3,2) DEFAULT 5.00,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sürüşler tablosu
CREATE TABLE IF NOT EXISTS rides (
  id SERIAL PRIMARY KEY,
  origin_address TEXT NOT NULL,
  destination_address TEXT NOT NULL,
  origin_latitude DECIMAL(9,6) NOT NULL,
  origin_longitude DECIMAL(9,6) NOT NULL,
  destination_latitude DECIMAL(9,6) NOT NULL,
  destination_longitude DECIMAL(9,6) NOT NULL,
  ride_time INTEGER NOT NULL,
  fare_price DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  driver_id INTEGER REFERENCES drivers(id),
  user_id VARCHAR(100) REFERENCES users(clerk_id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Örnek sürücü verisi
INSERT INTO drivers (first_name, last_name, profile_image_url, car_image_url, car_seats, rating)
VALUES
  ('James', 'Wilson', 'https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/', 'https://ucarecdn.com/a2dc52b2-8bf7-4e10-9d27-79acde4d2d7f/-/preview/465x466/', 4, 4.80),
  ('David', 'Brown', 'https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/', 'https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/', 5, 4.60),
  ('Michael', 'Johnson', 'https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5334da358b5/-/preview/826x822/', 'https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/', 4, 4.70),
  ('Robert', 'Green', 'https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/', 'https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/', 4, 4.90)
ON CONFLICT DO NOTHING;
