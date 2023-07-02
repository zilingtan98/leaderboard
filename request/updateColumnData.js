import axios from 'axios';

export const updateColumnData = async (columnName, raceId, userId, value) => {
  try {
    const response = await axios.post('api/updateColumnDataRaceRecords', {
      columnName: columnName,
      raceId: raceId,
      userId: userId,
      value: value
    });
    console.log('Column updated successfully');
  } catch (error) {
    console.error('Error updating column:', error);
  }
};
