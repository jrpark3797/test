/*
github.js

params:
	user: user name
	pswd: password
	repos: repository
	file: file name
	content: content of file
	message: commit message
	sha: hash key
	comment: comment
	comment_id: comment id
*/

function getuser(user, pswd){
  var result;
  $.ajax({
    url: "https://api.github.com/user",
    type: "GET",
    contentType: "application/json",
    async: false,
    success: function(response) {
      result = response["login"];
    }
  });
  return result;
}

function createrepos(user, pswd, repos){
  $.ajax({
    url: "https://api.github.com/user/repos",
    type: "POST",
    contentType:"application/json",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+pswd));
    },
    processData: false,
    data: JSON.stringify({name:repos}),
    async: true
  });
}

function createfile(user, pswd, repos, file, content, message){
  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/contents/"+file,
    type: "PUT",
    contentType:"application/json",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+pswd));
    },
    processData: false,
    data: JSON.stringify({content:btoa(content),message:message}),
    async: true
  });
}

function getfile(user, repos, file){
  var result;
  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/contents/"+file,
    type: "GET",
    contentType: "application/json",
    async: false,
    success: function(response) {
      result = atob(response["content"]);
    }
  });
  return result;
}

function getsha(user, repos, file){
  var result;
  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/contents/"+file,
    type: "GET",
    contentType: "application/json",
    async: false,
    success: function(response) {
      result = response["sha"];
    }
  });
  return result;
}

function updatefile(user, pswd, repos, file, content, message){
  var sha = getsha(user, repos, file);

  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/contents/"+file,
    type: "PUT",
    contentType:"application/json",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+pswd));
    },
    processData: false,
    data: JSON.stringify({sha:sha,content:btoa(content),message:message}),
    async: true
  });
}

function deletefile(user, pswd, repos, file, message){
  var filesha = getsha(user, repos, file);

  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/contents/"+file,
    type: "DELETE",
    contentType:"application/json",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+pswd));
    },
    processData: false,
    data: JSON.stringify({sha:filesha,message:message}),
    async: true
  });
}

function getlastcommit(user, repos){
  var result;
  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/commits/master",
    type: "GET",
    contentType: "application/json",
    async: false,
    success: function(response) {
      alert(JSON.stringify(response));
      result = response;
    }
  });
  return result;
}

function getlasttree(user, repos){
  var result;
  var commit = getlastcommit(user,repos);

  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/git/trees/"+commit["commit"]["tree"]["sha"],
    type: "GET",
    contentType: "application/json",
    async: false,
    success: function(response) {
      result = response;
    }
  });

  return result;
}

function createcommitcomment(user, pswd, repos, sha, comment){
  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/commits/"+sha+"/comments",
    type: "POST",
    contentType:"application/json",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+pswd));
    },
    processData: false,
    data: JSON.stringify({body:comment}),
    async: true
  });
}

function updatecommitcomment(user, pswd, repos, comment_id, comment){
  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/comments/"+comment_id,
    type: "PATCH",
    contentType:"application/json",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+pswd));
    },
    processData: false,
    data: JSON.stringify({body:comment}),
    async: true
  });
}

function getcommitcomments(user, repos, sha){
  var result;

  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/commits/"+sha+"/comments",
    type: "GET",
    contentType: "application/json",
    async: false,
    success: function(response) {
      result = response;
    }
  });

  return result;
}
