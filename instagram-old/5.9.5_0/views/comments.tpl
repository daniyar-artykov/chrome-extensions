<div class="comments_pop">
{{#data}}
    <div class="follower">
        <img src="{{from.profile_picture}}" class="follower_pic" />
        <div class="info">
            <a href="#users/{{from.id}}/media/recent">{{from.username}}</a>
            <div>
                {{{text}}}
            </div>
            <div class="small"><a href="#" class="comm_reply noclose" data-name="{{from.username}}">Reply</a></div>
        </div>
    </div>
{{/data}}
</div>
<textarea placeholder="Leave a comment" id="comment_box" />