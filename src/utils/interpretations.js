const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const vedicMeanings = {
  "Sun": {
    4: "Sun in Cancer indicates emotional sensitivity and strong connection with family. Your leadership style is nurturing and protective. In Vedic astrology, this placement suggests deep spiritual connection with mother and motherland.",
    5: "Sun in Leo shows natural leadership abilities and creative expression. You have a royal demeanor and command respect naturally."
  },
  "Moon": {
    10: "Moon in Capricorn suggests emotional stability and practical approach to feelings. You seek security through achievement and structure. In Vedic terms, this placement indicates Raja Yoga, bringing material and spiritual success.",
  },
  "Mars": {
    2: "Mars in Taurus gives you determined energy and practical approach to action. According to Vedic wisdom, this placement blesses you with Bhumi Yoga, bringing property and land ownership.",
  },
  "Jupiter": {
    12: "Jupiter in Pisces is in its own sign, creating a powerful Hamsa Yoga. This brings spiritual wisdom, intuition, and divine protection. You have natural teaching abilities and deep philosophical understanding.",
  },
  "Venus": {
    4: "Venus in Cancer enhances emotional intelligence and artistic sensitivity. In Vedic astrology, this placement creates Malavya Yoga, bringing beauty, comfort, and harmonious relationships.",
  },
  "Saturn": {
    10: "Saturn in Capricorn is exalted, forming Sasa Yoga. This brings discipline, authority, and success through hard work. You have excellent organizational abilities and leadership skills.",
  },
  "Rahu": {
    1: "Rahu in Aries brings innovative thinking and unconventional approaches. This placement can bring sudden opportunities and material gains through new ventures.",
  },
  "Ketu": {
    7: "Ketu in Libra indicates past life connections with relationships and partnerships. This placement brings spiritual wisdom in dealing with others and detachment from material partnerships.",
  },
  "Mercury": {
    5: "Mercury in Leo gives dramatic communication style and leadership in intellectual matters. This placement blesses you with creative intelligence and ability to command attention.",
  },
  "Ascendant": {
    9: "Ascendant in Sagittarius makes you philosophical, optimistic, and adventure-loving. You have natural teaching abilities and strong ethical principles.",
  }
};

export function getVedicInterpretations(data) {
  return Object.entries(data).map(([planet, details]) => ({
    planet,
    sign: zodiacSigns[details.current_sign - 1],
    meaning: vedicMeanings[planet]?.[details.current_sign] || 
      `${planet} in ${zodiacSigns[details.current_sign - 1]} influences your cosmic energy according to Vedic wisdom.`,
    retrograde: details.isRetro === "true",
    degree: details.normDegree
  }));
}

export function processAstrologyData(data) {
  // Handle both direct format and nested format
  const planetData = data[1] || data;
  
  // Filter out non-planet entries and format the data
  return Object.entries(planetData).reduce((acc, [key, value]) => {
    if (key !== 'ayanamsa' && key !== 'debug' && typeof value === 'object') {
      acc[key] = value;
    }
    return acc;
  }, {});
}