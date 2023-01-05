const Shuffle = (data) => {
  const shuffled = data.sort(() => 0.5 - Math.random())
  let shuffledData = shuffled.slice(0, 12)
  return shuffledData
}
export default Shuffle
