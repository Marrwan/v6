// I want to recreate this and set it to pictures of mosques instead of campground

var express    = require('express');
const passport = require('passport');
    app        = express();
    bodyParser = require('body-parser');
    mongoose   = require('mongoose');
    localStrategy = require('passport-local')
    Campground = require("./models/campground")
    User       = require('./models/user');
    seedDB     = require("./seeds");
    Comment    = require("./models/comment");
seedDB();
mongoose.connect('mongodb://localhost/yelp_camp_v6'  ,{useUnifiedTopology: true, useNewUrlParser: true});
// I passed everything inside the {} in order to prevent some errors
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Abdulbasit is a Muslim',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.serializeUser());

app.get('/', (req,res) => {
    res.render('landing')
});
// INDEX- SHOW ALL CAMPGROUNDS
app.get('/campgrounds', (req,res) => {
    Campground.find({}, (err, allcampgrounds) => {
          if(err){
              console.log(err)
          }else{
            res.render('campgrounds/campgrounds', {varCamp: allcampgrounds})
          }
    });
});
// CREATE- Add new to database
app.post('/campgrounds', (req,res) => {
   var name = req.body.name;
   var image = req.body.url;
   var desc = req.body.description;
   var newCamp = {name : name, image : image, description:desc};
//    create a new campground and save to database
Campground.create(newCamp, (err, newlycreated) =>{
    if(err){
        console.log(err);
        
    }else{
        res.redirect("/campgrounds")
    }
})
  
    
});
// NEW - Show form to add new
app.get('/campgrounds/new', (req,res) => {
  res.render('campgrounds/new')
});
// SHOW - to Show info about a particular Item(camp)
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id)
      .populate("comments")
      .exec(function(err, foundCampground){
        if (err) {
          console.log(err);
        } else {
          res.render("campgrounds/show", { campground: foundCampground });
        }
      });
  });

// COMMENTS ROUTES

app.get("/campgrounds/:id/comments/new",(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if(err){
      console.log(err)
    }else{
      res.render("comments/new", {campground:campground})
    }
  })
 ;
});
app.post("/campgrounds/:id/comments",(req,res)=>{
  // lookup campground using ID
  Campground.findById(req.params.id,(err,campground)=>{
    if(err){
      console.log(err);
      redirect("/campgrounds")
    }else{
      Comment.create(req.body.comment,(err,comment)=>{
        if(err){
          console.log(err);
        }else{
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  })
  // Create new Comment
  // Connect new comment to campground
// redirect campground show page
});

// =============
// AUTH ROUTES
// =============

// Show register form
app.get('/register',(req,res)=>{
  res.render('register')
});

// Handle sign up logic
app.post('/register',(req,res)=>{
  req.body.username
  req.body.password
 var newUser = new User({username: req.body.username});
 User.register(newUser, req.body.password, function(err,user){
   if(err){
     console.log(err);
     res.render('register');
   }
   passport.authenticate('local')(req,res,()=>{
     res.redirect('/campgrounds')
   });
 });
});

// login form
app.get('/login',(req,res)=>{
  res.render('login')
});

// Handle login logic
app.post('/login',passport.authenticate('local',{
  successRedirect : "/campgrounds",
  failureRedirect: "/login"
}),(req,res)=>{

});
app.listen('5000', () =>{
    console.log("Yelp server has started!");
});