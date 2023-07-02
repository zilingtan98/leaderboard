import axios from 'axios';

export const removeColumn = async (columnName) => {
  try {
    const response = await axios.post('api/removeColumnInRaceRecords', {
      columnName: columnName,
    });
    const data = await response.json();
    console.log('Column added successfully');
  } catch (error) {
    console.error('Error adding column:', error);
  }
};
