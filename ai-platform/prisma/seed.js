const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

try {
    const dbPath = path.join(process.cwd(), 'dev.db');
    const db = new Database(dbPath);
    const hashedPassword = bcrypt.hashSync('password123', 10);

    const id = 'cuid_admin_001' + Date.now();

    db.exec(`
    INSERT INTO "User" (id, email, password, name, role, updatedAt) 
    VALUES ('${id}', 'admin@metaict.com', '${hashedPassword}', 'Manager', 'admin', CURRENT_TIMESTAMP)
    ON CONFLICT(email) DO UPDATE SET password = '${hashedPassword}';
  `);

    console.log('Admin user seeded using reliable raw sqlite adapter.');
} catch (error) {
    console.error("Seed error:", error);
}
