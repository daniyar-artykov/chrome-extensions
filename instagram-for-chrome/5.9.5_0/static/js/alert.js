define(function() {
    
    return function(opts) {
        if(!opts.text) { return; }
        
        $('.alertDialog,.alertDialogBack').remove();
        
        $('<div />').addClass('alertDialogBack').appendTo(document.body);
        
        /* Setup a close fn */
        var close = function() {
            $('body').css({overflow: 'auto'});
            $('.alertDialog,.alertDialogBack').remove();       
        }
        
        var dialog = $('<div />').appendTo(document.body).addClass('alertDialog').on('click', 'a', function() {
            if(!$(this).hasClass('noclose')) {
                close();
            }
        });
        
        /* If there is a title, show it */
        if(opts.title) {
            dialog.append('<div class="mbm"><b>' + opts.title + '</b></div>');
        }
        
        /* Add specified Text */
        dialog.append('<div>' + opts.text + '</div>');
        
        $('body').css({overflow: 'hidden'});
        
        /* Add buttons */
        var buttons = $('<div />').addClass('mtl')
                    .append($('<button />').addClass('button').text(opts.okayText || 'Okay').on('click', function() {
                         $('body').css({overflow: 'auto'});
                        if(opts.fn) {
                            opts.fn();
                            close();
                        } else {
                            close();
                        }
                    }))
                    .append($('<button />').addClass('button mlm').text('Cancel').on('click', function() {
                         $('body').css({overflow: 'auto'});
                            close();
                    }));
        
        dialog.append(buttons);
        dialog.height(dialog.height()).css({top: 0, left: 0, right: 0, bottom: 0}).hide().slideDown('fast');
    }
});