import makeSelectNewTidbit, {
  selectNewTidbitDomain,
  selectTidbit,
  makeSelectTidbit,
  makeSelectSaving,
  makeSelectResulted,
  makeSelectError,
} from '../selectors';
import { initialState, domainKey } from '../reducer';

describe('selectNewTidbitDomain', () => {
  it('should select the newTidbit state from global state', () => {
    const newTidbitState = { ...initialState };
    const mockedGlobalState = {
      [domainKey]: newTidbitState,
      someOtherDomain: {},
    };
    expect(selectNewTidbitDomain(mockedGlobalState)).toEqual(newTidbitState);
  });

  it('should return initialState as found in reducer if cannot find newTidbit state on global state', () => {
    const mockedGlobalState = {
      someOtherDomain: {},
    };
    expect(selectNewTidbitDomain(mockedGlobalState)).toEqual(initialState);
  });
});

describe('makeSelectNewTidbit', () => {
  const newTidbitDomainSelector = makeSelectNewTidbit();
  it('should select newTidbit state', () => {
    const newTidbitState = { ...initialState };
    const mockedState = {
      [domainKey]: newTidbitState,
      someOtherDomain: {},
    };
    expect(newTidbitDomainSelector(mockedState)).toEqual(newTidbitState);
  });
});

describe('selectTidbit', () => {
  it('should select current tidbit', () => {
    const tidbit = 'hello';
    const mockedState = {
      [domainKey]: { ...initialState, tidbit },
      someOtherDomain: {},
    };
    expect(selectTidbit(mockedState)).toEqual(tidbit);
  });
});

describe('makeSelectTidbit', () => {
  const tidbitSelector = makeSelectTidbit();
  it('should select the tidbit', () => {
    const tidbit = 'hello';
    const mockedState = {
      [domainKey]: { ...initialState, tidbit },
      someOtherDomain: {},
    };
    expect(tidbitSelector(mockedState)).toEqual(tidbit);
  });
});

describe('makeSelectSaving', () => {
  const savingSelector = makeSelectSaving();
  it('should select the saving state', () => {
    const saving = true;
    const mockedState = {
      [domainKey]: { ...initialState, saving },
      someOtherDomain: {},
    };
    expect(savingSelector(mockedState)).toEqual(saving);
  });
});

describe('makeSelectResulted', () => {
  const resultedSelector = makeSelectResulted();
  it('should select the resulted state', () => {
    const resulted = false;
    const mockedState = {
      [domainKey]: { ...initialState, resulted },
      someOtherDomain: {},
    };
    expect(resultedSelector(mockedState)).toEqual(resulted);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error state', () => {
    const error = false;
    const mockedState = {
      [domainKey]: { ...initialState, error },
      someOtherDomain: {},
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});
