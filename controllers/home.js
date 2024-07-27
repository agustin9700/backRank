
// const fs = require('fs')
// module.exports=function(res,res){

    
//     fs.readFile('resultadoResto15s.json', 'utf-8', (err, data) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send('Error al leer el archivo JSON');
//           return;
//         }
//         const jsonData = JSON.parse(data);
//         res.send(jsonData);
//       });

// }
const fs = require('fs');

module.exports = function(req, res) {
    fs.readFile('resultadoResto15s.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al leer el archivo JSON');
            return;
        }
        
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('Error al analizar el JSON');
            return;
        }

        res.send(jsonData);
    });
}
