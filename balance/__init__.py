from flask import Flask
from flask_cors import CORS


ALMACEN = 1   # 0 - CSV, 1 - DB

app = Flask(__name__)
app.config.from_prefixed_env()
cors = CORS(app, resources={
    r'/api/*': {
        'origins': '*'
    }
})

print('***** VARIABLES DE ENTORNO *****')
print('DEBUG', app.config['DEBUG'])
print('APP', app.config['APP'])
print('SECRET KEY', app.config['SECRET_KEY'])
