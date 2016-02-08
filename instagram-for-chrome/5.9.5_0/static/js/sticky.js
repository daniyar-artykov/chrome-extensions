(function() {
    var index = 0,
        current = false,
        headerHeight = $('#header').outerHeight(),
        win = $(window).on('scroll', function(e, reset) {
            var headers = $('.gram_header'),
                scrollTop = win.scrollTop() + headerHeight;
            
            if($('.profile').length) {
                current && current.remove();
                $('.posts').css({top: $('.profile').outerHeight()});
                return;
            }
            
            headers.css('opacity', 1).each(function(k,v) {
                var header = $(this),
                    next = headers.eq(k+1);
                
                if(scrollTop >= header.offset().top) {
                    if(!next.length) {
                        
                    } else if(scrollTop < next.offset().top && scrollTop > next.offset().top - header.outerHeight()) {
                        current && current.remove();
                        current = header.clone().addClass('gram_header_fixed').appendTo(document.body).css('marginTop', -(header.outerHeight() - (next.offset().top - scrollTop)));
                        header.css('opacity', 0);
                        return false;
                    } else if(scrollTop < next.offset().top) { // Show it normal
                        current && current.remove();
                        current = header.clone().addClass('gram_header_fixed').appendTo(document.body);
                        header.css('opacity', 0);
                        return false;
                    }
                }
            });
        }).on('hashchange', function() {
            current && current.remove();
        });
})();