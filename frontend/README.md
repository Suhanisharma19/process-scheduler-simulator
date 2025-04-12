# 🧠 CPU Scheduling Visualizer

A web-based **process-scheduler Simulator** that helps visualize how different scheduling algorithms work using **Gantt Charts**. Perfect for students, educators, and developers looking to understand the intricacies of CPU scheduling in operating systems.

---

## 🚀 Features

✅ Add processes with:
- **Arrival Time**
- **Burst Time**
- **Priority** *(optional)*
- **Mood** *(for fun scheduling!)*

✅ Select from multiple scheduling algorithms:
- **FCFS** (First-Come, First-Served)
- **SJF** (Shortest Job First)
- **SRTF** (Shortest Remaining Time First)
- **RR** (Round Robin) – with time quantum
- **Priority Scheduling**
- **MLFQ** (Multilevel Feedback Queue)
- **Lottery Scheduling**
- **Suhani Custom Algorithm** ✨
- **Mood-Based Scheduling** 😄

✅ Visualizations:
- Interactive **Gantt Chart**
- **Dynamic Timeline** showing process execution
- Calculation of:
  - **Turnaround Time**
  - **Waiting Time**

---

📁 PROCESS-SCHEDULER-SIMULATOR/
│
├── 📄 process.html                 # Main webpage UI
├── 📄 process.css                  # CSS styling for the visualizer
├── 📄 process.js                   # Handles UI logic and algorithm switching
├── 📄 manifest.json                # PWA manifest file
├── 📄 favicon.ico                 # Favicon icon for browser tab
├── 📄 icon-192.png                # App icon for Android/PWA (192x192)
├── 📄 icon-512.png                # App icon for Android/PWA (512x512)
├── 📄 README.md                   # Project documentation
│
├── 📁 algorithms/                 # Modular CPU scheduling algorithms
│   ├── fcfs.js                    # First Come First Serve
│   ├── sjf.js                     # Shortest Job First (Non-preemptive)
│   ├── srtf.js                    # Shortest Remaining Time First (Preemptive)
│   ├── rr.js                      # Round Robin Scheduling
│   ├── priority.js                # Priority Scheduling (Non-preemptive)
│   ├── mlfq.js                    # Multilevel Feedback Queue
│   ├── lottery.js                 # Lottery Scheduling
│   ├── suhaniCustom.js           # Custom Scheduling by Suhani
│   ├── mood.js                   # Mood-Based Scheduling (fun/creative logic)



---

## 🛠 How to Run

1. **Clone** or **Download** this repository
2. **Open** `index.html` in any modern browser (Chrome, Firefox, Edge, etc.)
3. **Add Processes** using the input table
4. **Select an Algorithm** from the dropdown
5. **Click "Run"** to see the output and Gantt chart

---

## ✨ Screenshots
![process scheduler screenshot](<screenshot 2 (2).png>)
![process scheduler screensho](<Screenshot 1.png>)
## 🧪 Sample Usage

1. Add 3 processes: `P1`, `P2`, `P3` with different **Arrival** & **Burst** times
2. Choose **Round Robin** with `Quantum = 2`
3. Click **Run**
4. View:
   - **Gantt Chart**
   - **Turnaround & Waiting Times**

---

## 🧠 Custom Algorithms

This simulator includes:
- 🎯 **Suhani Custom Scheduling**: An innovative strategy to explore new logic!
- 🎭 **Mood-Based Scheduling**: Adds a fun twist with moods like "Happy", "Lazy", or "Hyper" affecting execution 😄

Use these for educational experimentation and exploration!

---

## 📌 Requirements

- No installation required ✅  
- Fully **client-side**  
- Works offline in any modern browser

---

## 📬 Feedback & Contributions

Have suggestions, improvements, or ideas for new algorithms?  
Feel free to open an issue, fork the repo, or contribute directly!  
Let's make scheduling fun and visual!

---

## 👩‍💻 Author

**Suhani Kumari**  
B.Tech CSE Student | Passionate about DSA & Web Development  
Made with ❤️ for learners and curious minds.

---

