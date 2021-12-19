const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    const uniquePREFIX = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniquePREFIX + '-' + file.originalname)
  },
})
function fileFilter(req, file, cb) {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limit: {
    filesize: 1024 * 1024 * 5,
  },
})
