/* POSTS */
define(function() {
    return {
        listen: function() {
            /* Adding comments */
            $content.on('keydown', '.post .comment_entry', function(e) {
                var input = $(this),
                    id = $(this).closest('.post').attr('data-id');

                switch(e.which) {
                    case 13:
                        if(input.val().length) {
                            input.prop('disabled', true);
                            FB.api(id + '/comments', 'POST', {message: input.val()}, function(res) {
                                if(res && res.id) {
                                    FB.api(res.id, function(res) {
                                        input.prop('disabled', false).val('');
                                        Template('comment', res, function(html) {
                                            input.closest('li').before(html);
                                        });
                                    });
                                }
                            });
                        }
                    break;
                }
            /* Adding likes and focusing on comment */
            }).on('click', '.post .actions a', function(e) {
                /* If it is a comment link, focus on comments */
                if(this.innerHTML == 'Comment') {
                    e.preventDefault();
                    $(this).closest('.post').find('.comment_entry').focus();
                }
                /* If it isn't a like, just follow the link */
                if(this.innerHTML != 'Like') {
                    return true;
                }
                
                /* Make sure to not follow link for liking */
                e.preventDefault();
                var id = $(this).closest('.post').attr('data-id'),
                    post = $(this).closest('.post'),
                    likes = $(this).closest('.post').find('.likes');
                
                FB.api(id + '/likes', 'POST', function(res) {
                    FB.api(id, function(res) {
                        if(!res) { return; }
                        res = postParser(res);
                        Template('posts', {posts: res}, function(html) {
                            post.replaceWith($(html).find('ul.posts').html());
                        }, ['likes','comments']);
                    });
                });
            });
        }
    };
});