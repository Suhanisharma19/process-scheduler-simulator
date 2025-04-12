function rrScheduling(processes, quantum) {
    let time = 0, queue = [], idx = 0, n = processes.length;
    const rem = processes.map(p => p.burstTime);
    const gantt = [];
    const visited = new Array(n).fill(false);
  
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    queue.push(0);
    visited[0] = true;
  
    while (queue.length) {
      idx = queue.shift();
      const p = processes[idx];
  
      if (p.startTime === undefined) p.startTime = time;
  
      const execTime = Math.min(quantum, rem[idx]);
      gantt.push({ pid: p.pid, start: time, end: time + execTime });
      rem[idx] -= execTime;
      time += execTime;
  
      for (let i = 0; i < n; i++) {
        if (!visited[i] && processes[i].arrivalTime <= time && rem[i] > 0) {
          queue.push(i);
          visited[i] = true;
        }
      }
  
      if (rem[idx] > 0) {
        queue.push(idx);
      } else {
        p.completionTime = time;
        p.turnaroundTime = p.completionTime - p.arrivalTime;
        p.waitingTime = p.turnaroundTime - p.burstTime;
      }
    }
  
    return { processes, gantt };
  }
  