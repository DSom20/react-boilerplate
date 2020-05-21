/**
 *
 * Tests for NewTidbit
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { NewTidbit, mapDispatchToProps } from '../index';
import { changeTidbit, saveTidbit, resetTidbit } from '../actions';
// import { DEFAULT_LOCALE } from '../../../i18n';
// import { changeUsername } from '../actions';
// import { loadRepos } from '../../App/actions';
import configureStore from '../../../configureStore';

describe('<NewTidbit />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    // const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewTidbit
            tidbit=""
            saving={false}
            resulted={false}
            error={false}
            onChangeTidbit={() => {}}
            onSubmitForm={() => {}}
            onUnmount={() => {}}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewTidbit
            tidbit=""
            saving={false}
            resulted={false}
            error={false}
            onChangeTidbit={() => {}}
            onSubmitForm={() => {}}
            onUnmount={() => {}}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('Should call onChangeTidbit with change event on input field', () => {
    const onChangeTidbitSpy = jest.fn();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewTidbit
            tidbit=""
            saving={false}
            resulted={false}
            error={false}
            onChangeTidbit={onChangeTidbitSpy}
            onSubmitForm={() => {}}
            onUnmount={() => {}}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(onChangeTidbitSpy).not.toHaveBeenCalled();
    const inputField = getByPlaceholderText(
      'Whatever tidbit you can think of!',
    );
    fireEvent.change(inputField, { target: { value: 'a' } });
    expect(onChangeTidbitSpy).toHaveBeenCalled();
  });

  it('Should call onSubmitForm with submit event from form', () => {
    const submitSpy = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewTidbit
            tidbit=""
            saving={false}
            resulted={false}
            error={false}
            onChangeTidbit={() => {}}
            onSubmitForm={submitSpy}
            onUnmount={() => {}}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
    const form = getByTestId('tidbitForm');
    fireEvent.submit(form);
    expect(submitSpy).toHaveBeenCalled();
  });

  it('Should call onUnmount when unmounts', () => {
    const onUnmountSpy = jest.fn();
    const { unmount } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NewTidbit
            tidbit=""
            saving={false}
            resulted={false}
            error={false}
            onChangeTidbit={() => {}}
            onSubmitForm={() => {}}
            onUnmount={onUnmountSpy}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(onUnmountSpy).not.toHaveBeenCalled();
    unmount();
    expect(onUnmountSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeTidbit', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeTidbit).toBeDefined();
      });

      it('should dispatch changeTidbit when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const tidbit = 'sweet tidbit!';
        const mockEvent = { target: { value: tidbit } };
        result.onChangeTidbit(mockEvent);
        expect(dispatch).toHaveBeenCalledWith(changeTidbit(tidbit));
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch saveTidbit when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(saveTidbit());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalled();
      });
    });

    describe('onUnmount', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onUnmount).toBeDefined();
      });

      it('should dispatch resetTidbit when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onUnmount();
        expect(dispatch).toHaveBeenCalledWith(resetTidbit());
      });
    });
  });
});
