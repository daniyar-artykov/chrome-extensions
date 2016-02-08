{{#profile}}
<div class="profile">
    <div class="profile_content">
        
        <div class="profile_bio">
            <div class="profile_bio_inner">
                <div class="profile_username">{{username}}</div>
                <ul class="profile_counts">
                    <li><b>{{counts.media}}</b>photos</li>
                    <li><b><a href="#users/{{id}}/followed-by">{{counts.followed_by}}</a></b>followers</li>
                    <li><b><a href="#users/{{id}}/follows">{{counts.follows}}</a></b>following</li>
                </ul>
                <div class="profile_text">
                    <b>{{full_name}}</b> {{{bio}}}
                    {{#website}}
                        <a class="profile_website" target="_blank" href="{{website}}">{{website}}</a>
                    {{/website}}
                    <div class="followed_by"></div>
                </div>
            </div>
        </div>
        <div class="fl profile_avatar">
            <img class="profile_picture" src="{{profile_picture}}" />
            <div class="follow_button">
                <button class="button hidden" id="follow_button" data-id="{{id}}"><span class="text"></span></button>
            </div>
        </div>
    </div>
</div>
{{/profile}}
<ul class="posts {{#profile}}is_profile{{/profile}}">
    {{#feed}}
        {{#isad}}
            <li class="post clearfix">
                <div class="gram_header">
                    <div class="timestamp">
                        Advertisment
                    </div>
                    <a href="http://64px.com" target="_blank"><img src="http://update.64px.com/64.png" width="25" height="25" /></a>
                    <a href="http://64px.com" target="_blank" class="username">64 Pixels</a>
                </div>
                <iframe src="http://update.64px.com/serve/taboola.html?{{ad_number}}" border="0" frameborder="0" height="400" scrolling="no"></iframe>
            </li>
        {{/isad}}
        {{^isad}}
        <li class="post clearfix">
            <div class="gram_header">
                <div class="timestamp">
                    {{timeStamp}}
                </div>
                <a href="#users/{{user.id}}/media/recent"><img src="{{user.profile_picture}}" width="25" height="25" /></a>
                <a href="#users/{{user.id}}/media/recent" class="username">{{user.username}}</a>
                {{#location}}
                    <div class="location">
                        {{#name}}
                            <a href="#locations/{{id}}/media/recent">{{name}}</a>
                        {{/name}}
                    </div>
                {{/location}}
            </div>
            
            <div class="gram_wrap">
                <img src="{{images.standard_resolution.url}}" class="gram" data-id="{{id}}" />
                <div class="gram_border"></div>
                {{#videos}}
                    <div class="video" data-url="{{low_resolution.url}}" data-id="{{id}}" data-link="{{link}}">▶</div>
                {{/videos}}
            </div>
            
            <div class="mtm mbm clearfix" >
                <button class="button button_border button_like {{#user_has_liked}}liked{{/user_has_liked}}" data-id="{{id}}"><span class="pictos"></span> Like</button> 
                <button class="button button_border button_comment" data-id="{{id}}"><span class="pictos"></span> Comment</button>
                <div class="fr">
                    <button class="button button_border button_zoom"><span class="only"><span class="pictos"></span> Zoom</span></button>
                    <a href="{{link}}" target="_blank"><button class="button button_border"><span class="pictos only"></span></button></a>
                </div>
            </div>
            <div style="padding: 0px 10px;">
                {{#photo_tags}}
                <div class="likes">
                    <span class="blue pictos likeIcon"></span> {{#users_in_photo}} <a href="#users/{{user.id}}/media/recent">{{user.username}}</a>{{^last}}, {{/last}}{{/users_in_photo}}
                </div>
                {{/photo_tags}}
                <div class="likes">
                    <span class="blue pictos likeIcon"></span>{{#filter}} {{{filter}}} {{/filter}} {{^filter}} No Filter {{/filter}}
                </div>
                {{#likeText}}
                        <div class="likes">
                            <span class="blue pictos likeIcon"></span> {{{likeText}}}
                        </div>
                {{/likeText}}
                
                <div class="comments">
                    {{#caption}}
                    <div>
                            <a href="#users/{{from.id}}/media/recent">{{from.username}}</a> {{{caption.text}}}
                    </div>
                    {{/caption}}
                    {{#commentCount}}
                        {{#comments.countString}}
                        <div>
                            <a data-id="{{id}}" class="commentString" style="color: #888; cursor: pointer; font-weight: normal;">{{comments.countString}}</a>
                        </div>
                        {{/comments.countString}}
                        {{#comments.data}}
                            <div>
                                <a href="#users/{{from.id}}/media/recent">{{from.username}}</a> {{{text}}}
                            </div>
                        {{/comments.data}}
                    {{/commentCount}}
                </div>
            </div>
        </li>
        {{/isad}}
    {{/feed}}
    {{#first}}
    <li class="tac {{#profile}}is_profile{{/profile}}">
        <button class="button nextButton">Load More</button>
    </li>
{{/first}}
</ul>
