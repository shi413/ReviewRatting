const multer = require('multer')

//storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let datetimestamp=Date.now()+Math.floor(Math.random())
        console.log(file)
      cb(null, datetimestamp+ file.originalname)
    }
  })
  const upload = multer({storage:storage})

  module.exports={upload}