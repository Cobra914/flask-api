from flask import jsonify

from . import app
from .models import DBManager, ListaMovimientosDB, RUTA_DB


# /entidad GET  ----> listar
# /entidad POST  ----> crear
# /entidad/:id PUT  ----> modificar
# /entidad/:id PATCH  ----> modificar (parcial)
# /entidad/:id DELETE  ----> eliminar


@app.route('/api/v1/movimientos')
def inicio():
    try:
        db = DBManager(RUTA_DB)
        sql = 'SELECT id, fecha, concepto, tipo, cantidad FROM movimientos'
        movs = db.consultarSQL(sql)
        resultado = {
            'status': 'success',
            'results': movs
        }
    except Exception as ex:
        resultado = {
            'status': 'error',
            'message': str(ex)
        }

    return jsonify(resultado)


@app.route('/api/v1/movimientos/<int:id>')
def leer_movimiento(id):
    try:
        db = DBManager(RUTA_DB)
        movimiento = db.obtenerMovimiento(id)
        if movimiento:
            # devolver datos del movimiento
            resultado = {
                'status': 'success',
                'results': movimiento
            }
            status_code = 200
        else:
            # devolver msj diciendo que el movimiento no existe
            resultado = {
                'status': 'error',
                'message': f'No existe un movimiento con ID={id}'
            }
            status_code = 404
    except Exception as ex:
        resultado = {
            'status': 'error',
            'message': str(ex)
        }
        status_code = 500

    return jsonify(resultado), status_code
