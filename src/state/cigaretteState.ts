import { EditedCigarette } from 'src/types'
import create from 'zustand/react'
type cigaretteState = {
  editedCigarette: EditedCigarette
  updateEditedCigarette: (payload: EditedCigarette) => void
  resetEditedCigarette: () => void
}

const useCigaretteState = create<cigaretteState>((set) => ({
  editedCigarette: {
    id: 0,
    name: '',
    amount: 500,
    numberOfCigarette: 20,
    tar: 1,
  },
  updateEditedCigarette: (payload) =>
    set({
      editedCigarette: {
        id: payload.id,
        name: payload.name,
        amount: payload.amount,
        numberOfCigarette: payload.numberOfCigarette,
        tar: payload.tar,
      },
    }),
  resetEditedCigarette: () =>
    set({
      editedCigarette: {
        id: 0,
        name: '',
        amount: 500,
        numberOfCigarette: 20,
        tar: 1,
      },
    }),
}))

export default useCigaretteState;
