from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json

app = Flask(__name__)

# Simulamos una base de datos con un diccionario
meals_db = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/meals', methods=['GET', 'POST'])
def meals():
    if request.method == 'POST':
        data = request.json
        date = data['date']
        meal_type = data['mealType']
        description = data['mealDescription']
        quantity = data['mealQuantity']
        
        if date not in meals_db:
            meals_db[date] = {}
        meals_db[date][meal_type] = {'description': description, 'quantity': quantity}
        
        return jsonify({'status': 'success'}), 200
    
    elif request.method == 'GET':
        return jsonify(meals_db), 200

@app.route('/api/check_missing', methods=['GET'])
def check_missing():
    today = datetime.now().day
    missing = []
    for day in range(1, today):
        if str(day) not in meals_db or len(meals_db[str(day)]) < 2:
            missing.append(day)
    return jsonify(missing), 200

if __name__ == '__main__':
    app.run(debug=True)