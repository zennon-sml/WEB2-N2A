const multer = require('multer');
const path = require('path');
const Lab = require('../models/lab');
const PDFDocument = require('pdfkit')
const fs = require('fs')

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

exports.generateReport = async (req, res) => {
    try {
        const labs = await Lab.find()

        const doc = new PDFDocument()
        const filePath = path.join(__dirname, '..', 'var/task/uploads', 'relatorio.pdf')
        
        const writeStream = fs.createWriteStream(filePath)
        doc.pipe(writeStream)
        
        doc.fontSize(20).text('Relatorios dos Laboratórios', { align: 'center' });
        doc.moveDown();
    
        // Adicionar cada laboratório no relatório
        labs.forEach((lab) => {
          doc.fontSize(14).text(`Nome: ${lab.name}`);
          doc.text(`Descrição: ${lab.description}`);
          doc.text(`Capacidade: ${lab.capacity}`);
          if (lab.picture) {
            const imagePath = path.join(__dirname, '..', lab.picture);
            if (fs.existsSync(imagePath)) {
              doc.image(imagePath, { width: 150, height: 100 });
            }
          }
          doc.moveDown();
          doc.moveDown();
          doc.moveDown();
          doc.moveDown();
          doc.moveDown();
          doc.moveDown();
          doc.moveDown();
          doc.moveDown();
          doc.moveDown();
        });
    
        // Finalizar o documento
        doc.end();

        writeStream.on('finish', () => {
            res.download(filePath, 'relatorio_laboratorios.pdf', (err) => {
              if (err) {
                console.error(err);
                res.status(500).json({ message: 'Erro ao baixar arquivo.' });
              } else {
                // Remover o arquivo temporário após o download
                fs.unlinkSync(filePath);
              }
            });
          });
    } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao gerar arquivo.', error });
    }
}
