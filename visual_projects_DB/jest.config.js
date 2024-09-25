module.exports = {
    preset: 'ts-jest', // Utiliza ts-jest para trabajar con TypeScript
    testEnvironment: 'node', // Especifica el entorno de prueba
    moduleFileExtensions: ['ts', 'tsx', 'js'], // Extensiones de archivo a considerar
    transform: {
      '^.+\\.ts$': 'ts-jest' // Transforma archivos TypeScript con ts-jest
    },
    testMatch: [
      '**/tests/**/*.test.(ts|tsx|js)' // Ruta y patrón de nombres de archivos de prueba
    ],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json' // Utiliza la configuración de TypeScript
      }
    },
    collectCoverage: true, // Habilita la recolección de cobertura
    coverageDirectory: 'coverage', // Directorio donde se guardará la cobertura
    coverageReporters: ['text', 'lcov'], // Tipos de reportes de cobertura
  };    