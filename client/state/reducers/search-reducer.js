// @flow

type State = {
  transcripts: string[],
  loading: boolean
};

const initialState = {
  transcripts: [],
  loading: false
};

export default function searchReducer(state: State = initialState, action: any) {
  switch (action.type) {
    default:
      return initialState;
  }
}
