const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({message: "Email e/ou Senha não pode ser nulos"})
    }
    
    try {
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(401).json({ message: 'Credenciais erradas'})
        }
        
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1d'})
        
        res.status(200).json({ token: 'Bearer ' + token })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
} 