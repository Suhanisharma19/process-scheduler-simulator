function sjfScheduling(processes) {
    let time = 0, gantt = [], completed = 0, n = processes.length;
    const done = new Array(n).fill(false);
  
    while (completed < n) {
      let idx = -1;
      for (let i = 0; i < n; i++) {
        if (!done[i] && processes[i].arrivalTime <= time) {
          if (idx === -1 || processes[i].burstTime < processes[idx].burstTime) {
            idx = i;
          }
        }
      }
  
      if (idx === -1) {
        time++;
      } else {
        const p = processes[idx];
        p.startTime = time;
        p.completionTime = time + p.burstTime;
        p.turnaroundTime = p.completionTime - p.arrivalTime;
        p.waitingTime = p.turnaroundTime - p.burstTime;
        gantt.push({ pid: p.pid, start: time, end: p.completionTime });
        time += p.burstTime;
        done[idx] = true;
        completed++;
      }
    }
  
    return { processes, gantt };
  }
  