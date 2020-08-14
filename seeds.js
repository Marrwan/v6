var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [
  {
    name: "Cloud's Rest",
    image:
      "https://cdn.hiconsumption.com/wp-content/uploads/2014/08/Al-Aqsa-Mosque-Jerusalem.jpg",
    description: "Sharh Aqeedah Wasitiyah Li Shaikh al-Islam Ahmad bin ...salafibookstore.com › ... › Aqidah Arabic Language Shaikh Saalih al-Fawzaan | Dar al-Miraath Publications. This book is an Explanation of Al-Aqidah Al-Wasitiyyah by the virtuous Sheikh Saalih al-Fawzaan (may ...£10.00 - ‎In stock",
  },
  {
    name: "Moon's Rest",
    image:
      "https://cdn.hiconsumption.com/wp-content/uploads/2014/08/Al-Aqsa-Mosque-Jerusalem.jpg",
    description: "Sharh Aqeedah Wasitiyah Li Shaikh al-Islam Ahmad bin ...salafibookstore.com › ... › Aqidah Arabic Language Shaikh Saalih al-Fawzaan | Dar al-Miraath Publications. This book is an Explanation of Al-Aqidah Al-Wasitiyyah by the virtuous Sheikh Saalih al-Fawzaan (may ...£10.00 - ‎In stock",
    
  },
  {
    name: "Sun's Rest",
    image:
      "https://cdn.hiconsumption.com/wp-content/uploads/2014/08/Al-Aqsa-Mosque-Jerusalem.jpg",
    description: "Sharh Aqeedah Wasitiyah Li Shaikh al-Islam Ahmad bin ...salafibookstore.com › ... › Aqidah Arabic Language Shaikh Saalih al-Fawzaan | Dar al-Miraath Publications. This book is an Explanation of Al-Aqidah Al-Wasitiyyah by the virtuous Sheikh Saalih al-Fawzaan (may ...£10.00 - ‎In stock",

  },
];
function seedDB() {
  // Remove Campgrounds
  Campground.remove({}, (err) => {
    console.log("Removed");
    // Add a few campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added New Campground");
        //   create a comment
        Comment.create({
            text: "This is great",
            author : "Abdulbasit"
        },(err,comment)=>{
            if(err){
                console.log(err);
            }else{
            campground.comments.push(comment)
            campground.save();
            console.log("Created new comment");
        }}
        )
        }
      });
    });
  });
}

module.exports = seedDB;
