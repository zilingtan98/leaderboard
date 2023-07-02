import axios from 'axios';

export const addColumn = async (columnName) => {
    console.log("HI")
  try {
    const response = await axios.post('api/addColumnToRaceRecords', {
      columnName: columnName,
    });
    const data = await response.json();
    console.log('Column added successfully');
  } catch (error) {
    console.error('Error adding column:', error);
  }
};
