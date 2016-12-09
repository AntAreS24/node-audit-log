var util = require('util');

module.exports = function consoleTransport(options) {
    var _options = {};
    if (typeof options !== 'undefined') this._options = options;

    this.name = 'console';

    this.emit = function(dataObject) {
        console.log(this.formatForConsole(dataObject));
    }

    this.formatForConsole = function(dataObject) {
        var out = '';
        var date = dataObject.date;
        if (!date) {
            date = new Date();
        }
        out += date.toISOString().slice(0, date.toISOString().indexOf('T')) + ' ' + date.toLocaleTimeString();
        if (dataObject.origin != null || dataObject.action != null) {
            out += ' | [';
            if (dataObject.origin != null && dataObject.origin.length > 0) {
                out += dataObject.origin;
                if (dataObject.action != null && dataObject.action.length > 0) {
                    out += '.' + dataObject.action;
                }
            } else if (dataObject.action != null && dataObject.action.length > 0) {
                out += dataObject.action;
            }

            out += ']';
        }
        if (dataObject.actor != null && dataObject.actor.length > 0) {
            out += ' | ' + dataObject.actor;
        }
        if (dataObject.label != null && dataObject.label.length > 0) {
            out += ' | ' + dataObject.label;
        }
        if (dataObject.description != null && dataObject.description.length > 0) {
            out += ' | ' + dataObject.description;
        }
        if (dataObject.object != null && dataObject.object.length > 0) {
            out += '\n' + JSON.stringify(dataObject.object);
        }

        return out;
    };

    return this;
}