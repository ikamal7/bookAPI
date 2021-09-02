// error-message
document.getElementById('error-message').style.display = 'none';
// Display Spinner
document.getElementById('spinner').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
   // error-message call
    if (searchText === '') {
        displayError()

    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Search Result
        document.getElementById('search-result').textContent = '';
        // api url
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchBook(data))
    }
}

const displaySearchBook = book => {
    //search-result input text
    const searchResult = document.getElementById('search-result');
    document.getElementById('book-numbers').textContent = '';
    searchResult.textContent = '';
    const bookList = book.docs;
     // error-message call
    if (bookList === null || bookList.length <= 0) {
        displayError()
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'none';
        // error-message
        document.getElementById('error-message').style.display = 'none';
        //Book Found
        document.getElementById('book-numbers').innerText = `Book Found ${bookList.length}`;
        // use forEach
        bookList.forEach(books => {
            // url cover image
            const url = `https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg`;
            const default_img = `images/default_book_cover.jpg`;
            const img_url = (books.cover_i !== undefined) ? url : default_img;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
                <img src="${img_url}" class="w-50 h-50 mx-auto" alt="image">
                <div class="card-body">
                    <h5 class="card-title">Books Name: ${books.title}</h5>
                    <p class="card-text">Author: ${books.author_name}</p>
                    <p class="card-text">First Publish: ${books.first_publish_year ? books.first_publish_year : "No publish"}</p>
                    <p class="card-text">Publisher: ${books.publisher ? books.publisher : 'No publisher'}</p>
                </div>
            `;
            searchResult.appendChild(div);
        });
    }
}
// error-message
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';
    document.getElementById('search-result').style.display = 'none';
}