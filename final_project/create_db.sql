DROP TABLE IF EXISTS stocks;
CREATE TABLE stocks (
    stockTicker TEXT NOT NULL,
    startDate TEXT NOT NULL,
    startClose FLOAT NOT NULL,
    shares INTEGER NOT NULL
);
