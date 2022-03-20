window.onload = function() {
    var url = document.URL;
    var id = url.substring(url.indexOf('/')+1);
    fetchPost(id)
}
