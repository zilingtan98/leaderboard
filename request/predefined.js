import axios from 'axios';

export const predefined = async () => {
  try {
    const response = await axios.post('api/predefinedValue', {
    });
    console.log('Predefined value successfully added.');
  } catch (error) {
    console.error('Error adding column:', error);
  }
};
