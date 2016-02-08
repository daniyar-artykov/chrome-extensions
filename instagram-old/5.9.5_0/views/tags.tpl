<input type="text" placeholder="Type a hashtag and hit enter to view..." id="search_input" />
<ul id="search_results"></ul>
{{ #tags }}
<div class="follower tags"><a href="#tags/{{.}}/media/recent">#{{.}}</a></div>
{{ /tags }}