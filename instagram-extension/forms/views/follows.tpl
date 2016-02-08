<div class="followers">
{{#data}}
    <div class="follower">
        <img src="{{profile_picture}}" class="follower_pic" />
        <div class="info">
            <a href="#users/{{id}}/media/recent">{{username}}</a>
            <div class="">
                {{bio}}
            </div>
            {{#requested_by}}
            <div style="margin-top: 5px;">
                <button class="button approve" data-uid="{{id}}">Approve</button> <button class="button deny" data-uid="{{id}}">Deny</button>
            </div>
            {{/requested_by}}
        </div>
    </div>
{{/data}}
{{#pagination}}
<div class="follower">
    <a href="#" class="load_more_follows">Load More</a>
</div>
{{/pagination}}
</div>