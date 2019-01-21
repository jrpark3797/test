function upload(){
  var result;

  var data = {
    source_code: editor.getValue(),
    language_id: 34,
    stdin: stdin,
    expected_output: expected_output
  };

  $.ajax({
url: 'https://api.github.com/user/repos',
    type: 'POST',
    beforeSend: function(xhr) { 
        xhr.setRequestHeader("Authorization", "token TOKEN-FROM-PREVIOUS-CALL"); 
    },
    data: '{"name": "repo test","description":"repo create from ajax test","homepage": "https://sample.com","auto_init":true}'
    async: false,
    success: function(data, textStatus, jqXHR) {
      result = data;
    }
  });

  return result;
}

function submit(){
  score = test();
  alert(score);
  //alert(JSON.stringify(data, null, 4));
}

function test(){
  var count = 0;

  for(var i=0; i<testcase["length"]; i++)
  {
    data = judge(testcase["case"][i]["input"],testcase["case"][i]["output"]);
    if(data["status"]["id"]==3)
      count++;
  }

  return 100*count/testcase["length"];
}

function judge(stdin,expected_output) {
  var result;

  var data = {
    source_code: editor.getValue(),
    language_id: 34,
    stdin: stdin,
    expected_output: expected_output
  };

  $.ajax({
    url: "https://api.judge0.com/submissions?wait=true",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    async: false,
    success: function(data, textStatus, jqXHR) {
      result = data;
    }
  });

  return result;
}
