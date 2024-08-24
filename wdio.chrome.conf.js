import allure from 'allure-commandline';

export const config = {
    runner: 'local',
    specs: ['./test/specs/**/*.js'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1920,1080'
            ],
        }
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }]
    ],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    },
    baseUrl: 'https://www.saucedemo.com/',
    onPrepare: function (config, capabilities) {
        global.allure = allure;
    },
    onComplete: function (exitCode, config, capabilities, results) {
        const generateAllureReport = allure(['generate', 'allure-results', '--clean', '-o', 'allure-report']);
        generateAllureReport.on('exit', function (code) {
            console.log('Allure report has been generated with code: ' + code);
        });
    },
    
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
};
