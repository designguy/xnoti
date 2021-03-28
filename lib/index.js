// email-addresses.js - RFC 5322 email address parser
// v 4.0.0
//
// http://tools.ietf.org/html/rfc5322
//
// This library does not validate email addresses.
// emailAddresses attempts to parse addresses using the (fairly liberal)
// grammar specified in RFC 5322.
//
// email-addresses returns {
//     ast: <an abstract syntax tree based on rfc5322>,
//     addresses: [{
//            node: <node in ast for this address>,
//            name: <display-name>,
//            address: <addr-spec>,
//            local: <local-part>,
//            domain: <domain>
//         }, ...]
// }
//
// emailAddresses.parseOneAddress and emailAddresses.parseAddressList
// work as you might expect. Try it out.
//
// Many thanks to Dominic Sayers and his documentation on the is_email function,
// http://code.google.com/p/isemail/ , which helped greatly in writing this parser.
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
(function(global) {
    "use strict";

    function xnotiemail() {
        return "test call!";
    }

    function encode(val) {
        return encodeURIComponent(val);
    }

    function validate(sender, receiver, title, link) {

        var result = new Object();

        if (sender == undefined || sender == "") {
            result.result = "fail";
            result.error_msg = "sender is required";

            return result;
        }

        if (receiver == undefined || receiver == "") {
            result.result = "fail";
            result.error_msg = "receiver is required";

            return result;
        }


        if (title == undefined || title == "") {
            result.result = "fail";
            result.error_msg = "title is required";

            return result;
        }

        if (link == undefined || link == "") {
            result.result = "fail";
            result.error_msg = "link is required";

            return result;
        }

        return result;

    }

    function sendEmail(sender, receiver, title, link, callback) {
        // validate
        var valid = validate(sender, receiver, title, link);

        if (valid.result == "fail") {
            return callback(valid);
        }

        // sendEmailModel create
        var sendEmailModel = new Object();

        sendEmailModel.sender = sender;
        sendEmailModel.receiver = receiver;
        sendEmailModel.title = title;
        sendEmailModel.link = link;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === xhr.DONE) {
                // 서버의 응답에 따른 로직을 여기에 작성합니다.
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                    // console.log("responseText : " + xhr.responseText);
                    // console.log('onreadystatechange : ' + xhr.status);
                } else {
                    //console.error(xhr.responseText);
                }
            }
        };
        xhr.open('POST', `http://localhost:16330/api/msg/v1/sendemail`, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(sendEmailModel));
        return "send email!";
    }

    xnotiemail.sendEmail = sendEmail;

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = xnotiemail;
    } else {}

}(this));