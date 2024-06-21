from flask import Flask, render_template, request, jsonify
from models import db, Task

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db.init_app(app)

@app.route('/')
def index():
    return render_template('templates/index.html')

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        tasks = Task.query.all()
        return jsonify([task.to_dict() for task in tasks])
    elif request.method == 'POST':
        data = request.get_json()
        task = Task(title=data['title'], description=data['description'], date=data['date'])
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)
