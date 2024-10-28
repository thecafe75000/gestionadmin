const path = require('path')

module.exports = {
  webpack: {
    // configurer l'alias du chemin
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
