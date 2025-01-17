const multer = require('multer');
const path = require('path');
const Lab = require('../models/lab');

// Configurar armazenamento para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single('picture'); // Middleware de upload

exports.createLab = async (req, res) => {
  const { name, description, capacity } = req.body;
  const picture = req.file?.path;

  if (!name || !description || !capacity || !picture) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const lab = new Lab ({ name, description, capacity, picture });
    await lab.save();
    res.status(201).json({ message: 'Laboratório criado com sucesso', lab });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar laboratório', error });
  }
};
