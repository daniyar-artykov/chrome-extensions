(function() {
    
    var Cache = {
        set: function(key, value) {
            localStorage['_cache' + key] = value;
        },
        get: function(key) {
            return localStorage['_cache' + key] || false;
        },
        remove: function(key) {
            localStorage.removeItem('_cache' + key);
        }
    };
    
    window.Cache = Cache;
})();