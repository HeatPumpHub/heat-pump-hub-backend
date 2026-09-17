import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(cors()).use(express.json())

app.get('/api/v1/health', (req: Request, res: Response) =>{
    res.status(200).json({
        message: 'HeatPumpHub backend operational'
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port${PORT} in ${process.env.NODE_ENV} mode!`)
})