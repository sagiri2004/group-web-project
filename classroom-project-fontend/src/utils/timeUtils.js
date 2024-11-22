function calculateTimeSince(createdAt) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  // Calculate the number of milliseconds between the current date and the given date
  const diffTime = Math.abs(currentDate - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} months`;
  } else {
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} years`;
  }
}

export { calculateTimeSince };
