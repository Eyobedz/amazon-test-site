from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(20))
    price = db.Column(db.Float, nullable=False)
    priceper = db.Column(db.String(20))
    expiration_date = db.Column(db.Date)
    barcode = db.Column(db.String(50))
    image_url = db.Column(db.String(200))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'stock': self.stock,
            'unit': self.unit,
            'price': self.price,
            'priceper': self.priceper,
            'expiration_date': self.expiration_date.isoformat() if self.expiration_date else None,
            'barcode': self.barcode,
            'image_url': self.image_url
        }

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(
        name=data['name'],
        stock=data['stock'],
        unit=data.get('unit'),
        price=data['price'],
        priceper=data.get('priceper'),
        expiration_date=datetime.strptime(data['expiration_date'], '%Y-%m-%d').date() if data.get('expiration_date') else None,
        barcode=data.get('barcode'),
        image_url=data.get('image_url')
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.json
    product.name = data.get('name', product.name)
    product.stock = data.get('stock', product.stock)
    product.unit = data.get('unit', product.unit)
    product.price = data.get('price', product.price)
    product.priceper = data.get('priceper', product.priceper)
    product.expiration_date = datetime.strptime(data['expiration_date'], '%Y-%m-%d').date() if data.get('expiration_date') else product.expiration_date
    product.barcode = data.get('barcode', product.barcode)
    product.image_url = data.get('image_url', product.image_url)
    db.session.commit()
    return jsonify(product.to_dict())

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
