getPostList();

function getPostList(){
    $.get("http://localhost:5000/posts", function(data) {
        if(data){
            console.log(data)
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                $(".table tbody").append(CreateTableRow(element));
            }
        }else{
            alert("data not loaded")
        }
    });
}


function CreateTableRow(data){
 return `<tr>
    <td>${data.title}</td>
    <td>${data.author}</td>
    <td>${data.tags?data.tags:"-"}</td>
    <td>${data.date}</td>
    <td><a href="/update/${data._id}">Update</a> | <a href="javascript:deletePost('${data._id}')">delete</a></td>
    </tr>`;
}

function deletePost(incomingPostId){

if (confirm("Are you sure?") == true) {
    axios.delete('http://localhost:5000/posts/'+incomingPostId, {
    postId : incomingPostId,
  })
  .then(function (response) {
    if(response){
      alert("Deleted!");
      window.location.href= window.location.href;
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  } else {
    alert("Cancelled!");
  }

}
