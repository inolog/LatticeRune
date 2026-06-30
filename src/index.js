// src/index.js
/**
 * Main entry point for LatticeRune
 */

const { LatticeRune } = require('./latticerune');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
    boolean: ['verbose', 'help'],
    alias: {
        v: 'verbose',
        h: 'help',
        i: 'input',
        o: 'output'
    }
});

async function main() {
    try {
        if (args.help) {
            console.log('Usage: node src/index.js [options]');
            console.log('Options:');
            console.log('  -v, --verbose   Enable verbose logging');
            console.log('  -i, --input     Input file path');
            console.log('  -o, --output    Output file path');
            console.log('  -h, --help      Show this help message');
            process.exit(0);
        }

        const app = new LatticeRune({
            verbose: args.verbose || false
        });

        if (args.verbose) {
            console.log('Starting LatticeRune processing...');
        }

        const result = await app.execute();
        
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        console.log('✅ Processing completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (args.verbose) {
            console.error(error.stack);
        }
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
