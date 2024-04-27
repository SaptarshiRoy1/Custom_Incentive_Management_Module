
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('holidayForm');
    const packageList = document.getElementById('packageList');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const holidayName = document.getElementById('holidayName').value;
        const duration = document.getElementById('duration').value;
        const destination = document.getElementById('destination').value;
        const location = document.getElementById('location').value;
        const amenities = document.getElementById('amenities').value;

        const packageItem = document.createElement('div');
        packageItem.classList.add('Addedcards');
        packageItem.innerHTML = `
            <h3>${holidayName}</h3>
            <p><strong>Duration:</strong> ${duration} Nights</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Amenities:</strong></p>
            <p>${amenities}</p>
            <button id="AddedCardDeleteBtn" class="delete-btn">Delete</button>
        `;

        packageList.appendChild(packageItem);

        form.reset();

        // Send data to the server
        const formData = {
            holidayName,
            duration,
            destination,
            location,
            amenities
        };

        fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Upload successful:', data);
        })
        .catch(error => {
            console.error('Error uploading data:', error);
        });
    });

    packageList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
        }
    });
});
