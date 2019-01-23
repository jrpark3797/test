function getuser(user, pswd){
  var result;
  $.ajax({
    url: "https://api.github.com/user,
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
  var filesha = getsha(user, repos, file);

  $.ajax({
    url: "https://api.github.com/repos/"+user+"/"+repos+"/contents/"+file,
    type: "PUT",
    contentType:"application/json",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+pswd));
    },
    processData: false,
    data: JSON.stringify({sha:filesha,content:btoa(content),message:message}),
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
