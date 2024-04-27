var express = require('express');
var router = express.Router();
var userModel=require("./users")
var holidayModel=require("./holidayroute")
const localStrategy = require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
router.use('/favicon.ico', express.static('../views/4.ico'));
// const upload = require("./multer")
// const upload = multer({dest: "uploads/"})

/* GET home page. */
// RENDER THE PAGES






//MANAGE THE ROUTES-----------

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/register', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  let errormassage =req.flash("error")
  console.log(errormassage)
  res.render('login',{errormassage});
});

router.get('/incentive', function(req, res, next) {
  res.render('incentive');
});

router.get('/holiday',isLoggedIn && isAdmin,async function(req, res, next) {
  let holidays = await holidayModel.find();
   res.render("holiday",{holidays});
});

router.get('/profile',isLoggedIn,async function(req, res, next) {

  var user1 = await userModel.findOne({
    username: req.session.passport.user
  })
  res.render("profile",{user1});
  
});







// MANAGE THE ROUTES AND USER LOGIN---------

router.post("/register", function(req,res){

  const { sales } = req.body.sales;
  const { incentive, holidayPackage } = calculateIncentive(req.body.sales);

  var userdata = new userModel({
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullname,
    sales: req.body.sales,
    role: req.body.role,
    incentive: incentive,
    holiday: holidayPackage,
  });

  userModel.register(userdata,req.body.password)
  .then(function (registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureFlash:true,
  failureRedirect:"/login",
}),function(){})

router.get("/logout",function (req,res,next) {
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect("/");
  });  
});







// FUNCTION TO CALCULATE INCENTIVE & HOLIDAYPACKAGE----------
function calculateIncentive(sales) {
  let incentive = 0;
  let holidayPackage = 'Not eligible';

  if (sales >= 10000 && sales < 20000) {
    incentive = sales * 0.015; 
} else if (sales >= 20000 && sales < 30000) {
    incentive = sales * 0.03; 
} else if (sales >= 30000 && sales < 50000) {
    incentive = sales * 0.035 + 1000;
} else if (sales >= 50000) {
    incentive = sales * 0.05; 
}

if (sales >= 150000) {
  holidayPackage = "Platinum Holiday Package";
} else if (sales >= 120000) {
  holidayPackage = "Gold Holiday Package";
} else if (sales >= 80000 ) {
  holidayPackage = "Silver Holiday Package";
} else if (sales >= 50000 ) {
  holidayPackage = "Bronze Holiday Package";
} 

  return { incentive, holidayPackage };
}








// CHECKING FUNCTIONS FOR LOGIN and ADMIN------------

function isLoggedIn(req,res,next) {
if(req.isAuthenticated()){
  return next()
}else{
  res.redirect("/login")
  // res.render('login')
}  
}

async function isAdmin(req,res,next) {
  if(isLoggedIn){
    var user1 = await userModel.findOne({
      username: req.session.passport.user
    });
  }
  

  if(user1.role == 'Administrator'){
    return next();
  }else if(isLoggedIn){
    res.send('<script>alert("This feature is available only for Administrators!"); window.location="/profile";</script>');
    res.render("profile");
    }
  }







//Upload & delete holiday in database---------

router.post("/upload",isLoggedIn,async (req,res,next)=>{

  // console.log(req.body);
  var holidaydata = await holidayModel.create({
    HolidayName: req.body.holidayName,
    Duration: req.body.duration,
    Destination: req.body.destination,
    Location: req.body.location,
    Amenities: req.body.amenities,
  });

  // Now link Loggedin-user && post using data-association
  //  var user1 = await userModel.findOne({username: req.session.passport.user});
  //  user1.posts.push(postdata._id)
  //  await user1.save();
  //  res.send("holidaydata");

    let holidays = await holidayModel.find();
   res.render("holiday",{holidays});
});

router.get('/delete/:id', async (req, res, next)=> {
  let holiday = await holidayModel.findOneAndDelete({_id: req.params.id});
  let holidays = await holidayModel.find();
   res.render("holiday",{holidays});
});









// SEND EMAIL ROUTE-----------------
router.get('/email',async (req,res)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saptarshiroy43@gmail.com',
    pass: 'irxs epst zqrp qkkw'
  }
});

    var user1 = await userModel.findOne({
      username: req.session.passport.user
    });

    const emailContent = `
    <p>Dear Employee,</p>
    <p>Here are your performance metrics:</p>
     <ul>
         <li>Sales: ${user1.sales}</li>
         <li>Revenue Generated: </li>
    </ul>
    <p>Your incentive details:</p>
    <ul>
        <li>Your Incentive : ${user1.incentive}$</li>
        <li>Holiday : ${user1.holiday}</li>
    </ul>
    <p>Thank you!</p>
    `;

var mailOptions = {
  from: 'saptarshiroy43@gmail.com',
  to: user1.email,
  subject: 'Performance and Incentive Details',
  html: emailContent,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
res.send('<script>alert("Mail has been sent successfully!"); window.location="/profile";</script>');
res.render("profile");
})


module.exports = router;
