export const convertToFormData = (
  data,
  formData = new FormData(),
  parentKey = ''
) => {
  if (typeof data === 'object' && !Array.isArray(data)) {
    for (const key in data) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      convertToFormData(data[key], formData, fullKey);
    }
  } else if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const fullKey = `${parentKey}[${index}]`;
      convertToFormData(item, formData, fullKey);
    });
  } else {
    formData.append(parentKey, data);
  }

  return formData;
};
