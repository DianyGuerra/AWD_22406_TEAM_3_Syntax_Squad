import client from './client';

/**
 * Hace login con email+password en tu API,
 * almacena el JWT en localStorage y lo devuelve.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>} token
 */

export async function loginWithEmail(email, password) {
  console.log('🔥 loginWithEmail called with', email, password);
  try {
    const { data } = await client.post('/users/login', { email, password });
    console.log('✅ login response data:', data);
    if (!data.token) throw new Error('No token in response');
    localStorage.setItem('token', data.token);
    return data.token;
  } catch (err) {
    console.error('❌ loginWithEmail error:', err.response?.data || err.message);
    throw err;
  }
}

