
// fetch api

const loadNews = async() => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try{
        const res = await fetch(url);
        const data = await res.json();
        showCategories(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
}

// show categories

const showCategories = categories => {
    for(const category of categories){

        const newsNavContainer = document.getElementById('news-nav-container');
        const newsDiv = document.createElement('ul');
        newsDiv.innerHTML = `
        <button onclick="categoryOnclick(${category.category_id})" class="btn btn-primary nav-link text-secondary" href="#">${category.category_name}</button>
        `;
        newsNavContainer.appendChild(newsDiv);
    }
}

// category onclick

const categoryOnclick = category_id => {
    toggleSpinner(true);
    loadNewsCategory(category_id);
}

const loadNewsCategory = async(category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        newsDisplay(data.data);
    }
    catch(error){
        console.log(error);
    }
}

let newsDisplay = newsArray => {
    const newsDisplayDiv = document.getElementById('news-display');
    newsDisplayDiv.innerHTML=``;

    // update number of items
    showNewsItemNumber(newsArray);


    // sort the array
    newsArray.sort((a,b) => b.total_view - a.total_view);
    console.log(newsArray[0].total_view);
    
    //for(const news of newsArray){
    newsArray.forEach(news => {
        const newsCard = document.createElement('card');
        newsCard.classList.add('p-2');
        newsCard.innerHTML=`
        <div class="row bg-light bg-gradient rounded p-4">
            <div class="col-md-4">
                  <img src="${news.image_url}" class="img-fluid w-100 rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body d-grid gap-4">
                    <h5 class="card-title"><strong>${news.title}</strong> </h5>
                    <p class="card-text text-truncate d-block">${news.details}</p>

                    <div class="d-flex justify-content-between align-items-center">
                        <div id="author" class="d-flex gap-2 align-items-center">
                            <div>
                                <img style="height:80px;" class="img-fluid rounded-circle" src="${news.author.img}">
                            </div>
                            <div>
                                <h6>${news.author.name ? news.author.name: 'Not available'}</h6>
                                <p>${news.author.published_date ? news.author.published_date: 'Not available'}</p>
                            </div>
                        </div>
                        <div>
                            <div class="text-center" id="total-views">
                            <img src="./images/totalviews.png">
                            <h6>${news.total_view ? news.total_view: 'No information on'} views</h6>
                            </div>
                        </div>
                        <div>
                            <button onclick="updateModal('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        `;
        newsDisplayDiv.appendChild(newsCard);
    })
    toggleSpinner(false);
}

// news
// https://openapi.programming-hero.com/api/news/category/{category_id}

// showdetails function

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// news item number function

const showNewsItemNumber = (newsArray) => {
    const newsNumber = document.getElementById('news-item-number');

    newsNumber.innerHTML = `
    <h5>${newsArray.length} items found</h5>
    `;
    
}

// update modal
const updateModal = async(newsId) => {
        console.log(newsId);
        url = `https://openapi.programming-hero.com/api/news/${newsId}`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            displayModal(data.data);
        }
        catch(error){
            console.log(error);
        }
    }

// displayModal
const displayModal = news => {
    console.log(news);
    const modalTitle = document.getElementById('exampleModalLabel');
    const modalText = document.getElementById('modal-text');
    modalTitle.innerHTML = `${news[0].title}`;
    modalText.innerHTML = `
    ${news[0].details}
    <br>
    <br>

    <img style="height:80px;" class="img-fluid rounded-circle" src="${news[0].author.img}">

    <p>Author: <strong> ${news[0].author.name ? news[0].author.name: 'No information found'} </strong> </p>

    <p>Published Date: ${news[0].author.published_date ? news[0].author.published_date: 'No information found'}</p>

    <p>Total Views: ${news[0].total_view ? news[0].total_view: 'No information found'}</p>
    `;
}


// home selected
const home = () => {
    const home = document.getElementById('home');
    const blogs = document.getElementById('blogs');
    home.disabled = true;
    blogs.disabled = false;

    // click on the category
    const newsNumber = document.getElementById('news-item-number');
    newsNumber.innerHTML = `
    <h5>Click on the category to read news</h5>
    `;

    // hide blogs
    const loaderSection = document.getElementById('blogs-section');
    loaderSection.classList.add('d-none');
    loadNews();
}

// blogs

const blogs = () => {
    const home = document.getElementById('home');
    const blogs = document.getElementById('blogs');
    home.disabled = false;
    blogs.disabled = true;
    blogsSection = document.getElementById('blogs-section');

    // clear news section
    const newsNavContainer = document.getElementById('news-nav-container');
    newsNavContainer.innerHTML = ``;

    const newsDisplayDiv = document.getElementById('news-display');
    newsDisplayDiv.innerHTML=``;

    // number of blogs
    const newsNumber = document.getElementById('news-item-number');
    newsNumber.innerHTML = `
    <h5>4 items found</h5>
    `;

    // display blogs
    const loaderSection = document.getElementById('blogs-section');
    loaderSection.classList.remove('d-none');

}

// testing
home();