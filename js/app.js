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
    phones.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card p-3 w-75 shadow bg-light mx-auto rounded py-2 h-100">
                <img src="${phone.image}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${phone.phone_name}</h5>
                    <p class="card-text text-center">Brand: ${phone.brand}</p>
                    <button type="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success w-50 ms-5 mx-auto">Details</button>
                </div>
            </div>
       `
        phoneContainer.appendChild(div);
    })

}

const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-50 py-3 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${phone.name}</h5>
            <p class="card-text text-center">Brand: ${phone.brand}</p>
            <p class="card-text text-center">Relase: ${phone.releaseDate}</p>
            
            <p class="card-text text-center">Features:</p>
            <p class="card-text text-center">chipSet: ${phone.mainFeatures.chipSet}</p>
            <p class="card-text text-center">displaySize: ${phone.mainFeatures.displaySize}</p>
            <p class="card-text text-center">memory: ${phone.mainFeatures.memory}</p>
        </div>
    `;
    phoneDetails.appendChild(div);
}