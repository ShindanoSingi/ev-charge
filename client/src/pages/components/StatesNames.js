// Extract state name from location
export const extractStateName = (location) => {
    const stateNames = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
        'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
        'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
        'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
        'WI', 'WY'];

    // Use a regular expression to match the state name
    const stateRegex = new RegExp(`\\b(${stateNames.join('|')})\\b`, 'gi');
    const match = location.match(stateRegex);

    if (match && match.length > 0) {
        // Return the first match
        return match[0];
    } else {
        return null;
    }
}