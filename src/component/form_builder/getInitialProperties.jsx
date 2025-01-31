const getInitialProperties = (elementType) => {
    const baseProperties = {
      label: '',
      is_required: false,
      displayType: 'horizontal',
      min_length: '',
      max_length: '',
      pattern: '',
      defaultValue: ''
    };
  
    switch (elementType) {
      case 'passwords':
  return {
    ...baseProperties,
    min_length: '8',
    max_length: '32',
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  };
case 'slider-control':
  return {
    ...baseProperties,
    minValue: '0',
    maxValue: '100',
    step: '1',
    defaultValue: '50',
    showTicks: false
  };
  case 'signature':
    return {
...baseProperties,
      width: '100%',
      height: '200px',
      clearButton: false,
      backgroundColor: '#ffffff',
      borderColor: '#cccccc',
      



    }

  
      case 'radio':
        return {
          ...baseProperties,
          label: '',
          options: [
            { label: '', value: '', isDefault: false }
          ],
          displayType: 'horizontal'
        };
      case 'select':
        return {
          ...baseProperties,
          label: '',
          options: [
            { label: '', value: '', isDefault: false },
            { label: '', value: '', isDefault: false }
          ]
        };
      default:
        return baseProperties;
    }
  };

  export default getInitialProperties;