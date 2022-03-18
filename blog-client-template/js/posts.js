window.onload = function() {
    fetchPosts ();
    fetchTags();

}

// Here we fetch the tags, for the sidebar
async function fetchTags(){
    try {
        const data = await fetch('http://localhost:5000/posts')
        const post = await data.json();

        let tagsSection = document.getElementById("tags");

        for (let tag of post){

            //We dont want tags that are null or empty
            if(tag.tags != null && tag.tags != ""){

                tag.tags.forEach(myFunction);
                function myFunction(value, index, array) {
                
                tagsSection.innerHTML += ` 
                    <a class="btn btn-rounded m-1" href="#" role="button">${value}</a>
                `;      

                }
            }
        }
    }       
    catch(error) {
        console.log(error)
    }
}



async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:5000/posts')
        const posts = await response.json();


        let html = ''

    for (let post of posts) {
        

        let tag     = "";
        let author  = "";
        let title   = "";
        let text    = "";
        let titleId = "";

        // Changes to unknown author if post.authur equals null. Looks better that way.
        if (post.author == null) {
            author = "Okänd författare"
        } else {
            author = post.author;
        }

        
        // Here we remove titles that are null or shorter then 10 letters 
        // If that happens, we fetch a random title from a clickbait API
        if (post.title && post.title.length > 10) {
            title = post.title;
        } else {

            const anotherResponse = await fetch('https://my-json-server.typicode.com/AlexanderWiman/quotes/quotes', {method: 'get'});
            const anotherData = await anotherResponse.json();
           
            
           
            for (let i = 0; i < anotherData.length; i++) {

                // ################## OBS ##################
                // Kan göra det så här, men jag vill ha med mig ID´t till post.js
                // title = anotherData[Math.floor(Math.random() * anotherData.length)].quote;  

                // Så jag gör så här istället
                titleId = Math.floor(Math.random() * anotherData.length);
                title = anotherData[titleId].quote;
            }
        }

        // We don´t want empty posts, in case we put in a dummy text
        if (post.content == null) {
            text = "Författaren har inte skrivit någon text. Så vi lägger till den här texten istället, så blir det inte tomt på sidan.";
        } else {
            text = post.content.substring(0, 100);
        }

        // Let´s remove null and empty tags
        if (post.tags != null && post.tags != "") {
            tag = "Tags: " + post.tags;   
        } else {
            tag = "";
        }

        // Generate a random id, so we can get a random pic
        let imgId = Math.floor(Math.random() * 1000);

        html += `
            <div class="col m-5 p-5 shadow bg-white">
                <h2><a href="post.html?id=${post._id}&title=${titleId}">${title}</a></h2>
                <img src="https://picsum.photos/id/${imgId}/300">
                <p>${author} - ${post.date.substring(0, 10)}</p>
                <blockquote class="blockquote fst-italic fw-light">"${text}"</blockquote>
                <p>${tag}</p>
                <a href="post.html?id=${post._id}&title=${titleId}">Läs mer!</a>
            </div>
        `
    }

    document.getElementById('post-list').innerHTML = html;

    } catch(error) {
    console.log(error)
    }

}
