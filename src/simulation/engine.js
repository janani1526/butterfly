// Deterministic Simulation Engine for The Butterfly Effect Urban Simulation

export const SCENARIOS = {
  road_closure: {
    id: 'road_closure',
    name: 'Major Road Closure',
    subtitle: 'Closure of Main Arterial Bridge & Feeder Expressway',
    epicenter: 'West River Bridge',
    description: 'A major structural fault forces the sudden closure of the main bridge connecting the residential west side to downtown.',
    icon: 'Road',
    color: '#ef4444', // Red
    defaultSeverity: 50,
    baseRules: {
      trafficCoef: 0.75,
      busDelayCoef: 0.55,
      emergencyCoef: 0.40,
      energyCoef: 0.25,
      aqiCoef: 0.65,
      costCoef: 1850
    },
    rippleSteps: [
      { step: 0, title: 'Immediate Bridge Barricade', desc: 'Barricades deployed at West Bridge entrance; 14,000 vehicles rerouted.', timestamp: 'T+0 min' },
      { step: 1, title: 'Feeder Corridor Bottleneck', desc: 'Feeder avenues experience 300% volume surge. Signal queues spill into grid.', timestamp: 'T+15 min' },
      { step: 2, title: 'Transit Detours & Response Lag', desc: 'Express buses delayed by alternate routing; emergency vehicle corridors blocked.', timestamp: 'T+45 min' },
      { step: 3, title: 'Citywide Systemic Equilibrium', desc: 'Idle emissions elevate regional AQI; commercial freight delays accumulate cost.', timestamp: 'T+90 min' }
    ]
  },
  power_outage: {
    id: 'power_outage',
    name: 'Power Grid Outage',
    subtitle: 'Central Substation Transformer Failure',
    epicenter: 'Substation Alpha',
    description: 'Overheating causes a blackout across Central District, deactivating traffic signals and transit command servers.',
    icon: 'Zap',
    color: '#f59e0b', // Amber
    defaultSeverity: 60,
    baseRules: {
      trafficCoef: 0.50,
      busDelayCoef: 0.45,
      emergencyCoef: 0.70,
      energyCoef: 0.95,
      aqiCoef: 0.30,
      costCoef: 3200
    },
    rippleSteps: [
      { step: 0, title: 'Substation Transformer Trip', desc: 'Central Substation trips; 45 street intersections lose active traffic lights.', timestamp: 'T+0 min' },
      { step: 1, title: 'Intersection Gridlock & Panic', desc: 'Uncontrolled four-way stops slow traffic down to 5 mph across 12 square miles.', timestamp: 'T+15 min' },
      { step: 2, title: 'Emergency Dispatch Overload', desc: 'Elevator rescues & traffic accidents trigger emergency call surge (+220%).', timestamp: 'T+45 min' },
      { step: 3, title: 'Diesel Generator Backup Surge', desc: 'Commercial diesel generators kick in, increasing localized fine particulate emissions.', timestamp: 'T+90 min' }
    ]
  },
  transit_strike: {
    id: 'transit_strike',
    name: 'Public Transit Disruption',
    subtitle: 'Metro Train & Bus System Union Walkout',
    epicenter: 'Union Central Hub',
    description: 'An unexpected wildcat strike halts 80% of urban bus routes and rapid transit trains during peak rush hour.',
    icon: 'Bus',
    color: '#3b82f6', // Blue
    defaultSeverity: 70,
    baseRules: {
      trafficCoef: 0.85,
      busDelayCoef: 0.95,
      emergencyCoef: 0.35,
      energyCoef: 0.20,
      aqiCoef: 0.80,
      costCoef: 2400
    },
    rippleSteps: [
      { step: 0, title: 'Metro Gates Locked', desc: 'Union walkout locks central terminal gates. 60,000 commuters stranded.', timestamp: 'T+0 min' },
      { step: 1, title: 'Rideshare & Car Surge', desc: 'Commuters flood highways in single-occupancy personal cars & taxi rides.', timestamp: 'T+15 min' },
      { step: 2, title: 'Highway Capacity Saturation', desc: 'Main expressway volume exceeds 140% theoretical design threshold.', timestamp: 'T+45 min' },
      { step: 3, title: 'Spike in Tailpipe Carbon Emissions', desc: 'Gridlock idle time inflates daily city carbon footprint & air toxicity.', timestamp: 'T+90 min' }
    ]
  },
  extreme_weather: {
    id: 'extreme_weather',
    name: 'Flash Flood Event',
    subtitle: 'Torrential Rain & Low-Lying Basin Inundation',
    epicenter: 'River Basin Parkway',
    description: 'A severe storm dumps 3 inches of rain in 45 minutes, flooding underpasses and critical drainage arterial roads.',
    icon: 'CloudRain',
    color: '#06b6d4', // Cyan
    defaultSeverity: 65,
    baseRules: {
      trafficCoef: 0.80,
      busDelayCoef: 0.70,
      emergencyCoef: 0.85,
      energyCoef: 0.50,
      aqiCoef: 0.15,
      costCoef: 2900
    },
    rippleSteps: [
      { step: 0, title: 'Basin Parkway Submerged', desc: 'Underpass drainage overflows; key east-west transit arterial submerged under 2ft water.', timestamp: 'T+0 min' },
      { step: 1, title: 'Emergency Hydroplane Rescues', desc: 'First responders dispatched to rescue stranded vehicles; high water slows movement.', timestamp: 'T+15 min' },
      { step: 2, title: 'Storm Pump Grid Strain', desc: 'Stormwater pump stations draw maximum electrical load from municipal grid.', timestamp: 'T+45 min' },
      { step: 3, title: 'City-wide Travel Paralysis', desc: 'Surface streets flooded; commercial logistics suspended across low-lying districts.', timestamp: 'T+90 min' }
    ]
  }
};

