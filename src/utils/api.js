const API_URL = 'https://json.freeastrologyapi.com/planets';
const API_KEY = 'QaV64fNyU42hzevRgozgq7gWIFHEbM0h6A0uZpJm';

export async function fetchAstrologyData(birthDetails) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        ...birthDetails,
        settings: {
          observation_point: "topocentric",
          ayanamsha: "lahiri"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching astrology data:', error);
    throw error;
  }
}