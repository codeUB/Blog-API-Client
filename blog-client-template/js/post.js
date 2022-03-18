window.onload = function() {

    // Really crappy way to find out post_id and titleId
    var url      = document.URL;
    var call     = url.substring(url.indexOf('=') + 1);
    var titleId  = url.substring(url.indexOf('title=') + 6);
    let question = "&title=";
    let trim     = question.concat(titleId);
    var id       = call.replace(trim, "")
    
    fetchPost(id,titleId)
}

async function fetchPost(id,titleId) {
    try {
        const response = await fetch('http://localhost:5000/posts/' + id)
        const post = await response.json();
        

        let html = ''

            const tags = post.tags;
            let tag    = "";
            let author = "";
            let title  = "";
            let text   = "";

            // Changes to unknown author if post.authur equals null. Looks better that way.
            if (post.author == null) {
                author = "Okänd författare"
            } else {
                author = post.author;
            }

            // Let´s remove null and empty tags
            if (post.tags != null && post.tags != "") {
                tag = "Tags: " + post.tags;   
            } else {
                tag = "";
            }
            
            // Here we remove titles that are null or shorter then 10 letters 
            // If that happens, we fetch a random title from a clickbait API
            if (post.title && post.title.length > 10) {
                title = post.title;
            } else {

                const anotherResponse = await fetch('https://my-json-server.typicode.com/AlexanderWiman/quotes/quotes', {method: 'get'});
                const anotherdata = await anotherResponse.json();
                
                
                    title = anotherdata[titleId].quote;  
                
                }

            // We don´t want empty posts, in case we put in a dummy text
            if (post.content == null) {
                text = "Författaren har inte skrivit någon text. Så vi lägger till den här texten istället, så blir det inte tomt på sidan.";
            } else {
                text = post.content;
            }

            // Generate a random id, so we can get a random pic
            let imgId = Math.floor(Math.random() * 1000);

            html += `
                <div class="col-sm m-5 p-5 shadow bg-white">
                    <h2>${title}</h2>
                    <p>${author} - ${post.date.substring(0, 10)}</p>
                    <img src="https://picsum.photos/id/${imgId}/600/300">
                    <blockquote class="blockquote fst-italic fw-light">"${text}"</blockquote>
                    <p>${tag}</p>
                </div>
            `
    
        
        document.getElementById('post-list').innerHTML = html;
      
    } catch(error) {
        console.log(error)
    }

}
