function formatTimeDifference(timestamp: string | number | Date): string {
    const currentTime: Date = new Date();
    const inputTime: Date = new Date(timestamp);
    const timeDifference: number = currentTime.getTime() - inputTime.getTime();
    const daysDifference: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (daysDifference === 0) {
      return "Today";
    } else {
      return `${daysDifference} ${daysDifference === 1 ? "Day" : "Days"} ago`;
    }
}

export default formatTimeDifference;
