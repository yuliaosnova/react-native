export function getUserLetter(name = "anonymous") {
  let letter = name.trim().slice(0, 1).toUpperCase();
  return letter;
}
