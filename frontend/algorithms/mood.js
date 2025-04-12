function moodBasedScheduling(processes) {
    // Assign a mood weight: lower weight = higher priority
    const moodPriority = {
      angry: 1,   // Angry gets highest priority
      happy: 2,
      sleepy: 3   // Sleepy goes last
    };
  
    // Sort based on mood priority, then arrival time
    processes.sort((a, b) => {
      const moodA = moodPriority[a.mood];
      const moodB = moodPriority[b.mood];
  
      if (moodA === moodB) {
        return a.arrivalTime - b.arrivalTime;
      }
  
      return moodA - moodB;
    });
  
    let currentTime = 0;
    const gantt = [];
  
    processes.forEach(p => {
      const startTime = Math.max(currentTime, p.arrivalTime);
      const endTime = startTime + p.burstTime;
  
      gantt.push({
        pid: p.pid,
        start: startTime,
        end: endTime
      });
  
      p.completionTime = endTime;
      p.turnaroundTime = endTime - p.arrivalTime;
      p.waitingTime = p.turnaroundTime - p.burstTime;
  
      currentTime = endTime;
    });
  
    return { processes, gantt };
  }
  