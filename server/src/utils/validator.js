function validateEntries(data) {
  const validEdges = [];
  const invalidEntries = [];

  for (let item of data) {
    const entry = String(item).trim();

    if (!/^[A-Z]->[A-Z]$/.test(entry)) {
      invalidEntries.push(item);
      continue;
    }

    const [parent, child] = entry.split("->");

    if (parent === child) {
      invalidEntries.push(item);
      continue;
    }

    validEdges.push(entry);
  }

  return {
    validEdges,
    invalidEntries,
  };
}

module.exports = validateEntries;