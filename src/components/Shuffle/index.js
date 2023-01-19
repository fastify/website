function Shuffle(data, { maxItems }) {
  const shuffled = data.sort(() => 0.5 - Math.random())
  if (maxItems) {
    return shuffled.slice(0, maxItems)
  }

  return shuffled
}

export default Shuffle
