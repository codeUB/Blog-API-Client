window.onload = function() {
    fetchPosts();
}


async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:5000/posts')
        const posts = await response.json();
        console.log(posts);


        let html = ''
        for (let post of posts) {
            html += `
                <div class="col-sm m-5 p-5 shadow bg-white">
                    <h2>${post.title}</h2>
                    <p>${post.author} - ${post.date.substring(0, 10)}</p>
                    <blockquote class="blockquote fst-italic fw-light">"${post.content.substring(0, 100)}"</blockquote>
                    <a href="#">Läs mer!</a>
                </div>
            `
        }
        document.getElementById('post-list').innerHTML = html;
    } catch(error) {
        console.log(error)
    }


 
}