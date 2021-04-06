import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })


beforeAll(() => {
  global.fetch = jest.fn(); 
});
let wrapper;
beforeEach(() => {
   wrapper = shallow(<App />, { disableLifecycleMethods: true });
   //console.log(wrapper.debug())
});
afterEach(() => {
  //console.log(wrapper.debug())
   wrapper.unmount();
});
it("must render a loading span before api call success", () => {
  expect(wrapper.find("ForwardRef.loading").exists()).toBeTruthy()
});
it("must show the error message and hide the loading span after api call success", 
(done) => {
// here we are spying on componentDidMount to know that it has been called
const spyDidMount = jest.spyOn(App.prototype,"componentDidMount");
fetch.mockImplementation(() => {
   return Promise.resolve({
     status: 404
   
  });
});
const didMount = wrapper.instance().componentDidMount();
console.log(didMount)
//expecting componentDidMount have been called
expect(spyDidMount).toHaveBeenCalled();
didMount.then(() => {
//  updating the wrapper
    wrapper.update();
    expect(wrapper.find("ForwardRef.loading").length).toBe(0)
    //console.log(wrapper.state().hasError)
    expect(wrapper.state().hasError === true)
    spyDidMount.mockRestore();
    fetch.mockClear();
    done();
 });
});


