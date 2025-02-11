const Temp = require("../models/temp")

exports.newTemp= async (req, res) => {
    const temp = req.params.temp

    try {
        const newTemp = new Temp({ temp })
        await newTemp.save()
        res.status(201).json({ message: 'Temperatura cadastrada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar Temperatura', error });
    }
}

exports.getTemp = async (req, res) => {
    try {
        const latestTemp = await Temp.findOne().sort({ createdAt: -1 }); // Get the latest temp by sorting by createdAt descending
        if (!latestTemp) {
            return res.status(404).json({ message: "Nenhuma temperatura encontrada" });
        }
        res.status(200).json({ temp: latestTemp.temp });
    } catch (error) {
        res.status(500).json({ message: "Erro pra encontrar temperatura", error });
    }
};