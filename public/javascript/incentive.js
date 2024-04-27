
async function calculateIncentive() {
    const salesInput = document.getElementById('salesInput').value;
    let incentive = 0;

    if (salesInput >= 10000 && salesInput < 20000) {
        incentive = salesInput * 0.015;                      // 1.5% incentive for 10,000 sales
    } else if (salesInput >= 20000 && salesInput < 30000) {
        incentive = salesInput * 0.03;                         // 3% incentive for 20,000 sales
    } else if (salesInput >= 30000 && salesInput < 50000) {
        incentive = salesInput * 0.035 + 1000; // 3.5% incentive + $1000 bonus for 30,000 sales
    } else if (salesInput >= 50000) {
        incentive = salesInput * 0.05;               // 5% incentive for more than 50,000 sales
    }

    const resultDiv = document.getElementById('incentiveResult');
    resultDiv.textContent = `Your incentive is: $${incentive.toFixed(2)}`;

    const holidayDiv = document.getElementById('holidayResult')
    if(salesInput >= 50000){
    holidayDiv.innerHTML = 'Congratulations! You have a holiday trip aditionally'
    }else{holidayDiv.innerHTML=""}


    const packageDiv = document.getElementById('holidaypackage')
    if (salesInput >= 150000) {
        packageDiv.innerHTML = "Platinum Holiday Package";
    } else if (salesInput >= 120000) {
        packageDiv.innerHTML = "Gold Holiday Package";
    } else if (salesInput >= 80000) {
        packageDiv.innerHTML = "Silver Holiday Package";
    } else if (salesInput >= 50000) {
        packageDiv.innerHTML = "Bronze Holiday Package";
    } else{
        packageDiv.innerHTML = "";
    }
}








// async function calculateIncentive() {
//     const salesInput = document.getElementById('salesInput').value;
//     let incentive = 0;
//     let st = 0;

//     if (salesInput >= 10000 && salesInput < 20000) {
//         incentive = salesInput * 0.015; // 1.5% incentive for 10,000 sales
//     } else if (salesInput >= 20000 && salesInput < 30000) {
//         incentive = salesInput * 0.03; // 3% incentive for 20,000 sales
//     } else if (salesInput >= 30000 && salesInput < 50000) {
//         incentive = salesInput * 0.035 + 1000; // 3.5% incentive + $1000 bonus for 30,000 sales
//     } else if (salesInput >= 50000) {
//         incentive = salesInput * 0.05; // 5% incentive for more than 50,000 sales
//     }

//     const resultDiv = document.getElementById('incentiveResult');
//     str = `Your incentive is: $${incentive.toFixed(2)}`
//     resultDiv.textContent = `Your incentive is: $${incentive.toFixed(2)}`;

//     if (salesInput >= 50000) {
//         const holidayDiv = document.getElementById('holidayResult');
//         holidayDiv.innerHTML = 'Congratulations! You have a holiday trip additionally';
//     }

//     const packageDiv = document.getElementById('holidaypackage');
//     if (salesInput >= 150000) {
//         packageDiv.innerHTML = "Platinum Holiday Package";
//     } else if (salesInput >= 120000) {
//         packageDiv.innerHTML = "Gold Holiday Package";
//     } else if (salesInput >= 80000) {
//         packageDiv.innerHTML = "Silver Holiday Package";
//     } else if (salesInput >= 50000) {
//         packageDiv.innerHTML = "Bronze Holiday Package";
//     } 

//     // Assuming you have a function to get the logged-in user
//     const user = await getCurrentUser();

//     // Now you can push the incentive value to the user's incentives array
//     user.incentive.push(st);

//     // Save the updated user data
//     await user.save();
// }

// // Example function to get the logged-in user
// async function getCurrentUser() {
//     return await userModel.findOne({ username: req.session.passport.user });
// }
