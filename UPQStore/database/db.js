import { openDatabaseSync } from 'expo-sqlite';

// 1. CONEXIÓN V5
const db = openDatabaseSync('upq_store_v5.db');

// 2. CREACIÓN DE TABLAS AUTOMÁTICA
try {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, phone TEXT, role TEXT DEFAULT 'user');
    CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT NOT NULL, price REAL NOT NULL, description TEXT, image TEXT);
    CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, product_id INTEGER, quantity INTEGER DEFAULT 1, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (product_id) REFERENCES products(id));
    CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, total REAL, date TEXT, items_summary TEXT);
    CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, holder_name TEXT, card_number TEXT, expiry TEXT);
  `);
  console.log("✅ Tablas V5 creadas.");
} catch (error) { console.error("❌ Error tablas:", error); }

// 3. SERVICIO DE BASE DE DATOS (AQUÍ ESTÁN TUS FUNCIONES)
const DatabaseService = {
  // --- AUTH ---
  registerUser: async (name, email, password) => {
    try {
      const cleanEmail = email.toLowerCase().trim();
      const result = db.runSync('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, cleanEmail, password.trim()]);
      return { id: result.lastInsertRowId, name, email: cleanEmail, role: 'user' };
    } catch (error) { throw error; }
  },

  loginUser: async (email, password) => {
    try {
      return db.getFirstSync('SELECT * FROM users WHERE email = ? AND password = ?', [email.toLowerCase().trim(), password.trim()]);
    } catch (error) { throw error; }
  },

  updateUser: async (id, name, email) => {
    try {
        const cleanEmail = email.toLowerCase().trim();
        db.runSync('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, cleanEmail, id]);
        return { id, name, email: cleanEmail };
    } catch (error) { throw error; }
  },
  
  // --- RECUPERACIÓN DE CONTRASEÑA ---
  checkEmailExists: (email) => {
    try {
      const cleanEmail = email.toLowerCase().trim();
      const user = db.getFirstSync('SELECT id FROM users WHERE email = ?', [cleanEmail]);
      return !!user; // Retorna true si existe, false si no
    } catch (e) { return false; }
  },

  updatePassword: (email, newPassword) => {
    try {
        const cleanEmail = email.toLowerCase().trim();
        const cleanPass = newPassword.trim();
        db.runSync('UPDATE users SET password = ? WHERE email = ?', [cleanPass, cleanEmail]);
        return true;
    } catch (error) { 
        console.error("Error cambiando password:", error);
        return false; 
    }
  },

  // Acceso directo a la BD por si acaso
  db: db 
};

// 4. SEMILLA DE PRODUCTOS (TUS IMÁGENES REALES)
export const seedProducts = () => {
  try {
    const firstRow = db.getFirstSync('SELECT * FROM products');
    if (!firstRow) {
      const stmt = db.prepareSync('INSERT INTO products (name, category, price, description, image) VALUES ($name, $category, $price, $desc, $img)');
      const products = [
        // COMIDA
        { $name: 'Pizza Peperoni', $category: 'Comida', $price: 25.0, $desc: 'Rebanada clásica', $img: 'pizza' },
        { $name: 'Hamburguesa', $category: 'Comida', $price: 68.0, $desc: 'Con queso y papas', $img: 'hamburguesa' }, 
        { $name: 'Papas Fritas', $category: 'Comida', $price: 35.0, $desc: 'Papas a la francesa', $img: 'papas' },
        { $name: 'Chilaquiles', $category: 'Comida', $price: 55.0, $desc: 'Verdes con pollo', $img: 'chilaquiles' },
        { $name: 'Boneless', $category: 'Comida', $price: 80.0, $desc: 'Orden de 250g', $img: 'boneless' },
        
        // BEBIDAS
        { $name: 'Coca Cola', $category: 'Bebidas', $price: 22.0, $desc: 'Lata 355ml', $img: 'coca' },
        { $name: 'Pepsi', $category: 'Bebidas', $price: 20.0, $desc: 'Lata 355ml', $img: 'pepsi' },
        { $name: 'Pepsi Zero', $category: 'Bebidas', $price: 22.0, $desc: 'Sin azúcar', $img: 'pepsi_zero' },
        { $name: 'Squirt', $category: 'Bebidas', $price: 20.0, $desc: 'Refresco toronja', $img: 'squirt' },
        { $name: 'Agua Epura', $category: 'Bebidas', $price: 15.0, $desc: 'Botella 600ml', $img: 'agua' },

        // LAPTOPS
        { $name: 'MSI Gaming', $category: 'Laptops', $price: 15000.0, $desc: 'Core i7, RTX 3060', $img: 'laptop_msi' },
        { $name: 'Asus Zenbook', $category: 'Laptops', $price: 22000.0, $desc: 'Doble pantalla', $img: 'laptop_asus' },

        // MOUSE
        { $name: 'Mouse Gamer', $category: 'Mouse', $price: 450.0, $desc: 'RGB Configurable', $img: 'mouse_gamer' },
        { $name: 'Logitech Rojo', $category: 'Mouse', $price: 1200.0, $desc: 'Inalámbrico silencioso', $img: 'mouse_rojo' },
        
        // ARTICULOS
        { $name: 'Memoria USB', $category: 'Articulos', $price: 150.0, $desc: 'Kingston 64GB', $img: 'memoria' },
        { $name: 'Mochila USB', $category: 'Articulos', $price: 450.0, $desc: 'Impermeable con puerto', $img: 'mochila' },
        { $name: 'Libreta Scribe', $category: 'Articulos', $price: 45.0, $desc: 'Profesional cuadro chico', $img: 'libreta' },
        { $name: 'Paquete Libretas', $category: 'Articulos', $price: 150.0, $desc: 'Pack 5 piezas', $img: 'pack_libretas' },
        { $name: 'Bolígrafos BIC', $category: 'Articulos', $price: 25.0, $desc: 'Paquete 3 colores', $img: 'plumas' },
        { $name: 'Lápiz Jumbo', $category: 'Articulos', $price: 10.0, $desc: 'Lápiz de dibujo', $img: 'lapiz' },
        { $name: 'Termo', $category: 'Articulos', $price: 180.0, $desc: 'Acero inoxidable', $img: 'termo' },

        // DEPORTES
        { $name: 'Jersey Bulls', $category: 'Deportes', $price: 800.0, $desc: 'Michael Jordan #23', $img: 'bulls' },
        { $name: 'Jersey Dodgers', $category: 'Deportes', $price: 900.0, $desc: 'Béisbol oficial', $img: 'dodgers' },
        { $name: 'Jersey Tigres', $category: 'Deportes', $price: 750.0, $desc: 'Local temporada actual', $img: 'tigres' },
        { $name: 'Balón Champions', $category: 'Deportes', $price: 500.0, $desc: 'Replica oficial', $img: 'balon_champions' },
        { $name: 'Balón Basket', $category: 'Deportes', $price: 400.0, $desc: 'Spalding #7', $img: 'balon_basket' },
      ];
      products.forEach(p => stmt.executeSync(p));
      stmt.finalizeSync();
      console.log("✅ Productos V5 insertados.");
    }
  } catch (e) { console.log("Error seed:", e); }
};

export default DatabaseService;
