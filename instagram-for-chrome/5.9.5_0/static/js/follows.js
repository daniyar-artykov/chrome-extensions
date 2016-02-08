define(['alert', 'template'], function() {
    var next = false, loaded_path;
    
    return {
        load: function(path) {
            var self = this;
            loaded_path = path;
            
            Insta.api(path, function(follows) {
                if(follows.pagination && follows.pagination.next_cursor) {
                    next = follows.pagination.next_cursor;
                }
                if(path == 'users/self/requested-by') {
                    $.each(follows.data, function() {
                        this.requested_by = true;
                    });
                }
                Template('follows', {data: follows.data, pagination: !!follows.pagination}, function(html) {
                    $content.html(html).find('.load_more_follows').on('click', self.next);
                    if(!follows.data.length) {
                        $content.html('<div class="error">No users to show</div>');
                    }
                    self.listen();
                });
                
            });
        },
        listen: function() {
            $('.followers').on('click', '.approve', function() {
                Insta.api('users/' + $(this).data('uid') + '/relationship', 'POST', {action: 'approve'}, function() {});
                $(this).closest('.follower').slideUp('fast');
            });
            
            $('.followers').on('click', '.deny', function() {
                Insta.api('users/' + $(this).data('uid') + '/relationship', 'POST', {action: 'ignore'}, function() {});
                $(this).closest('.follower').slideUp('fast');
            });
        },
        next: function(e) {
            e.preventDefault();
            if(next) {
                Insta.api(loaded_path, {cursor: next}, function(follows) {
                    if(follows.pagination && follows.pagination.next_cursor) {
                        next = follows.pagination.next_cursor;
                    }
                    Template('follows', {data: follows.data}, function(html) {
                        $(html).not('.follower:last-child').insertBefore($(e.currentTarget).closest('.follower'));
                    });
                });
            }
        }
    };
});