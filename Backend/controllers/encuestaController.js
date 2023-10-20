import EncuestaModel from '../model/EncuestaModel.js'; // Asegúrate de que la ruta sea correcta
import Restriccion from '../model/Restriccion.js';


//AGREGAR
export const crearEncuesta = async (req,res) => {
    try {
        //Obtener datos del body
        const {pregunta,id,opciones} = req.body;      
       
        //Crea una instancia del modelo de Encuesta con los datos
        const encuesta = new EncuestaModel({pregunta,id,opciones});

        //guardar la encuesta en la base de datos
        encuesta
            .save()
            .then((respuesta) => res.json(respuesta))
            .catch((error) => res.status(500).json(error));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Ha ocurrido un error en el servidor"})
    }
};
//EDITAR
export const editarEncuesta = async (req,res) => {
    try {
        //Obtener datos del body
        const {pregunta,id,opciones} = req.body;      
       
        //Crea una instancia del modelo de Encuesta con los datos
        EncuestaModel.findOneAndUpdate(
            {id:id},
            {pregunta:pregunta,opciones:opciones},
            {new: true} //Devuelve el documento actualizado
        )
          .then((encuestaActualizada) => {
            if(!encuestaActualizada){
                return res.status(404).json({error:"Encuesta no encontrada"})
            }
            res.json(encuestaActualizada);
          })
          .catch((error) => res.status(500).json(error));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Ha ocurrido un error en el servidor"})
    }
};
///BUSCAR
export const buscarEncuesta = async (req,res) => {
    try {
        const id = req.params.id
        EncuestaModel.findOne({id:id})
            .then((encuestaEncontrada) => {
                if(!encuestaEncontrada){
                    return  res.status(404).json({error:"Encuesta no encotrada"});
                }
                res.json(encuestaEncontrada);
            })
            .catch((error) => res.status(500).json(error));       
    } catch (error) {
        console.error(error);
        res.status(500).json({error:  "Ha ocurrido un error en el servidor"})
    }
};
//LISTAR
export const listarEncuesta = async (req,res) => {
    try {
        EncuestaModel.find()
            .then((encuestasEncontrada) => {
                if(!encuestasEncontrada){
                    return  res.status(404).json({error:"Encuestas no encotradas"});
                }
                res.json(encuestasEncontrada);
            })
            .catch((error) => res.status(500).json(error));       
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Ha ocurrido un error en el servidor"})
    }
};
//ELIMINAR
export const eliminarEncuesta = async (req,res) => {
    try {
        const id = req.body.id
        //Crea una instancia del modelo de Encuesta con los datos
        EncuestaModel.findOneAndRemove({_id:id})
        .then((EncuestaModel) => {
            if(!EncuestaModel){
                return  res.status(404).json({error:"Encuesta no encotrada"});
            }
            res.json("Encuesta eliminada correctamente");
        })
        .catch((error) => res.status(500).json(error)); 
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Ha ocurrido un error en el servidor"})
    }
};
//VOTAR
export const guardarVoto = async (req, res) => {
    try {
        const {encuestaId, opcionId,ip} = req.body;
        Restriccion.findOne({ip,encuestaId})
        .then((voto) => {
            if(voto) {
                res.status(400).json({message: "Usted ya votó en esta encuesta"})
            }else{
                EncuestaModel.updateOne(
                    { id: encuestaId, "opciones.id": opcionId },
                    { $inc: { "opciones.$.votos": 1 } }
                )
                .then((respuesta) => {
                    if (respuesta.modifiedCount > 0){
                        let restric = new Restriccion({
                            ip: req.body.ip,
                            encuestaId,
                        });
                        restric
                          .save()
                          .then(() => res.json({message: 'Registrado correctamnete el voto'}))
                          .catch(() => res.status(500).json({message: "Error interno en el servidor."}))
                    } else {
                        res.status(400).json({message: "Voto no registrado"})
                    }
                })
            }
        })
    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }
};