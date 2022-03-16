window.onload = function() {
    fetchPosts ();
    fetchTags();

}

async function fetchTags(){
    try {
        const data = await fetch('http://localhost:5000/posts')
        const post = await data.json();

        let tagsSection = document.getElementById("tags");

        for (let tag of post){

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
               
            
                let tag    = "";
                let author = "";
                let title  = "";
                let text   = "";
    
                // Ändrar till "okänd författare" om post.author är null
                if (post.author == null) {
                    author = "Okänd författare"
                } else {
                    author = post.author;
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

                // Undviker att visa tomma inlägg, lägger en dummy text istället
                if (post.content == null) {
                    text = "Författaren har inte skrivit någon text. Så vi lägger till den här texten istället, så blir det inte tomt på sidan.";
                } else {
                    text = post.content.substring(0, 100);
                }

                // Visar bara taggar som inte är null
                if (post.tags != null || post.tags != "") {
                    tag = post.tags;
                } else {
                    tag = "";
                }

                html += `
                    <div class="col-sm m-5 p-5 shadow bg-white">
                        <h2>${title}</h2>
                        <p>${author} - ${post.date.substring(0, 10)}</p>
                        <blockquote class="blockquote fst-italic fw-light">"${text}"</blockquote>
                        <p>${tag}</p>
                        <a href="post.html?id=${post._id}">Läs mer!</a>
                    </div>
                `
            }
        
            document.getElementById('post-list').innerHTML = html;
          
        } catch(error) {
            console.log(error)
        }
    
    }
