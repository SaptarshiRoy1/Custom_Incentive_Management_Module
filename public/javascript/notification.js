
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'saptarshiroy43@gmail.com', // Your mail adress
//         pass: 'irxs epst zqrp qkkw' // Your email password (make sure to use app-specific password if using Gmail)
//     }
// });

// // Function to send performance notification emails to employees
// function sendPerformanceNotification(employeeEmail, performanceMetrics, incentiveDetails) {
//     // Email content
//     const mailOptions = {
//         from: 'saptarshiroy43@gmail.com', // Your email address
//         to: employeeEmail,
//         subject: 'Performance and Incentive Details',
//         html: `
//             <p>Dear Employee,</p>
//             // <p>Here are your performance metrics:</p>
//             // <ul>
//             //     <li>Sales: ${performanceMetrics.sales}</li>
//             //     <li>Revenue Generated: ${performanceMetrics.revenue}</li>
//             //</ul>
//             <p>Your incentive details:</p>
//             <ul>
//                 <li>Incentive Percentage: ${incentiveDetails.percentage * 100}%</li>
//                 <li>Holiday: $${incentiveDetails.bonus}</li>
//             </ul>
//             <p>Thank you!</p>
//         `
//     };

//     // Send email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// }

// Example usage:
// sendPerformanceNotification('employee@example.com', { sales: 100, revenue: 5000 }, { percentage: 0.03, bonus: 500 });













// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('holidayForm');
//     const packageList = document.getElementById('packageList');

//     // Function to fetch and display all holiday items
//     function fetchAndDisplayHolidayItems() {
//         fetch('/holidayroute') // Replace '/get-holidays' with your actual endpoint
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // Loop through the fetched data and create HTML elements for each holiday item
//                 data.forEach(holiday => {
//                     const packageItem = document.createElement('div');
//                     packageItem.classList.add('package-item');
//                     packageItem.innerHTML = `
//                         <h3>${holiday.holidayName}</h3>
//                         <p><strong>Duration:</strong> ${holiday.duration} Nights</p>
//                         <p><strong>Destination:</strong> ${holiday.destination}</p>
//                         <p><strong>Location:</strong> ${holiday.location}</p>
//                         <p><strong>Amenities:</strong></p>
//                         <p>${holiday.amenities}</p>
//                         <button class="delete-btn">Delete</button>
//                     `;
//                     packageList.appendChild(packageItem);
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching holiday items:', error);
//             });
//     }

//     // Call the function to fetch and display holiday items when the page loads
//     fetchAndDisplayHolidayItems();

//     // Add event listener for form submission
//     form.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const holidayName = document.getElementById('holidayName').value;
//         const duration = document.getElementById('duration').value;
//         const destination = document.getElementById('destination').value;
//         const location = document.getElementById('location').value;
//         const amenities = document.getElementById('amenities').value;

//         // ... Code to create HTML element for new holiday item and append it to packageList ...

//         // Reset form fields
//         form.reset();

//         // Send data to the server
//         const formData = {
//             holidayName,
//             duration,
//             destination,
//             location,
//             amenities
//         };

//         fetch('/upload', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Upload successful:', data);
//             // After successfully uploading, fetch and display holiday items again to update the list
//             fetchAndDisplayHolidayItems();
//         })
//         .catch(error => {
//             console.error('Error uploading data:', error);
//         });
//     });

//     // Event delegation for delete button clicks
//     packageList.addEventListener('click', function (event) {
//         if (event.target.classList.contains('delete-btn')) {
//             event.target.parentElement.remove();
//         }
//     });
// });

