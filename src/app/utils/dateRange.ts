export const dateRange = (range: number) => {
  let formattedStartDate;
  let formattedEndDate;
  if (range === 1) {
    const currentTime = Date.now();
    const date = new Date(currentTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    formattedStartDate = `${year}-${month}-${day}`;
    formattedEndDate = `${year}-${month}-${day}`;
  } else {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getTime() - range * 24 * 60 * 60 * 1000,
    );
    const endDate = currentDate;
    // Format as YYYY-MM-DD:
    formattedStartDate = startDate.toISOString().slice(0, 10);
    formattedEndDate = endDate.toISOString().slice(0, 10);
  }

  const date = {
    formattedStartDate,
    formattedEndDate,
  };
  return date;
};
