function srtfScheduling(processes) {
    let time = 0, completed = 0, n = processes.length;
    const rem = processes.map(p => p.burstTime);
    const gantt = [];
    let lastPid = null;
  
    while (completed < n) {
      let idx = -1, min = Infinity;
      for (let i = 0; i < n; i++) {
        if (processes[i].arrivalTime <= time && rem[i] > 0 && rem[i] < min) {
          min = rem[i];
          idx = i;
        }
      }
  
      if (idx === -1) {
        time++;
      } else {
        if (lastPid !== processes[idx].pid) {
          gantt.push({ pid: processes[idx].pid, start: time, end: time + 1 });
        } else {
          gantt[gantt.length - 1].end++;
        }
  
        rem[idx]--;
        if (rem[idx] === 0) {
          completed++;
          processes[idx].completionTime = time + 1;
          processes[idx].turnaroundTime = processes[idx].completionTime - processes[idx].arrivalTime;
          processes[idx].waitingTime = processes[idx].turnaroundTime - processes[idx].burstTime;
        }
  
        lastPid = processes[idx].pid;
        time++;
      }
    }
  
    return { processes, gantt };
  }
  