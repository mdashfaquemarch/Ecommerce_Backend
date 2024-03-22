import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
       const id = uuid();
       const extName = file.originalname.split(".").pop();
       const filename = `${id}.${extName}`
      cb(null, filename)
    }
  })
  
export  const upload = multer({  storage })