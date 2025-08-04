// rehash-all-passwords.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('./models/user');

async function rehashAll() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
  });

  const users = await User.find({});
  console.log(`Encontrados ${users.length} usuarios`);

  let count = 0;
  for (const u of users) {
    const pwd = u.password;
    // Solo rehasear si NO empieza ya por $2 (es texto plano)
    if (typeof pwd === 'string' && !pwd.startsWith('$2')) {
      // 1) hashea UNA vez la contraseña actual
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pwd, salt);

      // 2) actualiza directamente en Mongo, sin .save() para evitar doble-hook
      await User.updateOne(
        { _id: u._id },
        { $set: { password: hash } }
      );

      count++;
      console.log(` ✔ Rehashed ${u.email}`);
    } else {
      console.log(` — Saltado ${u.email} (ya tenía hash)`);
    }
  }

  console.log(`\n✅ Terminado: ${count} contraseñas rehaseadas`);
  process.exit(0);
}

rehashAll().catch(err => {
  console.error(err);
  process.exit(1);
});
