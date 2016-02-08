define(['template'], function() {
    
    var tags = ["love","instagood","me","tbt","follow","cute","photooftheday","followme","tagsforlikes","happy","like","beautiful","girl","picoftheday","selfie","summer","fun","smile","instadaily","friends","like4like","igers","fashion","instalike","food","swag","tflers","amazing","bestoftheday","follow4follow","instamood","style","lol","likeforlike","wcw","l4l","family","nofilter","pretty","life","my","webstagram","iphoneonly","followforfollow","f4f","sun","hair","tweegram","all_shots","bored","instago","instacool","instafollow","cool","funny","eyes","girls","nice","followback","look","party","art","night","beach","mcm","sky","music","shoutout","repost","hot","20likes","nature","pink","colorful","beauty","baby","instacollage","throwback","iphonesia","blue","day","christmas","fitness","black","makeup","photo","dog","harrystyles","good","new","boyfriend","onedirection","awesome","instalove","best","throwbackthursday","loveit","sweet","i","likes"];
    
    return {
        load: function() {
            var self = this;
            
            Template('tags', {tags: tags}, function(html) {
                $content.html(html);
                self.listen();
            });
        },
        listen: function() {
            $('#search_input').on('keyup', function(e) {
                if($(this).val().length && e.which == 13) {
                    window.location.hash = 'tags/' + $(this).val() + '/media/recent';
                }
            });
        }
    };
});