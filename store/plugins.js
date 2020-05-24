export const pluginsImpl = (store) => {
  store.notOutOfBounds = (x, y) => {
    let notOut = false
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      notOut = true
    }
    return notOut
  }
}
