define(['template'], function() {
    return {
        load: function() {
            var self = this;
            
            Template('search', {}, function(html) {
                $content.html(html);
                self.listen();
            });
        },
        listen: function() {
            var search = _.debounce(function() {
                $('.search_result').remove();
                if($('#search_input').val()) {
                    var q = $('#search_input').val().replace('#','');
/*                     $('#search_results').append('<li class="search_result"><a href="#tags/' + q + '/media/recent">#' + q + '</a></li>'); */
                    Insta.api('users/search', {q: q, count: 10}, function(res) {
                        if(res && res.data) {                            
                            Template('follows', {data: res.data, pagination: false}, function(html) {
                                $('#search_results').html(html);
                                if(!res.data.length) {
                                    $('#search_results').html('<div class="error">No search results</div>');
                                }
                            });
                        }
                    });
                } else {
                    $('#search_results').html('<div class="error"></div>');
                }
                
            }, 200);
            
            $('#search_input').on('keyup', search).focus();
        }
    };
});