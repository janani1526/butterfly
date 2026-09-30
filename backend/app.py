from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "online", "message": "Butterfly Effect AI Explanation Service is active."})

@app.route('/api/explain', methods=['POST'])
def explain():
    try:
        data = request.json or {}
        scenario = data.get('scenarioName', 'Major Road Closure')
        severity = data.get('severity', 50)
        time_of_day = data.get('timeOfDay', 'Morning Peak')
        weather = data.get('weather', 'Clear')
        indicators = data.get('indicators', {})

        traffic = indicators.get('traffic', {}).get('simulated', 0)
        traffic_delta = indicators.get('traffic', {}).get('delta', 0)
        bus_delay = indicators.get('busDelay', {}).get('simulated', 0)
        emergency = indicators.get('emergency', {}).get('simulated', 0)
        energy = indicators.get('energy', {}).get('simulated', 0)
        aqi = indicators.get('aqi', {}).get('simulated', 0)

        # AI-Assisted Narrative Synthesis Logic
        # Simulating an intelligent LLM narrative generator for urban systems analysis
        narrative = (
            f"During {time_of_day} under {weather.lower()} conditions, a {severity}% severity '{scenario}' "
            f"triggers a cascading ripple effect across Metro City's urban infrastructure.\n\n"
            f"1. Epicenter Impact: Traffic congestion spikes by +{traffic_delta:.1f}%, reaching {traffic:.1f}% capacity as vehicles funnel into adjacent feeder arteries.\n"
            f"2. Public Transport Ripple: Bus routes experiencing detour bottlenecks face cumulative delays of {bus_delay:.1f} minutes, causing transit queue backups.\n"
            f"3. Essential Services Pressure: Emergency response pressure climbs to {emergency:.1f}%, as ambulances and fire engines navigate congested detour corridors.\n"
            f"4. Environmental & Energy Impact: Grid energy load reaches {energy:.1f}% due to traffic signal recalibration and idling emissions, pushing AQI to {aqi:.1f} points.\n\n"
            f"Key Takeaway: A localized disruption quickly cascades into cross-sector delays, demonstrating the tight systemic coupling of modern smart cities."
        )

        key_insights = [
            f"Traffic bottle-necking amplifies public transit delay by approx {(bus_delay/max(1, severity)):.2f}x per severity unit.",
            f"Emergency dispatch times are critically sensitive during {time_of_day}.",
            f"Emissions and grid pressure scale non-linearly with severe congestion levels."
        ]

        return jsonify({
            "status": "success",
            "narrative": narrative,
            "keyInsights": key_insights,
            "engine": "Flask AI Synthesizer Endpoint v1.0",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    print("Starting Butterfly Effect AI Explanation Server on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
