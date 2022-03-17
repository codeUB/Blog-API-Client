
$("#CreatePost").click(function(){
    axios.post('http://localhost:5000/posts', {
        title: $("#Title").val(),
        content: $("#Content").val(),
        author: $("#Author").val(),
        tags: $("#Tags").val()
    })
    .then(function (response) {
      if(response){
        alert("Success!");
        window.location.href="/blog-client-template/";
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  
  })