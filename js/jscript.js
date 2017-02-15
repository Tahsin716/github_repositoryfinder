$(document).ready(function(){
	$('#searchUser').on('keyup',function(keypressed){
		let username = keypressed.target.value;

		// Make request to Github
		$.ajax({
			url:'https://api.github.com/users/'+username,
			data:{
				client_id:'979fbbad6f9fc3285567',
				client_secret:'415b4fa60463dffd98d587bee72c65967befa2c3'
			}
		}).done(function(user){
			$('#profile').html(`
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
				    	<div class="col-md-3">
				    		<img class="avatar img-circle" src="${user.avatar_url}">
				    		<a target="_blank" class="profile btn btn-info btn-block" href="${user.html_url}">View Profile</a>
				    	</div>
				    	<div class="user-info col-md-9">
				    		<span class="label label-default">Public Repos: ${user.public_repos}</span>
							<span class="label label-primary">Public Gists: ${user.public_gists}</span>
							<span class="label label-success">Followers: ${user.followers}</span>
							<span class="label label-info">Following: ${user.following}</span>
				    	</div>
				    </div>
				  </div>
				</div>
			`);	
		});	
	});
});