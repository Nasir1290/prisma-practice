// exclude all deselected field
const excludeFields = (model, deselectFields=[]) => {
  const allFields = Object.keys(model);
  const selectedFields = {};
  allFields.forEach((field) => {
    if (!deselectFields?.includes(field)) {
      selectedFields[field] = true;
    }
  });
  return selectedFields;
};


export default excludeFields;