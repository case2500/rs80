const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Userpay = require("../model/userpay");
const dayjs = require('dayjs')

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
    let user = new Userpay({
      name: req.body.name,
      price: req.body.price,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
      status: 1
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});


router.post("/cash", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    console.log(req.body)
    // const result = await cloudinary.uploader.upload(req.file.path,
    //   {
    //     upload_preset: 'casenetwork',
    //   }
    // );
    // Create new user
    let user = new Userpay({
      name: req.body.name,
      price: req.body.price,
      avatar: 'https://res.cloudinary.com/casenetwork/image/upload/v1652855738/casenetwork/images_42_cxsvd0.jpg',
      cloudinary_id: "",
      status: 0
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});


router.get("/", async (req, res) => {
  const d = new Date();
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  // console.log(`${year}-${month}-${day}`)
  // const test = (`${year}-${month}-${day}`)
  // const testday = (dayjs(test).locale('th').add(543, 'year').format('DD/MM/YYYY'))

  try {
    var mysort = { updatedAt : -1,status: - 1 };
    let user = await Userpay.find().sort(mysort);

    usermap = user.map(doc => {
      return {
        _id: doc._id,
        name: doc.name,
        price: doc.price,
        avatar: doc.avatar,
        cloudinary_id: doc.cloudinary_id,
        datepay: dayjs(doc.datepay).locale('th').add(543, 'year').format('DD/MM/YYYY'),
        createdAt: dayjs(doc.createdAt).locale('th').add(543, 'year').format('DD/MM/YYYY'),
        updatedAt:  dayjs(doc.updatedAt).locale('th').add(543, 'year').format('DD/MM/YYYY'),
  status: doc.status
      }
    })
  console.log(usermap)
    // console.log(testday)

    res.json(usermap);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await Userpay.findById(req.params.id);
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


router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let user = await Userpay.findById(req.params.id);
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
      address: req.body.address,
      addresswork: req.body.addresswork,
      birthday: req.body.birthday,
      room: req.body.room,
      telephone: req.body.telephone,

    };
    user = await Userpay.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await Userpay.findById(req.params.id);
    console.log(user)
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
