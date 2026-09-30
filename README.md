# THE BUTTERFLY EFFECT: One Tiny Change. A Completely Different World.
> **An Interactive Urban Systems Simulation & Educational Demonstration**

## 🌟 Overview
**The Butterfly Effect** is a software-based urban systems simulation web application that demonstrates how a localized hypothetical disruption (such as a major road closure) cascades across connected city indicators including traffic congestion, public transport delays, emergency response pressure, energy grid load, air quality (AQI), and economic productivity loss.

The project is designed for educational exploration and systems-thinking learning aligned with **UN Sustainable Development Goal 11 (Sustainable Cities and Communities)** and **SDG 4 (Quality Education)**.

---

## ✨ Features & Functional Capabilities

1. **Scenario Selection & Control Deck**:
   - **Primary Scenario**: Major Road Closure (West River Bridge Arterial).
   - **Additional Scenarios**: Power Grid Outage, Public Transit Strike, Flash Flood Event.
   - **Severity Slider**: Adjustable from 0% to 100%.
   - **Environmental Context**: Time-of-Day (Morning Rush, Midday, Evening Rush, Night) and Weather (Clear, Heavy Rain, Blizzard) multipliers.

2. **Interactive City Mesh Visualizer (`CityCanvas.jsx`)**:
   - Dynamic HTML5 Canvas rendering of Metro City districts.
   - Animated vehicle traffic particles slowing down and changing color dynamically as congestion builds.
   - Flashing emergency siren beacons on hospital dispatch routes.
   - Pulsing Butterfly Effect ripple waves radiating outwards from the epicenter.
   - Interactive district hover/click inspection tooltips.

3. **Baseline vs. Simulated Dashboard (`MetricsDashboard.jsx`)**:
   - Comparative card displays showing baseline values alongside simulated outputs and percentage deltas.
   - Status indicators (Optimal, Moderate, Heavy, Critical).
   - Global **Metro System Stress Score (0–100)** meter.

4. **Causal Dependency Ripple Graph (`RippleGraph.jsx`)**:
   - Visual flowchart connecting: `Hypothetical Event ➔ Traffic Congestion ➔ Bus Transit Delay ➔ Emergency Response Pressure ➔ Energy & AQI Ripple ➔ Economic Loss`.
   - Clickable nodes showcasing exact mathematical formulas and model logic.

5. **Plain-Language Explanation Layer (`ExplanationPanel.jsx`)**:
   - AI Service Layer integration: Connects to a Python Flask API (`/api/explain`) for LLM narrative synthesis.
   - Automatic local fallback engine: Ensures 100% demo reliability without external network dependencies.
   - Web Speech API integration for audio TTS narrative readout.
   - One-click copy narrative to clipboard.

6. **Formula Inspector & Model Transparency Sandbox (`FormulaModal.jsx`)**:
   - Exposes deterministic linear formulas and upper-bound limits.
   - Interactive coefficient editor allowing users to tweak sensitivity parameters live.

7. **Side-by-Side Run Comparison (`RunComparisonModal.jsx`)**:
   - Save trial runs and compare metrics across different severity levels side-by-side.

8. **Educational Disclaimer & Framework (`EducationalFooter.jsx`)**:
   - Highlights SDG 11 & SDG 4 relevance, assumptions, limitations, and responsible interpretation rules.

---

## 📐 Deterministic Simulation Engine Formulas

$$\text{Traffic Congestion (\%)} = \min(100, 20 + 0.75 \times \text{Severity} \times \text{TimeMod} \times \text{WeatherMod})$$

$$\text{Bus Delay (min)} = \min(120, 15 + 0.55 \times \text{Severity} \times \text{WeatherMod})$$

$$\text{Emergency Pressure (\%)} = \min(100, 10 + 0.40 \times \text{Severity} \times \text{TimeFactor})$$

$$\text{Energy Grid Load (\%)} = \min(100, 30 + 0.25 \times \text{Severity})$$

$$\text{Air Quality (AQI)} = \min(250, 40 + 0.65 \times \text{Severity} \times (1 + \frac{\text{Traffic}}{100}))$$

$$\text{Economic Loss (\$/hr)} = \text{Severity} \times \$1,850 \times \text{TimeMod}$$

---

## 🛠️ Technology Stack

- **Frontend**: React, Vite, JavaScript (ES6+), HTML5 Canvas, Tailwind CSS, Lucide Icons.
- **Backend (Optional)**: Python 3, Flask, Flask-CORS.
- **Audio & Accessibility**: Browser Web Speech API for voice readout.

---

## 🚀 How to Run the Application

### 1. Launch the React Web Frontend
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 2. Optional: Start the Python Flask AI Backend Server
```bash
cd backend
pip install -r requirements.txt
python app.py
```
The backend server runs on `http://localhost:5000`.

---

## 🎓 Responsible Interpretation & Limitations
The Butterfly Effect model relies on simplified design assumptions and deterministic mathematical formulas. Numerical outputs are illustrative and intended solely for education and systems-thinking exploration; they do not represent live sensor data or validated civil engineering forecasts.
