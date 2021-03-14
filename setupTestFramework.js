import '@testing-library/jest-dom/extend-expect';
import fetch from 'node-fetch';

// Some tests perform async requires so they have a chance to setup objects on
// the global scope. This causes React to throw an invalid hooks error when
// rendering Emotion components.
//
// One such affected test is:
// packages/netlify-cms-backend-git-gateway/src/__tests__/AuthenticationPage.spec.js
//
// This workaround ensures that the async required components use the same
// instance of React and React DOM.
//
// Reference:
// https://github.com/facebook/jest/issues/8987
const mockActualRegistry = {};
['react', 'react-dom'].forEach(moduleName => {
  jest.doMock(moduleName, () => {
    if (!mockActualRegistry[moduleName]) {
      mockActualRegistry[moduleName] = jest.requireActual(moduleName);
    }
    return mockActualRegistry[moduleName];
  });
});

jest.mock('path', () => {
  const actual = jest.requireActual('path');
  return {
    ...actual.posix,
  };
});

window.fetch = fetch;
window.URL.createObjectURL = jest.fn();
