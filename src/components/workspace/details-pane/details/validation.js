export function validateName(name) {
  let error = false;
  let caption = '';
  if (name !== '' && !/^([0-9a-z]+)$/gim.test(name)) {
    error = true;
    caption = 'Name must only contain alphanumeric characters';
  }
  return [error, caption];
}
