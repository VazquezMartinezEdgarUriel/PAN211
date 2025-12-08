import DatabaseService from '../database/db';

class AuthController {
    constructor() {
        this.currentUser = null; 
        this.listeners = [];     
    }

    async login(email, password) {
        // Limpieza extra antes de enviar a DB
        const e = email || "";
        const p = password || "";
        
        const user = await DatabaseService.loginUser(e, p);
        
        if (!user) {
            // Log para que veas en consola por qué falló
            console.log("❌ Login fallido. Usuario no encontrado o contraseña mal.");
            throw new Error('Credenciales incorrectas');
        }
        
        console.log("✅ Login exitoso:", user.name);
        this.setCurrentUser(user);
        return user;
    }

    async register(name, email, password) {
        const user = await DatabaseService.registerUser(name, email, password);
        this.setCurrentUser(user); 
        return user;
    }

    async updateProfile(name, email) {
        if (!this.currentUser) throw new Error('No hay sesión activa');
        // Mantenemos el ID original, solo cambiamos nombre/correo
        const updatedUser = await DatabaseService.updateUser(this.currentUser.id, name, email);
        
        // Mezclamos los datos nuevos con los viejos (para no perder el rol, etc)
        const fullUser = { ...this.currentUser, ...updatedUser };
        
        this.setCurrentUser(fullUser);
        return fullUser;
    }

    // --- GESTIÓN DE ESTADO ---
    setCurrentUser(user) {
        this.currentUser = user;
        this.notifyListeners();
    }

    getCurrentUser() {
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        this.notifyListeners();
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }
}

export default new AuthController();