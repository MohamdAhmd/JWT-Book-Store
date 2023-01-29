import express, {Request,Response} from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import config from './config'
import rateLimit from 'express-rate-limit'
import ErrorMidderware from './middelwares/error.middelware'
import userRouter from './routers/index'

const app = express()




app.use(express.json())
app.use(morgan('common'))
app.use(helmet())

app.use(rateLimit({
    windowMs:60*60*1000,
    standardHeaders:true,
    legacyHeaders:false,
    message:'Too many requests From This IP, please try again after an hour.',
    max:4
}))



app.use('/api',userRouter)

app.get('/', (_req:Request, res:Response) => {
    res.json('Hello world 💻🌎')
})

app.use(ErrorMidderware)
app.use('*', (_req:Request, res:Response) => {
    res.status(404).json('This Page Not Found 404')
})


const port = config.port || 3000
app.listen(port,()=>{
    console.log(`server listening on port: ${port}`)
})

export default app 