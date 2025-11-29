import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['tests/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'json'],
            include: ['src/**/*.ts'],
            exclude: ['tests', 'dist'],
            thresholds: {
                lines: 90,
                statements: 90,
                functions: 90,
                branches: 80,
                perFile: true,
            },
        }
    }
});
