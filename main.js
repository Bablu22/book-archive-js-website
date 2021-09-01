const inputFeild = document.getElementById('search-feild');
const button = document.getElementById('button');


// search button click
button.addEventListener('click', searchBook = () => {
    const searchText = inputFeild.value;
    inputFeild.value = ''

    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showBook(data))

})

const showBook = (books) => {
    const bookContainer = document.getElementById('book-container');
    bookContainer.textContent = '';
    const book = books.docs;
    const numFound = books.numFound;
    // console.log(books)
    book.forEach(element => {
        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = `
        Search result found: <span>${book.length}</span> of <span>${numFound}</span>
        
        `
        const imageUrl = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
             <img src="${imageUrl}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">${element.title}</h5>
                   <p class="card-text">Author Name: ${element.author_name}</p>
                   <p class="card-text">First Publish: ${element.first_publish_year}</p>
                 </div>
            </div>
        
        `
        bookContainer.appendChild(div);
        




    });

}

const displayImage = () => {
    const url = `https://covers.openlibrary.org/b/id/%7Bcover_i%7D-M.jpg`
}



