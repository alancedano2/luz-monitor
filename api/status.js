// api/status.js

// Almacena en memoria de la función el último latido recibido
let lastHeartbeat = Date.now();

export default function handler(req, res) {
  // Permitir que tu PC local envíe datos sin problemas de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    // La PC local nos dice que hay luz
    lastHeartbeat = Date.now();
    return res.status(200).json({ success: true, message: "Latido guardado" });
  } 
  
  if (req.method === 'GET') {
    // La página HTML nos pregunta si hay luz
    const timePassed = Date.now() - lastHeartbeat;
    
    // Si pasaron más de 8 segundos sin recibir señal de la PC, asumimos que no hay luz
    if (timePassed > 8000) {
      return res.status(200).json({ status: "offline", lastSeen: lastHeartbeat });
    } else {
      return res.status(200).json({ status: "online" });
    }
  }

  return res.status(405).end();
}
