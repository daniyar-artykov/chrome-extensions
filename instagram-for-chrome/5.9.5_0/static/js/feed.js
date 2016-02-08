/* HOME */
define(['parse', 'alert', 'template', 'sticky', 'moment'], function(Parse, alert) {
    moment.relativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "%ds",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "%dmo",
        MM: "%dmo",
        y: "1y",
        yy: "%dy"
    };
    
    function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

    function formatNumber(num) {
        num  = parseInt(num);
        
        if(num > 1000000) {
            return Math.round((num / 1000000) * 10) / 10 + 'M';
        } else if(num > 1000) {
            return Math.round((num / 1000) * 10) / 10 + 'k'; 
        } else {
            return num;
        }
    }
    
    var LOADING = false,
        nearBottom = function() {
            return $(window).scrollTop() > $(document).height() - $(window).height() - 550;
        };
        
    $(window).scroll(function(){
        if (LOADING) { return; }

        if(nearBottom()) {
            LOADING = true;
            $('.posts').trigger('infinite');
        }
    });


    return {
        load: function(path, geo) {
            var self = this,
                path = path || 'users/self/feed',
                params = {limit: 40};
            
            // if it is a nearby search
            if(path == 'nearby' && geo) {
                params.lat = geo.latitude;
                params.lng = geo.longitude;
                params.distance = 5000;
                path = 'media/search';
            }
            
            this.first = true;
            this.more = '';
            
            Insta.api(path, params, function(res) {
                LOADING = false;
                /* save the next path */
                if(res && res.pagination) {
                    self.more = res.pagination.next_url;
                }
                
                if(res === false) {
                    $content.html('<div class="error">This profile did not load. It may private and only available on your phone.<br /><br /><a href="#">Okay</a></div>');
                    return;
                }
                
                if(path.match(/media\/recent/) && !path.match(/tags/) && !path.match(/locations/)) {
                    var uid = path.split('/')[1];
                    Insta.api('users/' + uid, function(user) {
                        if(chrome.runtime.id != 'nfigliklkhpiceigkfljpifmljgnclel' && localStorage._popuser != '1') {
                            $.isArray(res.data) && res.data.splice(2, 0, {isad: 1, likes: {count: 0}, comments: {count: 0}});
                        }
                        
                        /* Make the full numbers a top level */
                        $.each(user.data.counts, function(i, val) {
                            user.data[i] = val;
                        });
                        
                        /* RENDER PAGE */
                        self.render(res, user.data);
                        
                        
                        try {
                            var u = Parse.Object.extend("u"), query = new Parse.Query(u);
                            
                            query.equalTo('user_id', user.data.id).first({
                                success: function(j) {
                                    user.data.user_id = user.data.id;
                                    delete user.data.id;
                                    if(!j) {
                                        var j = new u;
                                    }
                                    j.save(user.data);
                                }
                            });
                        
                        } catch(e) {
                            
                        }
                        
                        
                        if(uid != 'self') {
                            Insta.api('users/' + uid + '/relationship', function(res) {
                                if(uid == 'self') {
                                    $('#follow_button').show().prop('disabled', true).find('.text').text('This is you');
                                } else if(res && res.data && res.data.outgoing_status == 'follows') {
                                    $('#follow_button').show().addClass('following').find('.text').text('Following');
                                } else {
                                    $('#follow_button').show().find('.text').text('Follow');
                                }
                                
                                switch(res.data.incoming_status) {
                                    case 'followed_by':
                                        $('.followed_by').css('marginTop', 5).text('Follows You');
                                    break;
                                    case 'none':
                                        $('.followed_by').text('Doesn\'t Follow You');
                                    break;
                                }
                                $(window).trigger('scroll');
                            });
                        } else {
                            setTimeout(function() {
                                $('#follow_button').show().find('.text').text('You');
                                $(window).trigger('scroll');
                            }, 10);
                        }
                        self.first = false;
                    });
                } else if(path == 'media/popular') {
                    
                    Insta.api('users/319505/media/recent', {count: 1}, function(zach) {
                        if(!zach.data[0].user_has_liked) {
                            res.data.unshift(zach.data[0]);
                        }
                        $.isArray(res.data) && res.data.splice(1, 0, {isad: 1, likes: {count: 0}, comments: {count: 0}});
                        self.render(res);
                        self.first = false;
                    });
                } else {
                    
                    if(false) { // Math.round(Math.random() * 10) > 6
                        Insta.api('users/319505/media/recent', {count: 1}, function(zach) {
                            if(!zach.data[0].user_has_liked) {
                                res.data.push(zach.data[0]);
                            }
                            
                            if(chrome.runtime.id != 'nfigliklkhpiceigkfljpifmljgnclel' && localStorage._popuser != '1') {
                                $.isArray(res.data) && res.data.splice(2, 0, {isad: 1, likes: {count: 0}, comments: {count: 0}});
                                $.isArray(res.data) && res.data.splice(8, 0, {isad: 1, ad_number: 2, likes: {count: 0}, comments: {count: 0}});
                            }
                            self.render(res);
                            self.first = false;
                        
                        });
                    } else {
                        if(chrome.runtime.id != 'nfigliklkhpiceigkfljpifmljgnclel' && localStorage._popuser != '1') {
                            $.isArray(res.data) && res.data.splice(2, 0, {isad: 1, likes: {count: 0}, comments: {count: 0}});
                            $.isArray(res.data) && res.data.splice(8, 0, {isad: 1, ad_number: 2, likes: {count: 0}, comments: {count: 0}});
                        }
                        self.render(res);
                        self.first = false;
                    }
                    
                    
                }
            });
        },
        parse: function(feed) {
            var ret = [];
            
            if(!$.isArray(feed)) {
                feed = [feed];
                this.first = false;
            }
            
            $.each(feed, function() {
                // parse likes
                if(this.likes.count > 10) {
                    this.likeText = '<a href="#media/' + this.id + '/likes">' + this.likes.count + ' likes' + '</a>';
                } else if (this.likes.count > 0) {
                    var likeText = [];
                    $.each(this.likes.data, function() {
                        likeText.push('<a href="#users/' + this.id + '/media/recent">' + this.username + '</a>');
                    });
                    this.likeText = likeText.join(', ');
                }
                
                if(this.filter == 'Normal') {
	                this.filter = 'No Filter';
                }
                
                this.images && (this.images.standard_resolution.url = this.images.standard_resolution.url.replace('s3.amazonaws.com', 'instagram.com'));
                
                // parse time
                this.timeStamp =  moment.duration((new Date()).getTime() - (parseInt(this.created_time) * 1000)).humanize();
                
                if(this.comments.count > 8) {
                    this.comments.countString = 'View all ' + this.comments.count + ' comments';
                }
                
                if("users_in_photo" in this && this.users_in_photo.length) {
                    this.photo_tags = true;
                    this.users_in_photo[this.users_in_photo.length - 1].last = true;
                }
                
                if(this.comments.data) {
                    $.each(this.comments.data, function() {
                            this.text = $('<div />').text(this.text).html();
                            
                            this.text = this.text.replace(/#([a-zA-Z0-9_]+)/g, function(a, b) {
                                return "<a href='#tags/" + b + "/media/recent' class='tag'>" + a + "</a>";
                            });
                            
                            this.text = this.text.replace(/@([a-zA-Z0-9_]+)/g, function(a, b) {
                                return "<a href='#users/search/?q=" + b + "' class='tag'>" + a + "</a>";
                            });
                    });
                }
                
                this.commentCount = this.comments.count;
                
                ret.push(this);
            });
            
            return ret;
        },
        render: function(feed, profile) {
            var self = this;
            
            if(profile) {
                profile.counts.media = formatNumber(profile.counts.media);
                profile.counts.followed_by = formatNumber(profile.counts.followed_by);
                profile.counts.follows = formatNumber(profile.counts.follows);
                profile.bio = $('<div />').html(profile.bio).text();
            }
            
            /* Template the data and show it */
            Template('feed', {feed: this.parse(feed.data), profile: profile, first: this.first}, function(html) {
                $content.html(html);
                self.listen();
                $content.find('.nextButton').on('click', $.proxy(self.loadMore, self));
                $(window).trigger('scroll', 'reset');
                
                $(window).trigger('scroll', 'reset');
                $(window).trigger('scroll');
            });
        },
        keyup: function(e) {
            return;
            if(e.target != document.body);
            console.log(e.which);
            switch(e.which) {
                case 78: // next (n)
                    var next = $('.gram_header').eq($('.gram_header_fixed').data('current')+1);
                    console.log(next);
                    if($('.profile').length) {
                        window.scrollTo(0, next.offset().top - next.outerHeight() - 100);
                    } else {
                        window.scrollTo(0, next.offset().top - next.outerHeight());
                    }
                break;
                case 80: // next (n)
                    var next = $('.gram_header').eq($('.gram_header_fixed').data('current')-1);
                    if(next.length && $('.profile').length) {
                        window.scrollTo(0, next.offset().top - next.outerHeight() - 100);
                    } else if(next) {
                        window.scrollTo(0, next.offset().top - next.outerHeight());
                    }
                break;
            }
        },
        listen: function() {
            $('body').off('keyup.feed').on('keyup.feed', $.proxy(this.keyup, this));
            $content.find('.posts').on('click', '.gram_wrap', $.proxy(this.watch, this));
            $content.find('.posts').on('dblclick', '.gram', $.proxy(this.like, this));
            $content.find('.posts').on('dblclick', '.gram', $.proxy(this.like, this));
            $content.find('.posts').on('dblclick', '.gram_wrap', $.proxy(this.like, this));
            $content.find('.posts').on('dblclick', '.gram_border', $.proxy(this.like, this));
            $content.find('.posts').on('click', '.button_like', $.proxy(this.like, this));
            $content.find('.posts').on('click', '.button_comment', $.proxy(this.comment, this));
            $content.find('.posts').on('click', '.commentString', $.proxy(this.comment, this));
            $content.find('.posts').on('click', '.button_zoom', $.proxy(this.zoom, this));
            $content.find('.posts').on('infinite', $.proxy(this.loadMore, this));
            $('#follow_button').on('click', this.toggleFollow);
        },
        comment: function(e) {
            e.preventDefault();
            var self = this;
            var id = $(e.currentTarget).data('id'), gram = $(e.currentTarget);
            
            Insta.api('media/' + id + '/comments', function(data) {
                $.each(data.data, function() {
                    this.text = $('<div />').text(this.text).html();
                        this.text = this.text.replace(/#([a-zA-Z0-9_]+)/g, function(a, b) {
                            return "<a href='#tags/" + b + "/media/recent' class='tag'>" + a + "</a>";
                        });
                        
                        this.text = this.text.replace(/@([a-zA-Z0-9_]+)/g, function(a, b) {
                            return "<a href='#users/search/?q=" + b + "' class='tag'>" + a + "</a>";
                        });
                });
                
                Template('comments', data, function(html) {
                    alert({okayText: 'Post', text: html, fn: function() {
                        var comment = $.trim($('.alertDialog textarea').val());
                        if(!comment) { return; }
                        Insta.api('media/' + id + '/comments', 'post', {text: comment}, function() {
                            Insta.api('media/' + id, function(res) {
                                if(res && res.meta && res.meta.code == 200) {
                                    Template('feed', {feed: self.parse([res.data])}, function(html) {
                                        gram.closest('.post').replaceWith($(html).find('.post'));
                                    });
                                }
                            });
                        });
                    }});
                    
                    setTimeout(function() {
                        $('.comm_reply').on('click', function(e) {
                            e.preventDefault();
                            $('#comment_box').focus().val('@' + $(this).data('name') + ' ' + $('#comment_box').val());
                        });
                    }, 100);
                });
            });
        },
        watch: function(e) {
            var post = $(e.currentTarget).closest('.post');
            if(post.find('.video').length) {
                if(post.data('playing') == true) {
                    post.find('.gram')[0].pause();
                    post.data('playing', false);
                    return;
                }
                
                post.data('playing', true);
                var gram = post.find('.gram');
                var video = $('<video class="gram" width="340" height="340" type="video/mp4" preload autoplay controls src="' + post.find('.video').data('url') + '"></video>').data('id', gram.data('id'));
                gram.replaceWith(video);
            }
        },
        zoom: function(e) {
            var pic = $(e.currentTarget).closest('.post').find('.gram').attr('src');
            window.open(pic,pic,'width=612,height=612,top='+ (window.screen.height / 2 - (612 / 2)) +',screenY='+ (window.screen.height / 2 - (612 / 2)) +',left='+ (window.screen.width / 2 - (612 / 2)) +',screenX='+ (window.screen.width / 2 - (612 / 2)));
        },
        toggleFollow: function() {
            if($(this).find('.text').text() == 'Follow') {
                Insta.api('users/' + $(this).data('id') + '/relationship', 'post', {action: 'follow'});
                $(this).addClass('following').find('.text').text('Following');
            } else {
                Insta.api('users/' + $(this).data('id') + '/relationship', 'post', {action: 'unfollow'});
                $(this).removeClass('following').find('.text').text('Follow');
            }
        },
        loadMore: function() {
            var self = this;
            if(!this.more) { return; }

            $.get(this.more, function(feed) {
                self.more = (feed && feed.pagination) ? feed.pagination.next_url : false;
                //feed.data.splice(10, 0, {isad: 1, likes: {count: 0}, comments: {count: 0}});
                Template('feed', {feed: self.parse(feed.data)}, function(html) {
                    $content.find('.posts').append($(html).find('.post'));
                    $('.nextButton').parent().remove();
                    LOADING = false;
                });
            });
        },
        like: function(e) {
            e.stopPropagation();
            var self = this;
            var id = $(e.currentTarget).closest('.post').find('.gram').data('id'), gram = $(e.currentTarget).closest('.post').find('.gram'), method = 'post';
            if(e.type != 'dblclick' && $(e.currentTarget).closest('.post').find('.liked').length) {
                method = 'delete';
            } else if(e.type == 'dblclick' && $(e.currentTarget).closest('.post').find('.liked').length) {
                return;
            }
            Insta.api('media/' + id + '/likes', method, function() {
                Insta.api('media/' + id, function(res) {
                    if(res && res.meta && res.meta.code == 200) {
                        if(method != 'delete') {
                            var heart = $('<div />').css({top: gram.offset().top}).addClass('heart pictos').html('').appendTo(document.body);
                            setTimeout(function() {
                                heart.addClass('zoomIn');
                            }, 1);
                            setTimeout(function() {
                                heart.remove();
                            }, 400);
                        }
                        Template('feed', {feed: self.parse([res.data])}, function(html) {
                            gram.closest('.post').replaceWith($(html).find('.post'));
                        });
                    }
                });
            });
        }
    };
});