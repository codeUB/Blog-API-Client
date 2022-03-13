window.onload = function() {
    fetchPosts ();
}



    async function fetchPosts() {
        try {
            const response = await fetch('http://localhost:5000/posts')
            const posts = await response.json();
            
    
            let html = ''
    
            for (let post of posts) {
               
    
                const tags = post.tags;
                let tag    = "";
                let author = "";
                let title = "";
                let x = "";
    
                // Ändrar till "okänd författare" om post.author är null
                if (post.author == null) {
                    author = "Okänd författare"
                } else {
                    author = post.author;
                }
    
                // Visar bara taggar som inte är null
                if (tags != null) {
                    tag = tags;
                }
                
                // Här tar vi bort titlar som är null eller kortare än 10 bokstäver. 
                // Är titeln kort så hämtar vi en random titel från ett clickbait API.
                if (post.title && post.title.length > 10) {
                    title = post.title;
                } else {

                    const anotherResponse = await fetch('https://my-json-server.typicode.com/AlexanderWiman/quotes/quotes', {method: 'get'});
                    const anotherdata = await anotherResponse.json();
                    
                    for (let i = 0; i < anotherdata.length; i++) {
                        title = anotherdata[Math.floor(Math.random() * anotherdata.length)].quote;  
                    }
                }
    
                html += `
                    <div class="col-sm m-5 p-5 shadow bg-white">
                        <h2>${title}</h2>
                        <p>${author} - ${post.date.substring(0, 10)}</p>
                        <blockquote class="blockquote fst-italic fw-light">"${post.content.substring(0, 100)}"</blockquote>
                        <p>${tag}</p>
                        <a href="#">Läs mer!</a>
                    </div>
                `
            }
            document.getElementById('post-list').innerHTML = html;
          
        } catch(error) {
            console.log(error)
        }
    
    }
