const router = require("express").Router();
let Coach = require("../models/Coach");


//http://localhost:9000/coach/add
router.route('/add').post((req,res)=>{
  
    const  name = req.body.name;
    const  age = Number(req.body.age);
    const  gender = req.body.gender;
    const  tp = Number(req.body.tp);
    const  level = req.body.level
    const  age_group = req.body.age_group;
    const  description = req.body.description

    const newCoach = new Coach({

        name,
        age,
        gender,
        tp,
        level,
        age_group,
        description
 
    })

    newCoach.save().then(()=>{
        res.json("Coach Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//htttp:localhost:9000/coach/

router.route("/").get((req,res)=>{
     
  
    Coach.find().then((coaches)=>{
        res.status(200).json({
            coaches
        })

    }).catch((err)=>{
        console.log(err)
    })
})

//http://localhost:9000/coach/update/id

router.route("/update/:id").put(async(req,res) => {
  
    let coachId = req.params.id;
    const {name,age,gender,tp,level,age_group,description} = req.body;

    const updateCoach = {
        name,
        age,
        gender,
        tp,
        level,
        age_group,
        description

    }

    const update = await Coach.findByIdAndUpdate(coachId,updateCoach)
    .then(()=>{
        res.status(200).json({status:"Coach updated"} )
    }).catch((err) =>{
        console.log(err);
        res.status(500).json({status: "Error with updating data"});

    })



//http://localhost:9000/coach/delete/id
router.route("/delete/:id").delete(async (req,res) =>{
    let coachId = req.params.id;
    await Coach.findByIdAndDelete(coachId)
    .then(() => {
        res.status(200).json({
            success: true,
            status:"coach delete"
        }); 
    }).catch((err) => {
        console.log(err.message);
        res.status(500).json({status: "Error with delete coach",error:err.message});

    })
}) 

//http://localhost:9000/coach/get/id

router.route("/get/:id").get(async (req,res) => {
    let coachId = req.params.id;
    const coach = await Coach.findById(coachId)
    .then((coach)=>{
        res.status(200).json({status: "coach fetched",coach})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get coach", error: err.message});

    })
       
    
})
})


module.exports = router;