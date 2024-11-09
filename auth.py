from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import hashlib
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for the entire Flask app
CORS(app)

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'  # Replace with your MySQL username
app.config['MYSQL_PASSWORD'] = 'Eyobed579@papa'  # Replace with your MySQL password
app.config['MYSQL_DB'] = 'organicdb'

mysql = MySQL(app)

# API Route for login
@app.route('/api/login', methods=['POST'])
def login():
    # Get JSON data from request
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    # Hash the password for comparison with the database (use bcrypt in production)
    hashed_password = hashlib.md5(password.encode()).hexdigest()

    # Query the database to check if user exists with given credentials
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, hashed_password))
    user = cursor.fetchone()

    if user:
        # Return the user type as part of the response
        return jsonify({
            'message': 'Login successful',
            'user_type': user['user_type']
        }), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

# Running the app
if __name__ == '__main__':
    app.run(host='192.168.158.203', port=5000, debug=True)
