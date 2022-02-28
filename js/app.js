const loadSearchPhone = () => {
    const searchFeild = document.getElementById('search-field').value;
    // console.log(searchFeild);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFeild}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchPhone(data.data))
}

const displaySearchPhone = phones => {
    const phoneContainer = document.getElementById('search-result');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card p-3 w-75 shadow bg-light mx-auto rounded py-2 h-100">
                <img src="${phone.image}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${phone.phone_name}</h5>
                    <p class="card-text text-center">Brand: ${phone.brand}</p>
                    <button type="button" class="btn btn-success ms-5 mx-auto">Details</button>
                </div>
               
            </div>
       `
        phoneContainer.appendChild(div);
    })

}