from flask import Blueprint, render_template, jsonify, request

main = Blueprint('main', __name__)

tasks = []

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@main.route('/tasks', methods=['POST'])
def add_task():
    task = request.json.get('task')
    tasks.append(task)
    return jsonify({'status': 'Task added'}), 201
