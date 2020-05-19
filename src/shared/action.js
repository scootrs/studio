export default function action(type, payload = null, error = false) {
  return {
    type,
    error,
    payload,
  };
}
