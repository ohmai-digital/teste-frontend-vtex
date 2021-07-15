export function invalidFields(fields: JQuery<HTMLElement>[]) {
  const invalidFieldsNames: JQuery<HTMLElement>[] = [];
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].val() === "") {
      invalidFieldsNames.push(fields[i]);
    }
  }
  return invalidFieldsNames;
}
