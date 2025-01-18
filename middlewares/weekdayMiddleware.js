const weekdayMiddleware = (req, res, next) => {
    const currentDay = new Date().getDay()
    
    if(currentDay === 0 || currentDay === 5) {
        return res.status(403).json({ message: 'Acesso permitido apenas em dias da semana'})
    }
    
    next()
}

module.exports = weekdayMiddleware