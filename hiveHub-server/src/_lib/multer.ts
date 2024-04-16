import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/posts')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const fileFilter = (req: any, file: any, callback: any) => {


  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video'))
    callback(null, true);
  else
    callback(null, false);

}

export const uploadSingleFile = (req: any, res: any, next: any) => {

  try {



    let type: string = ''
    if (req.params.type === 'image')
      type = 'image'
    else if (req.params.type === 'video')
      type = 'video'

    const upload = multer({
      storage: storage,
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: fileFilter
    }).single(type);

    upload(req, res, (err: any) => {
      if (err) {

        throw new Error(err)
      }




      next()
    })


  } catch (error: any) {
    console.log(error.message);

    // res.json({ status: 'failed', message: error.message })
  }
}






export const upload = multer({ storage: storage });

