//IMPORTACIONES NECESARÍAS
import  express  from "express"; //PARA EL SERVIDOR
import  dotenv  from "dotenv";
import mongoose from "mongoose"; 
import bodyParser from 'body-parser';

import encuestaRoute from './routes/encuestas.js';

const app = express();
dotenv.config(); 
app.use(express.json()); //POR ACA PASA LA APLICACION AL HACER CUALQUIER SOLICITUD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // Configura el origen permitido (puedes especificar un dominio específico en lugar de '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Configura los métodos de solicitud permitidos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Configura los encabezados permitidos
    next();
});

//CONEXION A MONGO DB
async function conexion(){
    try{
      const con =  mongoose.connect(process.env.URI_MONGO);
      console.log('Conectado a mongo DB');

    }catch(error){
        console.log(`No se puedo conectar a MONGO DB ${error}`)
    };
};

//solicitud get
app.get('/', (req, res) => {
    return res.send('HOLA MUNDO');
});

app.use("/api/v1/encuestas", encuestaRoute);

//escuchar la solicitud
app.listen(process.env.PORT,() => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
    conexion();
});
