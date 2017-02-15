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
			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
				data:{
				client_id:'979fbbad6f9fc3285567',
				client_secret:'415b4fa60463dffd98d587bee72c65967befa2c3',
				sort: 'created: asc',
				per_page: 5
				}	
			}).done(function(repos){
				$.each(repos, function(index, repo){
					$('#repositories').append(`
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong>: ${repo.description}
								</div>
								<div class="col-md-3">
									<span class="label label-default">Forks: ${repo.forks_count}</span>
									<span class="label label-primary">Watchers: ${repo.wathcers_count}</span>
									<span class="label label-success">Stars: ${repo.stargazers_count}</span>
								</div>
								<div class="col-md-2">
								</div>
							</div>
						</div>
					`);
				});
			});

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

							<ul class="info-list list-group">
								<li class="list-group-item">Company: ${user.company}</li>
								<li class="list-group-item">Website/blog: ${user.blog}</li>
								<li class="list-group-item">Location: ${user.location}</li>
								<li class="list-group-item">Member Since: ${user.created_at}</li>
							</ul>

				    	</div>
				    </div>
				  </div>
				</div>
				<h3 class="page-header">Latest Repositories</h3>
				<div id="repositories"></div>
			`);	
		});	
	});
});