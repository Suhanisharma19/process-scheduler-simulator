function mlfqScheduling(processes) {
    // Define three queues with different time quantums
    const queues = [
      { quantum: 4, processes: [] },
      { quantum: 8, processes: [] },
      { quantum: null, processes: [] }, // FCFS for the last queue
    ];
  
    // Deep clone of input processes to avoid mutation
    const processMap = new Map();
    processes.forEach(p => {
      processMap.set(p.pid, {
        ...p,
        remainingTime: p.burstTime,
        queueLevel: 0,
        completed: false
      });
      queues[0].processes.push(p.pid); // initially all processes in Queue 0
    });
  
    const gantt = [];
    let currentTime = 0;
    const result = [];
  
    while (Array.from(processMap.values()).some(p => !p.completed)) {
      let found = false;
  
      for (let i = 0; i < queues.length; i++) {
        const queue = queues[i];
  
        for (let j = 0; j < queue.processes.length; j++) {
          const pid = queue.processes[j];
          const proc = processMap.get(pid);
  
          if (proc.arrivalTime > currentTime || proc.completed) continue;
  
          found = true;
          const start = currentTime;
          let execTime;
  
          if (queue.quantum === null || proc.remainingTime <= queue.quantum) {
            execTime = proc.remainingTime;
          } else {
            execTime = queue.quantum;
          }
  
          proc.remainingTime -= execTime;
          currentTime += execTime;
  
          gantt.push({ pid: proc.pid, start, end: currentTime });
  
          if (proc.remainingTime === 0) {
            proc.completed = true;
            proc.completionTime = currentTime;
            proc.turnaroundTime = proc.completionTime - proc.arrivalTime;
            proc.waitingTime = proc.turnaroundTime - proc.burstTime;
            result.push(proc);
            queue.processes.splice(j, 1);
            j--;
          } else {
            queue.processes.splice(j, 1);
            j--;
  
            if (i + 1 < queues.length) {
              queues[i + 1].processes.push(proc.pid); // demote to lower queue
              proc.queueLevel = i + 1;
            } else {
              queues[i].processes.push(proc.pid); // stay in same queue if it's the last
            }
          }
  
          break; // once we find a process to execute, break to simulate RR
        }
  
        if (found) break;
      }
  
      if (!found) currentTime++; // CPU idle
    }
  
    return { gantt, processes: result.sort((a, b) => a.pid.localeCompare(b.pid)) };
  }
  