import { Usuario } from '../models/Users';
import DatabaseService from '../database/database';

export class UsuarioController {
  constructor() {
    this.listeners = [];
  }

  async initialize() {
    await DatabaseService.initialize();
  }

  async obtenerUsuarios() {
    try {
      const data = await DatabaseService.getAll();

      return data.map(u => new Usuario(
        u.id,
        u.nombre,
        u.fecha_creacion
      ));
    } catch (error) {
      console.error(' Error al obtener usuarios:', error);
      throw new Error('No se pudieron cargar los usuarios');
    }
  }

  async crearUsuario(nombre) {
    try {
      // 1. Validar datos
      Usuario.validar(nombre);

      // 2. Insertar en BD
      const nuevoUsuario = await DatabaseService.add(nombre.trim());

      // 3. Notificar a los observadores
      this.notifyListeners();

      // 4. Retornar usuario creado como modelo
      return new Usuario(
        nuevoUsuario.id,
        nuevoUsuario.nombre,
        nuevoUsuario.fecha_creacion
      );
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback && callback());
  }
}
