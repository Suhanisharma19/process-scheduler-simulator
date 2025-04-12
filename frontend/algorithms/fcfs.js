function fcfsScheduling(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0, gantt = [];
    processes.forEach(p => {
      currentTime = Math.max(currentTime, p.arrivalTime);
      p.startTime = currentTime;
      p.completionTime = currentTime + p.burstTime;
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.turnaroundTime - p.burstTime;
      gantt.push({ pid: p.pid, start: p.startTime, end: p.completionTime });
      currentTime = p.completionTime;
    });
    return { processes, gantt };
  }
  