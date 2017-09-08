Package.describe({
    name: 'appworkshop:rest-api-wrapper',
    version: '1.0.2',
    summary: 'Wrapper for REST APIs.',
    git: 'https://github.com/AppWorkshop/rest-api-wrapper.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(["http","underscore"], "server");
    api.addFiles('rest-client.js',"server");
    api.export('RestEndpoints', 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('appworkshop:rest-api-wrapper', 'server');
    api.addFiles('rest-api-wrapper-tests.js', 'server');
});
