const bcrypt = require('bcrypt');

async function testEncryption() {
    const password = "clave1234"; // Mantenemos la misma contraseña

    // Encriptamos la contraseña nuevamente
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🔹 Nueva contraseña encriptada:", hashedPassword);

    // Comparamos la contraseña ingresada con la nueva encriptada
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("🔹 ¿Comparación con la nueva encriptación es válida?", isMatch);
}

testEncryption();
