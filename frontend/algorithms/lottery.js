function lotteryScheduling(processes) {
    // Assign default tickets if not provided
    processes.forEach(p => {
      p.tickets = Math.floor(Math.random() * 10) + 1; // Random tickets 1-10
      p.remainingTime = p.burstTime;
    });
  
    const totalTime = processes.reduce((sum, p) => sum + p.burstTime, 0);
    const gantt = [];
    let currentTime = 0;
  
    const finished = new Set();
  
    while (finished.size < processes.length) {
      const activeProcesses = processes.filter(p => p.arrivalTime <= currentTime && !finished.has(p.pid));
  
      if (activeProcesses.length === 0) {
        currentTime++;
        continue;
      }
  
      // Create lottery pool
      let pool = [];
      activeProcesses.forEach(p => {
        for (let i = 0; i < p.tickets; i++) {
          pool.push(p.pid);
        }
      });
  
      const winnerPid = pool[Math.floor(Math.random() * pool.length)];
      const proc = processes.find(p => p.pid === winnerPid);
  
      const start = currentTime;
      const execTime = 1; // Run 1 unit of time for simplicity
      proc.remainingTime -= execTime;
      currentTime += execTime;
  
      gantt.push({ pid: proc.pid, start, end: currentTime });
  
      if (proc.remainingTime === 0) {
        proc.completionTime = currentTime;
        proc.turnaroundTime = proc.completionTime - proc.arrivalTime;
        proc.waitingTime = proc.turnaroundTime - proc.burstTime;
        finished.add(proc.pid);
      }
    }
  
    return { gantt, processes };
  }
  