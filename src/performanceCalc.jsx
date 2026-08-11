// ------------------------------------------------------------------
// Calculadora de performance simplificada.
// AVISO: valores de referência genéricos para uso no simulador —
// NÃO são dados reais de certificação (FCOM/FCTM). Não usar em
// aviação real.
// ------------------------------------------------------------------

// Perfis de referência por tipo ICAO (peso em kg, distâncias em metros).
// refWeightTO / refWeightLD = peso de referência a que as velocidades
// de referência (v1/vr/v2, vref) correspondem.
export const AIRCRAFT_PROFILES = {
  A319: { mtow: 64000, refWeightTO: 64000, v1: 128, vr: 131, v2: 136, maxFlexTemp: 58, toDistRef: 1600,
          mlw: 56000, refWeightLD: 56000, vref: 126, ldDistRef: 1350 },
  A320: { mtow: 78000, refWeightTO: 78000, v1: 138, vr: 142, v2: 145, maxFlexTemp: 55, toDistRef: 1900,
          mlw: 66000, refWeightLD: 66000, vref: 132, ldDistRef: 1450 },
  A321: { mtow: 93500, refWeightTO: 93500, v1: 145, vr: 149, v2: 153, maxFlexTemp: 52, toDistRef: 2100,
          mlw: 77800, refWeightLD: 77800, vref: 138, ldDistRef: 1600 },
  A20N: { mtow: 79000, refWeightTO: 79000, v1: 139, vr: 143, v2: 146, maxFlexTemp: 55, toDistRef: 1850,
          mlw: 67400, refWeightLD: 67400, vref: 133, ldDistRef: 1400 },
  A21N: { mtow: 97000, refWeightTO: 97000, v1: 146, vr: 150, v2: 154, maxFlexTemp: 52, toDistRef: 2050,
          mlw: 79200, refWeightLD: 79200, vref: 139, ldDistRef: 1550 },
  A332: { mtow: 230000, refWeightTO: 230000, v1: 150, vr: 155, v2: 160, maxFlexTemp: 50, toDistRef: 2600,
          mlw: 180000, refWeightLD: 180000, vref: 140, ldDistRef: 1900 },
  A333: { mtow: 233000, refWeightTO: 233000, v1: 151, vr: 156, v2: 161, maxFlexTemp: 50, toDistRef: 2650,
          mlw: 182000, refWeightLD: 182000, vref: 141, ldDistRef: 1950 },
  A359: { mtow: 275000, refWeightTO: 275000, v1: 155, vr: 160, v2: 165, maxFlexTemp: 48, toDistRef: 2800,
          mlw: 207000, refWeightLD: 207000, vref: 145, ldDistRef: 2000 },
  B738: { mtow: 79000, refWeightTO: 79000, v1: 140, vr: 144, v2: 149, maxFlexTemp: 57, toDistRef: 2000,
          mlw: 66300, refWeightLD: 66300, vref: 135, ldDistRef: 1550 },
  B739: { mtow: 85000, refWeightTO: 85000, v1: 144, vr: 148, v2: 153, maxFlexTemp: 55, toDistRef: 2150,
          mlw: 71300, refWeightLD: 71300, vref: 138, ldDistRef: 1650 },
  B752: { mtow: 115000, refWeightTO: 115000, v1: 148, vr: 153, v2: 158, maxFlexTemp: 53, toDistRef: 2300,
          mlw: 95300, refWeightLD: 95300, vref: 142, ldDistRef: 1750 },
  B763: { mtow: 186000, refWeightTO: 186000, v1: 150, vr: 156, v2: 162, maxFlexTemp: 51, toDistRef: 2500,
          mlw: 145000, refWeightLD: 145000, vref: 143, ldDistRef: 1900 },
  B77W: { mtow: 351500, refWeightTO: 351500, v1: 155, vr: 162, v2: 168, maxFlexTemp: 48, toDistRef: 3000,
          mlw: 251000, refWeightLD: 251000, vref: 148, ldDistRef: 2100 },
  B788: { mtow: 227900, refWeightTO: 227900, v1: 152, vr: 158, v2: 164, maxFlexTemp: 49, toDistRef: 2700,
          mlw: 172000, refWeightLD: 172000, vref: 144, ldDistRef: 1950 },
  B789: { mtow: 254000, refWeightTO: 254000, v1: 154, vr: 160, v2: 166, maxFlexTemp: 49, toDistRef: 2800,
          mlw: 192800, refWeightLD: 192800, vref: 146, ldDistRef: 2000 },
  DEFAULT: { mtow: 78000, refWeightTO: 78000, v1: 138, vr: 142, v2: 145, maxFlexTemp: 55, toDistRef: 1900,
             mlw: 66000, refWeightLD: 66000, vref: 132, ldDistRef: 1450 },
};

export function getAircraftProfile(icaoType) {
  if (!icaoType) return AIRCRAFT_PROFILES.DEFAULT;
  const key = icaoType.toUpperCase().trim();
  return AIRCRAFT_PROFILES[key] || AIRCRAFT_PROFILES.DEFAULT;
}

