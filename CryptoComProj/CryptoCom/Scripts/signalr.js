var hub = $.connection.cryptoComHub;

$.connection.hub.start().done(function () {
    $('#sendbutton').on('click', function () {
        var name = $('#name').val();
        var message = $('#sendText').val();
        /*$('#received').append('<div class="row"><div class="col-lg-3 col-offset-lg-1">' + name + '</div>' +
            '<div class="col-lg-8">' + message + '</div>');*/
        
        var messageArray = xorstrings(message, $('#sendCipher').val());
        console.log(message);
        if (messageArray.length != 0 && messageArray != "" && messageArray != undefined) {
            $('#receivedbody').append('<tr><td class="right-align">' + name + '</td>' +
            '<td>' + message + '</td></tr>');
            console.log("outgoing message array");
            console.log(messageArray);
            hub.server.send(name, messageArray);
        }
    });
});

hub.client.addNewMessageToPage = function (name, message) {
    console.log("incoming message array");
    console.log(message);
    message = xorarray(message, $('#receiveCipher').val());
    /*$('#received').append('<div class="row"><div class="col-lg-3 col-offset-lg-1">' + name + '</div>' +
        '<div class="col-lg-8">' + message + '</div>')*/
    $('#receivedbody').append('<tr><td>' + name + '</td>' +
            '<td>' + message + '</td></tr>');
};

var xorstrings = function (toReturnString, cipher) {
    var toReturnLength = toReturnString.length;
    var cipherLength = cipher.length;
    var encodedarray = [];
    if (toReturnLength > cipherLength) {
        alert("insufficient cipher length remaining");
        return;
    }
    cipher = cipher.substring(0, toReturnLength);
    for (var i = 0; i < toReturnLength; i++) {
        console.log(toReturnString.charCodeAt(i));
        console.log(cipher.charCodeAt(i));
        console.log(" ");
        encodedarray.push(toReturnString.charCodeAt(i) ^ cipher.charCodeAt(i));
    }
    shortenSendCipher(toReturnLength);
    return encodedarray;
};
var xorarray = function (toReturnArray, cipher) {
    if (toReturnArray.length > cipher.length) {
        alert("insufficient cipher length remaining");
        return;
    }
    decodedArray = [];
    for (var i = 0; i < toReturnArray.length; i++) {
        console.log(toReturnArray[i]);
        console.log(cipher.charCodeAt(i));
        console.log(" ");
        decodedArray.push(String.fromCharCode(toReturnArray[i] ^ cipher.charCodeAt(i)));
    }
    shortenReceiveCipher(toReturnArray.length);
    return decodedArray.join("");
};
var shortenReceiveCipher = function (shortenby) {
    var val = $('#receiveCipher').val();
    var substring = val.substring(shortenby, val.length);
    $('#receiveCipher').val(substring);
    updateCipherCounts();
}
var shortenSendCipher = function (shortenby) {
    var val = $('#sendCipher').val();
    var substring = val.substring(shortenby, val.length);
    $('#sendCipher').val(substring);
    updateCipherCounts();
}

var updateCipherCounts = function () {
    $('#sendcipherremaining').text($('#sendCipher').val().length);
    $('#receivecipherremaining').text($('#receiveCipher').val().length);

}