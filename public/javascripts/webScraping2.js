const fs = require('fs').promises;
const axios = require('axios');
const cheerio = require('cheerio');

async function getUser(nombreArchivo) {
  try {
    const response = await axios.get("https://ninjakaizen.com/ranking/clan");
    const $ = cheerio.load(response.data);
    const datos = $("tbody tr")
      .map((i, el) => ({
        puesto: $(el).find("td:nth-child(1)").text(),
        image: $(el).find("td:nth-child(2) > div > img").attr("src"),
        id: $(el)
          .find("td:nth-child(2) > div > div > div > a")
          .attr("href")
          .replace("/clan/", ""),
        nombre: $(el).find("td:nth-child(2) > div > div > div > a").text(),
        miembros: $(el).find("td:nth-child(3)").text(),
        reputacion: parseInt($(el).find("td:nth-child(4)").text().replace(/,/g, ''), 10),
      }))
      .get();

    await fs.writeFile(nombreArchivo, JSON.stringify(datos, null, 2), "utf-8");
    
    return datos;
  } catch (error) {
    console.error("Error en getUser:", error);
    throw error;
  }
}

async function getUser2() {
  try {
    for (let i = 0; i < 99999; i++) {
      console.log('\x1b[32m%s\x1b[0m', `Ejecución datos 15s: ${i}`);

      const datos = await getUser("datos15s.json");
      
      await new Promise((resolve) => setTimeout(resolve, 15000));
      
     
      const nuevosDatos = await getUser("nuevosdatos15s.json");

      const resultadosResto = nuevosDatos.map((nuevoDato, index) => {
        const dato = datos.find(d => d.id === nuevoDato.id);
        
        if (dato) {
          return {
            ...nuevoDato,
            diferencia: nuevoDato.reputacion - dato.reputacion,
            gap: nuevosDatos[0].reputacion - nuevoDato.reputacion
          };
        } else {
          return nuevoDato;
        }
      });

      await fs.writeFile('resultadoResto15s.json', JSON.stringify(resultadosResto, null, 2), 'utf-8');
    
    }
  } catch (error) {
    console.error("Error en getUser2:", error);
  }
}

module.exports = getUser2;
