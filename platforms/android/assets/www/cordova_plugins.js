cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.speech/www/XSpeechRecognizer.js",
        "id": "com.phonegap.plugins.speech.XSpeechRecognizer",
        "clobbers": [
            "plugins.speechrecognizer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.speech": "1.0.0",
    "cordova-plugin-whitelist": "1.0.0"
}
// BOTTOM OF METADATA
});