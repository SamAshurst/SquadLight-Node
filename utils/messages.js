const moment = require("moment");

function formatMessage(username, text) {
    return {
        // eslint-disable-next-line object-shorthand
        username: username,
        text,
        time: moment().format("h:mm a"),
    };
}

module.exports = formatMessage;
