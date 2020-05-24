export const state = () => ({
  initialChessboard: [
    [
      { piece: 2 },
      { piece: 1 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 1 },
      { piece: 2 }
    ],
    [
      { piece: 3 },
      { piece: 1 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 1 },
      { piece: 3 }
    ],
    [
      { piece: 4 },
      { piece: 1 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 1 },
      { piece: 4 }
    ],
    [
      { piece: 6 },
      { piece: 1 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 1 },
      { piece: 6 }
    ],
    [
      { piece: 5 },
      { piece: 1 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 1 },
      { piece: 5 }
    ],
    [
      { piece: 4 },
      { piece: 1 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 1 },
      { piece: 4 }
    ],
    [
      { piece: 3 },
      { piece: 1 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 1 },
      { piece: 3 }
    ],
    [
      { piece: 2 },
      { piece: 1 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 0 },
      { piece: 1 },
      { piece: 2 }
    ]
  ],
  types: [
    {
      id: 1,
      type: 'pawn',
      module: 'pawn'
    },
    {
      id: 2,
      type: 'tower',
      module: 'piece'
    },
    {
      id: 3,
      type: 'horse',
      module: 'horse'
    },
    {
      id: 4,
      type: 'bishop',
      module: 'piece'
    },
    {
      id: 5,
      type: 'king',
      module: 'king'
    },
    {
      id: 6,
      type: 'queen',
      module: 'piece'
    }
  ]
})

export const getters = {
  getChessboard: (state) => () => {
    return state.initialChessboard
  },
  getTypePieces: (state) => () => {
    return state.types
  }
}

/*getPieceLogic(piece, x, y, direction) {
    let pieceLogic = {}
    switch (piece) {
      case 1:
        pieceLogic = new PeoLogic(x, y, direction)
        break
      case 2:
        pieceLogic = new TorreLogic(x, y, direction)
        break
      case 3:
        pieceLogic = new CavallLogic(x, y, direction)
        break
      case 4:
        pieceLogic = new AlfilLogic(x, y, direction)
        break
      case 5:
        pieceLogic = new ReiLogic(x, y, direction)
        break
      case 6:
        pieceLogic = new ReinaLogic(x, y, direction)
        break
    }
    return pieceLogic
  }
  setPositions() {
     let direction = -1
    this.chessboard.forEach((x, ix) => {
      x.forEach((y, iy) => {
        if (iy < 2) {
          direction = 1
        } else {
          direction = -1
        }
        const piece = this.getPieceLogic(y.piece, ix, iy, direction)
        // this.chessboard[ix][iy].pieceLogic = piece
      })
    })*/
