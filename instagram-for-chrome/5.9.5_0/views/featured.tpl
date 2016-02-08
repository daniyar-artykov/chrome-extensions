<input type="text" placeholder="Search for users and hashtags..." id="search_input" />
<ul id="search_results"></ul>
{{#data.length}}
<div class="featured_header">
    <b>Featured Users</b>
</div>
<div class="featured_wrapper">
    {{#data}}
        <div class="follower">
            <div style="margin-left: 5px; float:right;">
                {{^following}}
                    <button class="button follow" data-id="{{id}}" data-username="{{username}}">Follow</button>
                {{/following}}
                {{#following}}
                    <a href="#users/{{id}}/media/recent">
                        <button class="button following" >Follow</button>
                    </a>
                {{/following}}
            </div>
            <div>
                <img src="{{profile_picture}}" class="follower_pic" />
                <div class="info">
                    <a href="#users/{{id}}/media/recent">{{username}}</a>
                    <div class="">
                        {{bio}}
                    </div>
        
                    
                </div>
            </div>
        </div>
    {{/data}}
    
</div>
{{/data.length}}

<div style="overflow: hidden">
    {{#popular}}
        <a href="#media/{{id}}">
            <img src="{{images.thumbnail.url}}" class="gram_thumb" data-id="{{id}}" />
        </a>
    {{/popular}}
</div>

<div class="featured_header" style="margin-top: 10px;">
    <b>Popular Hashtags</b>
</div>
{{ #tags }}
<div class="follower tags"><a href="#tags/{{.}}/media/recent">#{{.}}</a></div>
{{ /tags }}