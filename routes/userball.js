const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Userball = require("../model/userball");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    console.log(req.body)
    const result = await cloudinary.uploader.upload(req.file.path,
      {
        upload_preset: 'casenetwork',
    }
      );

    // Create new user
    let user = new Userball({
      name: req.body.name,
      address:req.body.address,
      addresswork:req.body.addresswork,
      room:req.body.room,
      telephone:req.body.telephone,
      birthday:req.body.birthday,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await Userball.find().sort('room');
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await Userball.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id,
      {
        upload_preset: 'casenetwork',
    }
      
      );
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

// router.get("/filter", async (req, res) => {


//   console.log(req.query.keyword)


//   var name="สม";
//   const users =  User.find({name: { $regex: '.*' + name + '.*' } }).limit(5);
//       // {"firstname": {$regex : `^${req.body.firstname}.*` , $options: 'si' }}

//   // const users = await User.find({"name": {$regex : `^${req.body.keyword}.*` , $options: 'si' }})
//   res.status(200).json(users);
//   console.log(users)
// });


router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let user = await Userball.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id,
      {
        upload_preset: 'casenetwork',
    }
      );
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path,
        {
          upload_preset: 'casenetwork',
      });
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
      address:req.body.address,
      addresswork:req.body.addresswork,
      birthday:req.body.birthday,
      room:req.body.room,
      telephone:req.body.telephone,

    };
    user = await Userball.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await Userball.findById(req.params.id);
    console.log(user)
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
