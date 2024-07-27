
// const fs = require('fs')
// module.exports=function(res,res){

    
//     fs.readFile('resultadoResto.json', 'utf-8', (err, data) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send('Error al leer el archivo JSON');
//           return;
//         }
//         const jsonData = JSON.parse(data);
//         res.send(jsonData);
//       });

// }

const fs = require('fs').promises;

module.exports = async function(req, res) {
    try {
        const data = await fs.readFile('resultadoResto.json', 'utf-8');
        let jsonData;

        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error al analizar el JSON:', parseErr);
            console.error('Contenido del archivo problemático:', data);
            return res.status(500).send('Error al analizar el archivo JSON');
        }

        res.send(jsonData);
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al leer el archivo JSON');
    }
};

