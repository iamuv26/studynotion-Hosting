/**
 * Environment Variables Validation Script
 * 
 * This script checks if all required environment variables are properly configured.
 * Run this before deploying to catch missing configuration early.
 * 
 * Usage: node validate-env.js
 */

require('dotenv').config();

// ANSI color codes for terminal output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

// Define all required environment variables
const requiredVars = {
    critical: [
        { name: 'MONGODB_URL', description: 'Database connection string' },
        { name: 'JWT_SECRET', description: 'JWT signing secret' },
        { name: 'MAIL_HOST', description: 'Email server hostname' },
        { name: 'MAIL_USER', description: 'Email sender address' },
        { name: 'MAIL_PASS', description: 'Email password/app password' }
    ],
    important: [
        { name: 'CLOUD_NAME', description: 'Cloudinary cloud name' },
        { name: 'API_KEY', description: 'Cloudinary API key' },
        { name: 'API_SECRET', description: 'Cloudinary API secret' },
        { name: 'FOLDER_NAME', description: 'Cloudinary folder name' }
    ],
    optional: [
        { name: 'RAZORPAY_KEY', description: 'Razorpay key (for payments)' },
        { name: 'RAZORPAY_SECRET', description: 'Razorpay secret (for payments)' },
        { name: 'GEMINI_API_KEY', description: 'Google Gemini API key (for AI)' },
        { name: 'PORT', description: 'Server port number' }
    ]
};

/**
 * Check if an environment variable is set and not empty
 */
function checkVar(varName) {
    const value = process.env[varName];
    return value && value.trim() !== '';
}

/**
 * Validate email configuration
 */
function validateEmailConfig() {
    const host = process.env.MAIL_HOST;
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;

    const warnings = [];

    // Check if using Gmail
    if (host === 'smtp.gmail.com' && pass) {
        // Gmail app passwords are exactly 16 characters
        if (pass.length !== 16) {
            warnings.push('Gmail MAIL_PASS should be 16 characters (App Password). Regular Gmail passwords will not work.');
        }
    }

    // Check if email looks valid
    if (user && !user.includes('@')) {
        warnings.push('MAIL_USER should be a valid email address');
    }

    return warnings;
}

/**
 * Main validation function
 */
function validateEnvironment() {
    console.log(`${colors.bold}${colors.blue}===========================================`);
    console.log('Environment Variables Validation');
    console.log(`===========================================${colors.reset}\n`);

    let hasErrors = false;
    let hasWarnings = false;

    // Check critical variables
    console.log(`${colors.bold}CRITICAL Variables (Required):${colors.reset}`);
    requiredVars.critical.forEach(({ name, description }) => {
        if (checkVar(name)) {
            console.log(`${colors.green}✓${colors.reset} ${name.padEnd(20)} - ${description}`);
        } else {
            console.log(`${colors.red}✗${colors.reset} ${name.padEnd(20)} - ${description} ${colors.red}[MISSING]${colors.reset}`);
            hasErrors = true;
        }
    });

    console.log();

    // Check important variables
    console.log(`${colors.bold}IMPORTANT Variables (Highly Recommended):${colors.reset}`);
    requiredVars.important.forEach(({ name, description }) => {
        if (checkVar(name)) {
            console.log(`${colors.green}✓${colors.reset} ${name.padEnd(20)} - ${description}`);
        } else {
            console.log(`${colors.yellow}⚠${colors.reset} ${name.padEnd(20)} - ${description} ${colors.yellow}[MISSING]${colors.reset}`);
            hasWarnings = true;
        }
    });

    console.log();

    // Check optional variables
    console.log(`${colors.bold}OPTIONAL Variables:${colors.reset}`);
    requiredVars.optional.forEach(({ name, description }) => {
        if (checkVar(name)) {
            console.log(`${colors.green}✓${colors.reset} ${name.padEnd(20)} - ${description}`);
        } else {
            console.log(`${colors.blue}○${colors.reset} ${name.padEnd(20)} - ${description} ${colors.blue}[NOT SET]${colors.reset}`);
        }
    });

    console.log();

    // Email-specific validation
    const emailWarnings = validateEmailConfig();
    if (emailWarnings.length > 0) {
        console.log(`${colors.yellow}${colors.bold}Email Configuration Warnings:${colors.reset}`);
        emailWarnings.forEach(warning => {
            console.log(`${colors.yellow}⚠${colors.reset} ${warning}`);
        });
        console.log();
        hasWarnings = true;
    }

    // Summary
    console.log(`${colors.bold}${colors.blue}===========================================${colors.reset}`);

    if (hasErrors) {
        console.log(`${colors.red}${colors.bold}✗ VALIDATION FAILED${colors.reset}`);
        console.log(`${colors.red}Missing critical environment variables. Please check above.${colors.reset}`);
        console.log(`\nRefer to ${colors.bold}deployment-checklist.md${colors.reset} for setup instructions.`);
        process.exit(1);
    } else if (hasWarnings) {
        console.log(`${colors.yellow}${colors.bold}⚠ VALIDATION PASSED WITH WARNINGS${colors.reset}`);
        console.log(`${colors.yellow}Some important variables are missing. Features may not work correctly.${colors.reset}`);
        console.log(`\nRefer to ${colors.bold}deployment-checklist.md${colors.reset} for setup instructions.`);
        process.exit(0);
    } else {
        console.log(`${colors.green}${colors.bold}✓ VALIDATION PASSED${colors.reset}`);
        console.log(`${colors.green}All required environment variables are configured!${colors.reset}`);
        process.exit(0);
    }
}

// Run validation
try {
    validateEnvironment();
} catch (error) {
    console.error(`${colors.red}Error during validation:${colors.reset}`, error.message);
    process.exit(1);
}
