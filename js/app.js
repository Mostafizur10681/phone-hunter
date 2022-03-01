const loadSearchPhone = () => {
    const searchFeild = document.getElementById('search-field');
    const searchFeildValue = searchFeild.value;
    // clear sear field
    searchFeild.value = '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    // search-box check
    if (searchFeildValue == '') {
        alert('Please write something on search field & try again later!!')
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchPhone(data.data))
    }
}

const displaySearchPhone = phones => {
    const phoneContainer = document.getElementById('search-result');
    // clear before result
    phoneContainer.textContent = '';
    console.log(phones);
    // check phone 
    if (phones.length == 0) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
    }
    else {
        // loop & make card
        phones.slice(0, 20).forEach(phone => {
            const errorMessage = document.getElementById('error-message');
            errorMessage.style.display = 'none';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card p-3 w-100 shadow bg-light mx-auto rounded py-2 h-100">
                    <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${phone.phone_name}</h5>
                        <p class="card-text text-center">Brand: ${phone.brand}</p>
                        <button type="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success w-75 ms-4 mx-auto">Details</button>
                    </div>
                </div>
           `
            phoneContainer.appendChild(div);
        })
    }


}

// load data
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}
// Details card make
const displayPhoneDetails = phone => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-50 py-3 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${phone.name}</h5>
            <p class="card-text text-center">Brand: ${phone.brand}</p>
            <p class="card-text text-center">Relase: ${phone.releaseDate ? phone.releaseDate : ' Not found'}</p>      
            <p class="card-text text-center">Features:</p>
            <p class="card-text text-center">ChipSet: ${phone.mainFeatures.chipSet}</p>
            <p class="card-text text-center">DisplaySize: ${phone.mainFeatures.displaySize}</p>
            <p class="card-text text-center">Memory: ${phone.mainFeatures.memory}</p>
            <p class="card-text text-center">Sensor: ${phone.mainFeatures.sensors}</p>
            <p class="card-text text-center">WLAN: ${phone.others != undefined ? phone.others.WLAN : 'not found'}</p>
            <p class="card-text text-center">Bluetooth: ${phone.others != undefined ? phone.others.Bluetooth : 'Not found'}</p>
            <p class="card-text text-center">GPS: ${phone.others != undefined ? phone.others.GPS : 'Not found'}</p>
            <p class="card-text text-center">NFC: ${phone.others != undefined ? phone.others.NFC : 'Not found'}</p>
            <p class="card-text text-center">Radio: ${phone.others != undefined ? phone.others.Radio : 'Not found'}</p>
            <p class="card-text text-center">USB: ${phone.others != undefined ? phone.others.USB : 'Not found'}</p>
        </div>
    `;
    phoneDetails.appendChild(div);
}