export const TIME_OF_DAY_MODIFIERS = {
  morning: { id: 'morning', label: 'Morning Peak (08:00)', trafficMultiplier: 1.25, timeFactor: 1.2 },
  midday: { id: 'midday', label: 'Midday (13:00)', trafficMultiplier: 0.90, timeFactor: 0.9 },
  evening: { id: 'evening', label: 'Evening Rush (17:30)', trafficMultiplier: 1.35, timeFactor: 1.3 },
  night: { id: 'night', label: 'Late Night (02:00)', trafficMultiplier: 0.50, timeFactor: 0.5 }
};

export const WEATHER_MODIFIERS = {
  clear: { id: 'clear', label: 'Clear Skies', multiplier: 1.0 },
  rain: { id: 'rain', label: 'Heavy Rain', multiplier: 1.25 },
  snow: { id: 'snow', label: 'Blizzard / Snow', multiplier: 1.45 }
};

export const BASELINE_INDICATORS = {
  traffic: { name: 'Traffic Congestion', unit: '%', baseline: 20.0, min: 0, max: 100, description: 'Percentage of total city road capacity currently congested.' },
  busDelay: { name: 'Public Transport Delay', unit: 'min', baseline: 15.0, min: 0, max: 120, description: 'Average passenger waiting/travel delay across all transit routes.' },
  emergency: { name: 'Emergency Response Pressure', unit: '%', baseline: 10.0, min: 0, max: 100, description: 'Percentage load on fire, police, and ambulance dispatch fleets.' },
  energy: { name: 'Energy Grid Load', unit: '%', baseline: 30.0, min: 0, max: 100, description: 'Percentage of total electrical grid sub-station capacity utilized.' },
  aqi: { name: 'Air Quality Index (AQI)', unit: 'AQI', baseline: 40.0, min: 0, max: 250, description: 'Particulate and smog pollution level in urban center.' },
  economicCost: { name: 'Economic Productivity Loss', unit: '$/hr', baseline: 0, min: 0, max: 500000, description: 'Estimated hourly financial loss from travel delays & delayed services.' }
};

/**
 * Runs the deterministic butterfly effect simulation engine
 */
