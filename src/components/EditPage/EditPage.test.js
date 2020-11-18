import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'
import EditPage from "./index"
import { Provider } from 'react-redux';

const middlewares = []
const mockStore = configureStore(middlewares)

// jest.mock("react-redux", () => ({
//     connect: () => jest.fn(),
//     useSelector: jest.fn(fn => fn()),
//     useDispatch: () => jest.fn()
//   }));

describe("Edit page", ()=>{
    let wrapper;
    let store;
    let component;

    beforeEach(()=>{
        const initialState = {headerColor: "#8ae6fd"}
        store = mockStore(initialState)
    
        wrapper = shallow(
              <EditPage store={store} />
        );
        component = wrapper.dive();
    });
    
    
    // it("render 5 options", ()=>{
    //     expect(component.dive().find('option')).toHaveLength(5)
    // })

    it("default color from store - #8ae6fd", ()=>{
        expect(component.props().color).toBe("#8ae6fd")
    })

})