Package.describe({
    name: 'mahoujas:smsowl',
    version: '1.1.0',
    summary: 'Wrapper for smsowl.in REST API.',
    git: 'https://github.com/mahoujas/smsowl-meteor.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use("http", "server");
    api.addFiles('smsowl.js',"server");
    api.export('SmsOwl', 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('mahoujas:smsowl');
    api.addFiles('smsowl-tests.js');
});
