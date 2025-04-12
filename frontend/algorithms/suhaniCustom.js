function suhaniCustomScheduling(processes) {
    let queue = processes.map(p => ({
      ...p,
      remainingTime: p.burstTime,
      completed: false
    }));
  
    const gantt = [];
    let currentTime = 0;
    const result = [];
    const quantum = 2;
  
    while (queue.some(p => !p.completed)) {
      queue.sort((a, b) => {
        if (a.arrivalTime === b.arrivalTime) return a.burstTime - b.burstTime;
        return a.arrivalTime - b.arrivalTime;
      });
  
      const current = queue.find(p => p.arrivalTime <= currentTime && !p.completed);
  
      if (!current) {
        currentTime++;
        continue;
      }
  
      const execTime = Math.min(current.remainingTime, quantum);
      const start = currentTime;
      currentTime += execTime;
      current.remainingTime -= execTime;
  
      gantt.push({ pid: current.pid, start, end: currentTime });
  
      if (current.remainingTime === 0) {
        current.completed = true;
        current.completionTime = currentTime;
        current.turnaroundTime = current.completionTime - current.arrivalTime;
        current.waitingTime = current.turnaroundTime - current.burstTime;
        result.push(current);
      }
    }
  
    return { gantt, processes: result };
  }
  