// Extrai vento (dir/spd em kt), temperatura (°C) e QNH (hPa) de um METAR bruto.
// Devolve valores ISA por omissão se não conseguir interpretar.
export function parseMetar(raw) {
  const result = { windDir: 0, windSpd: 0, tempC: 15, qnh: 1013 };
  if (!raw || typeof raw !== 'string') return result;

  const windMatch = raw.match(/(\d{3})(\d{2,3})(?:G\d{2,3})?KT/);
  if (windMatch) {
    result.windDir = parseInt(windMatch[1], 10);
    result.windSpd = parseInt(windMatch[2], 10);
  } else if (/VRB\d{2,3}KT/.test(raw)) {
    result.windDir = 0;
    result.windSpd = parseInt(raw.match(/VRB(\d{2,3})KT/)[1], 10);
  }

  const tempMatch = raw.match(/\s(M?\d{2})\/(M?\d{2})\s/);
  if (tempMatch) {
    result.tempC = parseInt(tempMatch[1].replace('M', '-'), 10);
  }

  const qnhMatch = raw.match(/Q(\d{4})/);
  if (qnhMatch) {
    result.qnh = parseInt(qnhMatch[1], 10);
  } else {
    const altMatch = raw.match(/A(\d{4})/);
    if (altMatch) {
      // Altímetro em polegadas de mercúrio (x100) -> hPa
      result.qnh = Math.round(parseInt(altMatch[1], 10) * 0.3386);
    }
  }

  return result;
}

// Converte a pista (ex: "02", "27L") para heading aproximado em graus.
export function runwayHeading(rwy) {
  if (!rwy) return 0;
  const num = parseInt(rwy.replace(/[^\d]/g, ''), 10);
  if (Number.isNaN(num)) return 0;
  return (num * 10) % 360;
}

// Componente de vento de proa (positivo) / cauda (negativo) em kt.
export function headwindComponent(windDir, windSpd, rwyHeadingDeg) {
  const angleDiff = ((windDir - rwyHeadingDeg + 540) % 360) - 180;
  const rad = (angleDiff * Math.PI) / 180;
  return Math.round(windSpd * Math.cos(rad));
}

// Distância base (a thrust máxima / TOGA, sem margem de FLEX) para um dado peso/elevação/vento.
function baseTakeoffDistance({ profile, weightKg, elevationFt, headwindKt }) {
  let dist = Math.round(profile.toDistRef * (weightKg / profile.refWeightTO));
  dist += Math.round(elevationFt * 0.08); // pista mais longa em altitude
  dist -= headwindKt * 12; // vento de proa reduz distância
  if (headwindKt < 0) dist -= headwindKt * 24; // vento de cauda penaliza mais
  return Math.max(dist, 800);
}

// A distância aumenta com o FLEX (menos thrust). +15% no FLEX máximo, +0% em TOGA.
function distanceForFlex(baseDist, flexTemp, oatC, maxFlexTemp) {
  const ratio = 1 + 0.15 * ((flexTemp - oatC) / Math.max(1, maxFlexTemp - oatC));
  return Math.round(baseDist * ratio);
}

// availableRunwayM: comprimento de pista realmente disponível (ex: a partir de uma interseção).
// Se omitido/Infinity, assume-se pista toda disponível.
export function computeTakeoffPerformance({ profile, weightKg, elevationFt = 0, oatC = 15, headwindKt = 0, availableRunwayM = Infinity }) {
  const speedScale = Math.sqrt(Math.max(weightKg, 1) / profile.refWeightTO);

  const altCorrection = Math.round((elevationFt / 1000) * 1); // +1kt por 1000ft
  const tempCorrection = Math.round(Math.max(0, oatC - 15) / 10); // +1kt por 10°C acima da ISA

  const v1 = Math.round(profile.v1 * speedScale) + altCorrection + tempCorrection;
  const vr = Math.round(profile.vr * speedScale) + altCorrection + tempCorrection;
  const v2 = Math.round(profile.v2 * speedScale) + altCorrection + tempCorrection;

  const mtowRatio = weightKg / profile.mtow;
  let flaps = 'CONF 1+F';
  if (mtowRatio > 0.95) flaps = 'CONF 3';
  else if (mtowRatio > 0.85) flaps = 'CONF 2';

  const baseDist = baseTakeoffDistance({ profile, weightKg, elevationFt, headwindKt });

  // FLEX ideal (poupa motores) assumindo pista toda disponível.
  let idealFlex = Math.round(oatC + (profile.maxFlexTemp - oatC) * Math.max(0, 1 - mtowRatio));
  idealFlex = Math.min(Math.max(idealFlex, oatC), profile.maxFlexTemp);

  let flex = idealFlex;
  let dist = distanceForFlex(baseDist, flex, oatC, profile.maxFlexTemp);
  let insufficient = false;

  if (dist > availableRunwayM) {
    // Reduz o FLEX (aumenta thrust) em passos de 1°C até caber na pista disponível.
    while (flex > oatC && dist > availableRunwayM) {
      flex -= 1;
      dist = distanceForFlex(baseDist, flex, oatC, profile.maxFlexTemp);
    }
    if (dist > availableRunwayM) {
      insufficient = true; // nem com TOGA cabe na pista disponível
    }
  }

  const flexLabel = flex <= oatC + 1 ? 'TOGA' : `${flex}°C`;

  return { v1, vr, v2, flex: flexLabel, flaps, dist: `${dist}m`, insufficient };
}

// availableRunwayM: comprimento disponível para a aterragem (ex: a partir de uma interseção de saída antecipada).
export function computeLandingPerformance({ profile, weightKg, elevationFt = 0, headwindKt = 0, availableRunwayM = Infinity }) {
  const speedScale = Math.sqrt(Math.max(weightKg, 1) / profile.refWeightLD);
  const altCorrection = Math.round((elevationFt / 1000) * 1);

  const vref = Math.round(profile.vref * speedScale) + altCorrection;
  const vapp = vref + 5;

  let dist = Math.round(profile.ldDistRef * (weightKg / profile.refWeightLD));
  dist += Math.round(elevationFt * 0.09);
  dist -= headwindKt * 10;
  if (headwindKt < 0) dist -= headwindKt * 22;
  dist = Math.max(dist, 800);

  const insufficient = dist > availableRunwayM;

  return { vapp, vref, dist: `${dist}m`, flaps: 'FULL', insufficient };
}
