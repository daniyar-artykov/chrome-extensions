/* NOTIFICATIONS */
define(function() {
    var didSetup = false,
        $popover = $('#notifications-popover');
        
    return {
        go: function() {
            this.show($e.data.notifs);
            if(!didSetup) {
                didSetup = true;
                this.listen();
                setInterval(this.fitHeight, 100);
            }
        },
        show: function(notifs) {
            this.notifs = notifs || {data: []};
            var self = this;
            $.each(notifs.data, function() {
                this.ago = moment(new Date(this.updated_time)).fromNow();
            });
            Template('notifications', {notifs: notifs.data}, function(html) {
                $popover.find('.list').html(html);
                if(!notifs || !notifs.data.length) {
                    $popover.find('.more').click();
                }
                
                var unread = $popover.find('li.unread');
                if(unread.length) {
                    var calls = [];
                    unread.each(function() {
                        calls.push({"method": "POST", "relative_url": $(this).attr('data-id') + '?unread=0'});
                    });

                    FB.api('', 'POST', {batch: JSON.stringify(calls)}, function() {
                        $e.updateFacebook();
                        $('#notification_count').delay(500).fadeOut('slow');
                    });
                }
            });
        },
        listen: function() {
            var self = this;
            $popover.on('click', '.notifications li', function() {
                var $this = $(this);
                
                if($this.hasClass('more')) {
                    $this.html('<img src="static/img/load.gif" />');
                    self.older();
                    return;
                }


                var id = $this.attr('data-id');
                
                self.load(id);
                $popover.hide();
            });
        },
        fitHeight: function() {
            if($popover.height() + $popover.offset().top >= $(window).height()) {
                $popover.find('.list').css('overflowY', 'auto').css('maxHeight', $(window).height() - $popover.find('.list').offset().top - 20);
            } else {
                
            }
        },
        load: function(id){ 
            var id = id.split('_');
                id = id[id.length-1];
                
            /* Build an FQL query */
            var query = "SELECT object_id,object_type,href FROM notification WHERE notification_id = " + id + " AND recipient_id = me()";
                
                
            FB.api('fql', {q: query}, function(res) {
                var obj = res.data[0],
                    id = false;
                
                if(!obj) {
                    return $error('Could not load content from Facebook');
                }
            
                switch(obj.object_type) {
                    /* Photo and album links are formated with fbid=id */
                    case 'photo':
                    case 'album':
                        id = obj.href.match(/fbid=([0-9]+)/)[1];
                    break;
                    /* Stream posts should just load with the object_id */
                    case 'group':
                    case 'stream':
                        id = obj.object_id;
                    break;
                    /* Just open URL for these types */
                    case 'app_request':
                        window.open(obj.href);
                    break;
                    /* Subscribers */
                    case 'user':
                        if(obj.href.indexOf('sk=subscribers') > -1) {
                            id = 'me/subscribers';
                        } else {
                            window.open(obj.href);
                        }
                    break;
                    case 'event':
                        id = obj.object_id;
                    break;
                    /* Some notifs have a blank type, try to figure out what it is */
                    case '':
                        /* IDs sometimes aren't attached, so parse them out */
                        if(obj.href.indexOf('/posts') > -1 && obj.href.indexOf('facebook.com') > -1) {
                            id = obj.href.match(/posts\/([0-9]+)/)[1];
                        } else {
                            /* If all fails, just open it */
                            window.open(obj.href);
                        }
                    break;
                    default:
                        window.open(obj.href);
                    break;
                }
                
                window.location.hash = id;    
                
            });
        },
        older: function() {
            var until = Math.round((new Date()).getTime() / 1000) + 1000;
            try {
                var until = Math.round((new Date(this.notifs.data[this.notifs.data.length-1].updated_time)).getTime() / 1000) - 1;
            } catch(e) {}
            var self = this;
            FB.api('me/notifications', {include_read: 1, limit: 20, until: until}, function(res) {
                if(self.notifs && self.notifs.data) {
                    self.notifs.data.push.apply(self.notifs.data, res.data);
                } else {
                    self.notifs = {data: []};
                    self.notifs.data.push.apply(self.notifs.data, res.data);
                }
                $.each(res.data, function() {
                    this.ago = moment(new Date(this.updated_time)).fromNow();
                });
                Template('notifications', {notifs: res.data}, function(html) {
                    var html = $(html).html();
                    $popover.find('.notifications').append(html).find('.more').remove();
                });
            });
        }
    };
});