(function($) {
    $.fn.tips = function() {
        return this.each(function() {
            var root = $(this),
                tip = $('<div />').addClass('tips').text(root.data('tip'));
                
                root.on('mouseenter', function() {
                    var offset = root.offset(),
                        left = offset.left + root.outerWidth(),
                        top = offset.top + Math.round(root.outerHeight() / 2);
                        
                    tip.appendTo(document.body);
                    top -= Math.round(tip.outerHeight() / 2);
                    tip.css({left: left, top: top});
                })
                .on('mouseleave', function() {
                    tip.detach();
                });
        });
    };
})(jQuery);