import sqlite3

sqliteConnection = sqlite3.connect('database.db')
     
    # If sqlite3 makes a connection with python
    # program then it will print "Connected to SQLite"
    # Otherwise it will show errors
print("Connected to SQLite")
 
    # Getting all tables from sqlite_master
sql_query = 'SELECT * FROM stocks'
 
    # Creating cursor object using connection object
cursor = sqliteConnection.cursor()
     
    # executing our sql query
cursor.execute(sql_query)
print("List of tables\n")
     
    # printing all tables list
print(cursor.fetchall())    
