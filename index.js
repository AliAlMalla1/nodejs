const mongoose =  require('mongoose');
const carModel = require('./carModel.js')

require('dotenv').config() //hek st3mlna libraries t3it dotenv krml  nhafiz local host w db name wel host bi file hidden li huwe samayne . env w hayda lfile ma mntl3o github bidal m5fe

const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;


const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;/// hon hatyna asma2 l variable li 3rfnehon bi .env la ydalom m5fiyin

mongoose.connect(uri); //3mlna connect 3al url  li jbne mn compus
const db = mongoose.connection; // 7atyna l connection ma3 databas bi variable db ta nst3mlo bi be2e lpages

db.once('open', async function(){ //hay l function 3mlneha krml bs tftah safha nruh nt2akad eza n3mal connection ma3 database aw la

    console.log("connected to database !"); //hon 3m ntba3 bel console eza meshe lhal

    //ex1  get id  and year of all cars that were produced prior to 2018

    const cars1 = await carModel.find(
      {
     year :{
       $lte:2018 //hay yaane where
     }
      },
      {
        _id:1,// yaane hole bde yehun ybayno
       year:1
      }

    );
       console.log(cars1);

       //ex2

       const cars2 = await carModel.find(
        {
       "location.city":"Winder",
     
        mileage  : {
          $lte : 30000
        },
        price : {
          $lte : 20000
        },
      },

       {
        maker:1,
        model:1,
        },

        {
          limit:5
        }
  
      );

     // console.log(cars2);

     //ex3

     const cars3 = await carModel.find(
       {
         "details. driveTrainDescription":"AWD",
           "details.exteriorColor":{
             $ne:"White"
           }
     },
     
     {
       _id:1,
       "details.exteriorColor":1,
       maker:1,
       model:1,
      
     }
     
     
     
     );
   //  console.log(cars3);

   //ex4

   const cars4 = await carModel.find(
     {
            body_type:"Sedan"
     }
     
     
     ).count();
     //console.log(cars4);




     //ex5

     const cars5 = await  carModel.find(
       {
              tags :
              {$elemMatch:{name:"Accident Free"}}
     },

     {
       "tags.name":1,
       _id:1
     }
     
     
     ).count();
   //  console.log(cars5);


    //  ex6 

      const cars6 = await carModel.find(
        {

      },

      {
        maker:1,
        model:1
        
      }
      )

//insert query

      const insertCar = await carModel.create({
        "maker": "Toyota",
        "model": "Camry",
        "price": 20590,
        "year": 2017,
        "body_type": "Sedan",
        "sale_status": "Available",
        "mileage": 63546,
        "details":
{
"doors": 4,
"interiorColor": "Black Fabric",
"exteriorColor": "Blue",
"driveTrainDescription": "FWD",
"fuelDescription": "Gas",
"engineDescription": "4-Cyl, 2.5 Liter",
"transmission": "Auto, 6-Spd SeqShft"
},
"location":
{
"address": "1123 Cantrell Sansom Rd",
"city": "Blue Mound",
"zip": "76131"
},
"tags":
[
{
"name": "Accident Free",
"description": "Like every Carvana vehicle, this vehicle hasnever been in a reported accident.",
}
],
      });

      // console.log(insertCar);



      // Update query

      const update1 = await carModel.updateMany(
        {
           "details.fuelDescription":"Gas" 
      },
      {
        $set : {"price":2000}
      } 
      );

   //console.log(update1);



       const update2 = await carModel.updateMany(
         {
           
          "maker":"Mercedes-Benz"
         },
         {
           $set : {"maker":"Mercedes Benz"}
         }
         
         );
        // console.log(update2);


        const findall = await carModel.find()
      //  console.log(findall)


      const findcar = await carModel.find(
        {
          maker:"Mercedes Benz"

        },
             


        {
          _id:0,
          maker:1
        }


        );


     //   console.log(findcar);  


     const update4 = await carModel.updateMany(
       {
         
            year:{
              $gte:2015
            },
        
         tag:{
         $push :{
        name : "Has Warranty",
        description : "2 years warranty"
         },
       },
      

      });

     // console.log(update4);

})