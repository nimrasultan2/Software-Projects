
# Target Practice: Creative Coding & Coordinate-Based Logic

## Project Overview

This project is an interactive 2D archery simulator developed using the **p5.py** framework. Moving beyond basic scripting, this project implements a continuous **Draw Loop** architecture to handle real-time rendering, user input, and collision detection between dynamic objects and static targets.

The goal was to build a visually responsive environment while maintaining **human-readable** conditional logic to handle scoring and game states.

---

## System Architecture

The game follows the standard **p5** lifecycle:

* **Setup Phase:** Initializes the canvas environment, target coordinates, and initial score states.
* **Draw Loop (Rendering):** A continuous 60fps refresh cycle that monitors arrow position and updates the visual output.
* **Interaction Layer:** Leverages the `mouse_pressed` or `key_pressed` listeners to inject velocity into the projectile object.

---

## Key Development Phases

### 1. Canvas Vector Mapping

Using p5’s coordinate system, I mapped the target rings as concentric circles. This involved defining precise boundaries for the `red`, `yellow`, and `green` zones to prepare for pixel-perfect collision detection.

### 2. The "Get" Pixel Logic

Instead of complex geometric distance formulas, I implemented a **Color-Based Collision Engine**. By using the `get(x, y)` function, the game "reads" the color of the pixel where the arrow lands:

* **Legendary Shot (Green):** Identifies the highest difficulty zone.
* **Precision Hit (Yellow):** Mid-tier performance tracking.
* **Standard Hit (Red):** Baseline accuracy validation.

### 3. Dynamic Text Output

I integrated a real-time feedback system that pipes game data directly to the console/UI, translating technical color-data into human-readable scoring milestones (`score = score + 500`).

---

## Tech Stack & SQL-Style Logic

* **Framework:** p5.py (Processing for Python)
* **Logic Flow:** Multi-branch `if-elif` conditional structures.
* **Rendering:** Procedural 2D primitives (`ellipse`, `rect`).
* **Input Handling:** Interactive event listeners for seamless gameplay.

---

## Key Insights

> Transitioning to the **p5 Draw Loop** allowed for a much smoother frame rate compared to traditional procedural libraries. By leveraging color-sampling for collision detection, the system remains computationally efficient even as more visual elements are added to the canvas.
