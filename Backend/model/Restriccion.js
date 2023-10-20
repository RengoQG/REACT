import mongoose from "mongoose";

//MODELOS
const retriccionSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    encuestaId:{
        type:String,
        required:true
    },
    fecha: { type: Date, default: Date.now }
});

export default mongoose.model("restricciones",retriccionSchema);