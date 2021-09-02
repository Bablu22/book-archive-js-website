const inputFeild = document.getElementById('search-feild');
const button = document.getElementById('button');
const searchResult = document.getElementById('search-result');
const errorText = document.getElementById('error');
const bookContainer = document.getElementById('book-container');


// search button click
button.addEventListener('click', searchBook = () => {
    const searchText = inputFeild.value;
    inputFeild.value = ''
    if (searchText === '') {
        errorText.innerText = 'Input Feild can not be empty'
        errorText.classList.remove('d-none');
        searchResult.style.display = "none";
        bookContainer.textContent=''
        return
    }

    const url = `https://openlibrary.org/search.json?q=${searchText}`
    spinner.classList.remove("d-none");
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            // Setting a timer of 1.5s, before removing the spinnner, and showing data
            setTimeout(() => {
                spinner.classList.add("d-none");
                showBook(data);
            }, 1500);
        })
})

const showBook = (books) => {
    bookContainer.textContent = '';
    const book = books.docs;
    const numFound = books.numFound;

    if (numFound === 0) {
        errorText.classList.remove('d-none');
        errorText.innerText = 'search result not found'
        searchResult.style.display = "none";
        return
    }
    else {
        errorText.classList.add('d-none')
    }
   
    book.forEach(element => {
        searchResult.style.display = "block";
        searchResult.innerHTML = `
        Search result found: <span>${book.length}</span> of <span>${numFound}</span>
        
        `
        // Handaling undefined
        if (!element.author_name) {
            element.author_name='sorry! Author name not found'
        }
        if (!element.first_publish_year) {
            element.first_publish_year='sorry! publish year not found'
        }
        if (!element.publisher) {
            element.publisher='sorry! publisher not found'
        }
        // show book
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
                   <p class="card-text">Publisher: ${element.publisher}</p>
                 </div>
            </div>
        
        `
        bookContainer.appendChild(div);
    });
}
