function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function exportCSV() {
  const rows = document.getElementById("output").innerText.split("\n");
  const csvContent = rows.map(row => row.replace(/\t/g, ",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", "scheduler_output.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

let processCount = 0;

function addRow() {
  processCount++;
  const tableBody = document.getElementById("process-body");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input value="P${processCount}" readonly></td>
    <td><input type="number" class="arrival" min="0" required></td>
    <td><input type="number" class="burst" min="1" required></td>
    <td><input type="number" class="priority" min="1" required style="display: none;"></td>
    <td>
      <select class="mood" style="display: none;">
        <option value="angry">😡 Angry</option>
        <option value="happy" selected>😄 Happy</option>
        <option value="sleepy">😴 Sleepy</option>
      </select>
    </td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
  `;

  tableBody.appendChild(row);
  handleAlgorithmChange();
}

function deleteRow(button) {
  const row = button.closest("tr");
  row.remove();
}

function resetTable() {
  document.getElementById("process-body").innerHTML = "";
  document.getElementById("gantt-chart").innerHTML = "";
  document.getElementById("output").innerText = "";
  processCount = 0;
}

function handleAlgorithmChange() {
  const algorithm = document.getElementById("algorithm").value;

  const moodInputs = document.querySelectorAll(".mood");
  const moodHeaders = document.querySelectorAll(".mood-col");
  moodInputs.forEach(input => {
      const visible = algorithm === "mood";
      input.style.display = visible ? "inline-block" : "none";
      input.parentElement.style.display = visible ? "table-cell" : "none";
  });
  moodHeaders.forEach(header => {
      header.style.display = algorithm === "mood" ? "table-cell" : "none";
  });

  const quantumInput = document.getElementById("quantum-input");
  quantumInput.style.display = ["rr", "mlfq"].includes(algorithm) ? "block" : "none";

  const priorityInputs = document.querySelectorAll(".priority");
  const requiresPriority = ["priority", "mlfq", "lottery"].includes(algorithm);

  priorityInputs.forEach(input => {
      input.style.display = requiresPriority ? "inline-block" : "none";
      input.parentElement.style.display = requiresPriority ? "table-cell" : "none";
  });

  const priorityHeaders = document.querySelectorAll(".priority-col");
  priorityHeaders.forEach(header => {
      header.style.display = requiresPriority ? "table-cell" : "none";
  });
}

function runScheduler() {
  const rows = Array.from(document.querySelectorAll("#process-body tr"));
  if (rows.length === 0) {
      alert("Please add at least one process.");
      return;
  }

  const processes = rows.map(row => {
      const pid = row.cells[0].querySelector("input").value;
      const arrivalTime = parseInt(row.cells[1].querySelector("input").value);
      const burstTime = parseInt(row.cells[2].querySelector("input").value);
      const priority = row.cells[3].querySelector(".priority")?.value || null;
      return {
          pid,
          arrivalTime,
          burstTime,
          priority: priority ? parseInt(priority) : null
      };
  });

  const algo = document.getElementById("algorithm").value;
  let result;

  switch (algo) {
      case "fcfs":
          result = fcfsScheduling(processes);
          break;
      case "sjf":
          result = sjfScheduling(processes);
          break;
      case "srtf":
          result = srtfScheduling(processes);
          break;
      case "rr":
          const quantum = parseInt(document.getElementById("quantum").value);
          if (isNaN(quantum) || quantum <= 0) {
              alert("Enter a valid quantum.");
              return;
          }
          result = rrScheduling(processes, quantum);
          break;
          case "priority":
            console.log("Running priority scheduling");
            if (!processes.every(p => p.priority !== null)) {
                alert("Please enter priority for all processes.");
                return;
            }
            result = priorityScheduling(processes); 
            break;
        
      case "mlfq":
          const q = parseInt(document.getElementById("quantum").value);
          if (isNaN(q) || q <= 0) {
              alert("Enter a valid base quantum for MLFQ.");
              return;
          }
          result = mlfqScheduling(processes);
          break;
      case "lottery":
          result = lotteryScheduling(processes);
          break;
      case "suhani":
          result = suhaniCustomScheduling(processes);
          break;
      case "mood":
          processes.forEach((p, i) => {
              const row = rows[i];
              const moodSelect = row.querySelector(".mood");
              p.mood = moodSelect.value;
          });
          result = moodBasedScheduling(processes);
          break;
      default:
          alert("Invalid algorithm selected.");
          return;
  }

  showGanttChart(result.gantt);
  showOutput(result.processes);
}

const TIME_UNIT_WIDTH = 40; // Adjust as needed (e.g., 60 or 80 for larger bars)

function showGanttChart(gantt) {
  const chart = document.getElementById("gantt-chart");
  chart.innerHTML = "";

  let currentTime = Math.min(...gantt.map(g => g.start));
  const maxTime = Math.max(...gantt.map(g => g.end));
  const barMap = {};

  const interval = setInterval(() => {
    gantt.forEach(block => {
      if (currentTime >= block.start && currentTime < block.end) {
        const blockId = `gantt-${block.pid}-${block.start}`;

        // If this block hasn't been created yet, create and append it
        if (!barMap[blockId]) {
          const div = document.createElement("div");
          div.classList.add("gantt-block");
          div.setAttribute("id", blockId);
          div.setAttribute("data-time", `${block.start}-${block.end}`);
          div.style.left = `${block.start * TIME_UNIT_WIDTH}px`;
          div.style.width = `0px`; // Start with width 0, then grow

          div.textContent = `${block.pid}`;
          chart.appendChild(div);

          // Save reference to the bar
          barMap[blockId] = {
            element: div,
            elapsed: 0,
            duration: block.end - block.start
          };
        }

        // Grow the block
        const bar = barMap[blockId];
        bar.elapsed++;
        bar.element.style.width = `${bar.elapsed * TIME_UNIT_WIDTH}px`;

        // Tooltip showing remaining time
        const remaining = bar.duration - bar.elapsed;
        bar.element.title = `Remaining Burst: ${remaining >= 0 ? remaining : 0}`;
      }
    });

    currentTime++;
    if (currentTime > maxTime) clearInterval(interval);
  }, 700); // Adjust speed if needed
}


function showOutput(processes) {
  const avgWT = processes.reduce((sum, p) => sum + p.waitingTime, 0) / processes.length;
  const avgTAT = processes.reduce((sum, p) => sum + p.turnaroundTime, 0) / processes.length;

  let output = `Average Waiting Time: ${avgWT.toFixed(2)}\n`;
  output += `Average Turnaround Time: ${avgTAT.toFixed(2)}\n\n`;
  output += `Detailed Table:\n`;
  output += `PID\tAT\tBT\tCT\tTAT\tWT\n`;

  processes.forEach(p => {
      output += `${p.pid}\t${p.arrivalTime}\t${p.burstTime}\t${p.completionTime}\t${p.turnaroundTime}\t${p.waitingTime}\n`;
  });

  document.getElementById("output").innerText = output;
}