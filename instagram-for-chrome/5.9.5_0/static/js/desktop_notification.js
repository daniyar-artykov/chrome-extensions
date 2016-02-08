$(function() {
    
    var notification = JSON.parse( decodeURIComponent(window.location.hash.substr(1)) );
    $('<img />').attr('src', 'https://graph.facebook.com/' + notification.from.id + '/picture').appendTo('#picture');
    $('#text').html(notification.title);
    $('#title').html(notification.from.name);
    
    /* TODO add this option page */
    try {
        var displayTime = parseInt(localStorage._notifDisplayTime) * 1000 || 6000;
    } catch(e) {
        var displayTime = 6000;
    }
    setTimeout(function() {
        window.close();
    }, displayTime);
    
    
    $('#wrap').on('click', function() {
        /* Tell the background page to mark as read */
        chrome.extension.getBackgroundPage().markRead(notification.id);
        window.open(notification.link);
        window.close();
    });
});