from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

# Serve the index.html file
@app.route('/')
def index():
    return send_from_directory('', 'index.html')

# Serve static files
@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)
