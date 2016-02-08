define(['mustache'], function(Mustache) {
    var cache = {},
        M = Mustache,
        fetch = function(views, fn) {
            var fetched = 0;
            $.each(views, function() {
                var view = this;
                if(this in cache) {
                    if(++fetched == views.length) {
                        fn();
                    }
                } else {
                    $.get('views/' + view + '.tpl', function(tpl) {
                        cache[view] = tpl;
                        if(++fetched == views.length) {
                            fn();
                        }
                    }, 'text');
                }
            });
        };
        
    var Template = function(view, data, fn, partials) {
        partials = partials || [];
        var views = partials.slice(0);
        views.push(view);
        fetch(views, function() {
            var parts = {};
            $.each(partials, function() {
                parts[this] = cache[this];
            });
            var res = M.to_html(cache[view], data, parts);
            fn(res);
        });
    };
    
    window.Template = Template;
});