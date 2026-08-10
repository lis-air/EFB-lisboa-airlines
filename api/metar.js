export default async function handler(req, res) {
  const { icao } = req.query;

  if (!icao) {
    return res.status(400).json({ error: 'ICAO é obrigatório' });
  }

  try {
    const response = await fetch(`https://aviationweather.gov/api/data/metar?ids=${icao.toUpperCase()}&format=json`);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao obter dados meteorológicos.' });
    }

    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}