export function runSimulation({
  scenarioId = 'road_closure',
  severity = 50,
  timeOfDayId = 'morning',
  weatherId = 'clear',
  currentStep = 3, // 0 to 3 for ripple steps progression
  customCoefficients = null
}) {
  const scenario = SCENARIOS[scenarioId] || SCENARIOS.road_closure;
  const timeMod = TIME_OF_DAY_MODIFIERS[timeOfDayId] || TIME_OF_DAY_MODIFIERS.morning;
  const weatherMod = WEATHER_MODIFIERS[weatherId] || WEATHER_MODIFIERS.clear;

  // Use custom coefficients if interactive sandbox formula inspector is tweaked
  const rules = customCoefficients || scenario.baseRules;

  // Progression factor based on timeline step (0 to 3)
  // Step 0 = 25% effect, Step 1 = 55%, Step 2 = 80%, Step 3 = 100% full equilibrium
  const stepFactor = [0.25, 0.55, 0.80, 1.0][Math.min(3, Math.max(0, currentStep))];

  const effectiveSeverity = severity * stepFactor;

  // Deterministic equations with bounds clamping (0 to max)
  const trafficSimulated = Math.min(
    100,
    Number((BASELINE_INDICATORS.traffic.baseline + rules.trafficCoef * effectiveSeverity * timeMod.trafficMultiplier * weatherMod.multiplier).toFixed(1))
  );

  const busDelaySimulated = Math.min(
    120,
    Number((BASELINE_INDICATORS.busDelay.baseline + rules.busDelayCoef * effectiveSeverity * weatherMod.multiplier).toFixed(1))
  );

  const emergencySimulated = Math.min(
    100,
    Number((BASELINE_INDICATORS.emergency.baseline + rules.emergencyCoef * effectiveSeverity * timeMod.timeFactor).toFixed(1))
  );

  const energySimulated = Math.min(
    100,
    Number((BASELINE_INDICATORS.energy.baseline + rules.energyCoef * effectiveSeverity).toFixed(1))
  );

  const aqiSimulated = Math.min(
    250,
    Number((BASELINE_INDICATORS.aqi.baseline + rules.aqiCoef * effectiveSeverity * (1 + trafficSimulated/100)).toFixed(1))
  );

  const costSimulated = Math.round(effectiveSeverity * rules.costCoef * timeMod.trafficMultiplier);

  const results = {
    traffic: {
      ...BASELINE_INDICATORS.traffic,
      simulated: trafficSimulated,
      delta: Number((trafficSimulated - BASELINE_INDICATORS.traffic.baseline).toFixed(1)),
      status: trafficSimulated > 75 ? 'Critical' : trafficSimulated > 50 ? 'Heavy' : trafficSimulated > 30 ? 'Moderate' : 'Optimal'
    },
    busDelay: {
      ...BASELINE_INDICATORS.busDelay,
      simulated: busDelaySimulated,
      delta: Number((busDelaySimulated - BASELINE_INDICATORS.busDelay.baseline).toFixed(1)),
      status: busDelaySimulated > 60 ? 'Critical' : busDelaySimulated > 35 ? 'Heavy' : busDelaySimulated > 20 ? 'Moderate' : 'Optimal'
    },
    emergency: {
      ...BASELINE_INDICATORS.emergency,
      simulated: emergencySimulated,
      delta: Number((emergencySimulated - BASELINE_INDICATORS.emergency.baseline).toFixed(1)),
      status: emergencySimulated > 70 ? 'Critical' : emergencySimulated > 45 ? 'Heavy' : emergencySimulated > 25 ? 'Moderate' : 'Optimal'
    },
    energy: {
      ...BASELINE_INDICATORS.energy,
      simulated: energySimulated,
      delta: Number((energySimulated - BASELINE_INDICATORS.energy.baseline).toFixed(1)),
      status: energySimulated > 80 ? 'Critical' : energySimulated > 60 ? 'Heavy' : energySimulated > 40 ? 'Moderate' : 'Optimal'
    },
    aqi: {
      ...BASELINE_INDICATORS.aqi,
      simulated: aqiSimulated,
      delta: Number((aqiSimulated - BASELINE_INDICATORS.aqi.baseline).toFixed(1)),
      status: aqiSimulated > 150 ? 'Unhealthy' : aqiSimulated > 100 ? 'Moderate Risk' : 'Good'
    },
    economicCost: {
      ...BASELINE_INDICATORS.economicCost,
      simulated: costSimulated,
      delta: costSimulated,
      status: costSimulated > 100000 ? 'Critical Loss' : costSimulated > 50000 ? 'High Impact' : 'Moderate Impact'
    }
  };

  // Overall City Health Stress Index (0-100 score)
  const healthStressIndex = Math.min(
    100,
    Math.round(
      (results.traffic.simulated * 0.3) +
      (results.emergency.simulated * 0.3) +
      ((results.busDelay.simulated / 120 * 100) * 0.2) +
      (results.energy.simulated * 0.2)
    )
  );

  return {
    scenario,
    inputs: { severity, timeOfDayId, weatherId, currentStep },
    results,
    healthStressIndex,
    timestamp: new Date().toLocaleTimeString()
  };
}

/**
 * Predefined plain language fallback explanation when AI endpoint is unavailable or deactivated
 */
export function generateFallbackExplanation(simOutput) {
  const { scenario, inputs, results, healthStressIndex } = simOutput;
  const { name } = scenario;
  const { severity } = inputs;
  const { traffic, busDelay, emergency, energy, aqi, economicCost } = results;

  return {
    narrative: `The hypothetical event '${name}' with a severity of ${severity}% creates a systemic cascade across Metro City's interconnected networks. Starting at the primary point of failure, traffic congestion escalates by +${traffic.delta.toFixed(1)}% to reach ${traffic.simulated.toFixed(1)}% total road occupancy. As commuters divert to secondary feeder avenues, public transit routes experience delays averaging ${busDelay.simulated.toFixed(1)} minutes. The resulting road gridlock limits movement corridors for emergency vehicles, driving dispatch response pressure up to ${emergency.simulated.toFixed(1)}%. Concurrently, prolonged vehicle engine idling and auxiliary traffic signals strain regional energy consumption to ${energy.simulated.toFixed(1)}% grid capacity while elevating air toxicity to an AQI of ${aqi.simulated.toFixed(1)}. The overall city stress index stands at ${healthStressIndex}/100 with estimated hourly productivity losses of $${economicCost.simulated.toLocaleString()}.`,
    chain: [
      { stage: '1. Initial Trigger', detail: `${name} at ${severity}% severity creates instant localized flow barrier.` },
      { stage: '2. Traffic Spillover', detail: `Vehicles divert, pushing traffic congestion to ${traffic.simulated}%.` },
      { stage: '3. Transit Delay', detail: `Bus and transit routes stall, causing +${busDelay.delta} min travel delay.` },
      { stage: '4. Essential Service Strain', detail: `Emergency dispatch bottlenecks, raising response pressure to ${emergency.simulated}%.` },
      { stage: '5. Environmental & Cost Ripple', detail: `Idling emissions push AQI to ${aqi.simulated} with an hourly loss of $${economicCost.simulated.toLocaleString()}.` }
    ],
    mode: 'Predefined Deterministic Template'
  };
}
