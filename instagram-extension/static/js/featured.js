define(['template'], function() {
    
    var tags = ["love","instagood","me","tbt","follow","cute","photooftheday","followme","tagsforlikes","happy","like","beautiful","girl","picoftheday","selfie","summer","fun","smile","instadaily","friends","like4like","igers","fashion","instalike","food","swag","tflers","amazing","bestoftheday","follow4follow","instamood","style","lol","likeforlike","wcw","l4l","family","nofilter","pretty","life","my","webstagram","iphoneonly","followforfollow","f4f","sun","hair","tweegram","all_shots","bored","instago","instacool","instafollow","cool","funny","eyes","girls","nice","followback","look","party","art","night","beach","mcm","sky","music","shoutout","repost","hot","20likes","nature","pink","colorful","beauty","baby","instacollage","throwback","iphonesia","blue","day","christmas","fitness","black","makeup","photo","dog","harrystyles","good","new","boyfriend","onedirection","awesome","instalove","best","throwbackthursday","loveit","sweet","i","likes"];
        
        function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

    return {
        load: function() {
            this.render([]);
            //$.get('http://update.64px.com/ig.featured.json', $.proxy(this.render, this), 'json');
        },
        listen: function() {
            $('.featured_wrapper').on('click', '.follow', this.follow);
            
            var search = _.debounce(function() {
                $('.search_result').remove();
                if($('#search_input').val()) {
                    var q = $('#search_input').val().replace('#','');
                    Insta.api('users/search', {q: q, count: 10}, function(res) {
                        if(res && res.data) {                            
                            Template('follows', {data: res.data, pagination: false}, function(html) {
								$('#search_results').html(html).prepend('<div class="follower"><div class="follower_pic search_hashtag">#</div><div class="info"><a href="#tags/' + q + '/media/recent">#' + q + '</a></div></div>');
                            });
                        }
                    });
                } else {
                    $('#search_results').html('');
                }
                
            }, 200);
            
            $('#search_input').on('keyup', search).focus();
            
        },
        render: function(data) {
            var self = this;
            
            data = $.map(data, function(item, index) {
                if(localStorage['following' + item.id]) {
                    return null;
                }
                
                return item;
            });

            data = shuffle(data);
            data = data.slice(0, 3);

            
            Template('featured', {data: data, popular: [], tags: tags}, function(html) {
                            $content.html(html);
                            self.listen();
                        });
                        
/*
            Insta.api('media/popular', {count: 23}, function(res) {
                Insta.api('users/319505/media/recent', {count: 1}, function(zach) {
                        res.data.unshift(zach.data[0]);
                        Template('featured', {data: data, popular: res.data, tags: tags}, function(html) {
                            $content.html(html);
                            self.listen();
                        });
                    });
            });
*/
            
        },
        follow: function() {
            localStorage['following' + $(this).data('id')] = '1';
            Insta.api('users/' + $(this).data('id') + '/relationship', 'post', {action: 'follow'});
            $(this).addClass('following').find('.text').text('Following');
            if(_gaq) {
                try {
                    _gaq.push(['_trackEvent', 'Feature Follow', '' + $(this).data('username')]);
                } catch(e) {}
            }
        }
        
    };
    
});