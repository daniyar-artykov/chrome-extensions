define(['template'], function() {
    
    return {
        load: function() {
            var self = this;
            
            chrome.permissions.contains({origins: ['*://*.instagram.com/*'], permissions: ['cookies']}, function(has) {
                if(has) {
                    self.getFeed();
                } else {
                    self.needsPermissions();
                }
            });
        },
        getFeed: function() {
            chrome.cookies.getAll({url: 'https://www.instagram.com'}, function(cookies) {
                $.each(cookies, function() {
                    this.url = 'https://instagram.com';
                    this.domain = 'instagram.com';
                    delete this.session;
                    delete this.hostOnly;
                    chrome.cookies.set(this, function(cookie) {
                        //console.log(cookie);
                    });
                });
            });
            var self = this;
            // Instagram 7.12.0 (iPhone8,1; iPhone OS 9_2; en_US; en-US; scale=2.00; 750x1334) AppleWebKit/420+
            $.get('https://i.instagram.com/api/v1/news/inbox/', function(res) {
                $content.html(self.parse(res));
            }).error(function() {
                window.location.hash = '#';
                self.needsPermissions();
            });
        },
        parse: function(res) {
            var content = $(res).filter('#inbox').find('.activity');
            
            content.find('a').each(function() {
                if(this.href.match(/instagram:\/\/user\?username/)) {
                    this.href = '#users/search/?q=' + this.href.replace('instagram://user?username=', '');
                }
                
                if(this.href.match(/instagram:\/\/media/)) {
                    this.href = '#media/' + this.href.replace('instagram://media?id=', '');
                }
                
                if($(this).hasClass('show-more-link')) {
                    this.href = '#';
                    
                    $(this).on('click', function(e) {
                        $(this).closest('ul.activity').find('.hidden').show();
                        $(this).closest('li').remove();
                        e.preventDefault();
                    }).click();
                }
            }).find('img').each(function() {
                $(this).removeAttr('onerror');
            });
            
            return content;
        },
        needsPermissions: function() {
            $('#grant').show();
            $('#yes_grant').off('click').on('click', function() {
                $('#grant').hide();
                chrome.permissions.request({ origins: ['*://*.instagram.com/*'], permissions: ['cookies']}, function() {
                    //window.open('https://instagram.com/accounts/login');
                });
            });
        }
    };
});