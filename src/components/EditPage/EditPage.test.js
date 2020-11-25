import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import EditPage from "./index"


const middlewares = []
const mockStore = configureStore(middlewares)

describe("Edit page", ()=>{
    let wrapper;
    let store;
    let component;

    beforeEach(()=>{
        const initialState = {headerColor: "#8ae6fd"}
        store = mockStore(initialState)
    
        wrapper = mount(
              <EditPage store={store} />
        );
        component = wrapper.childAt(0);
    });
    

    it("default color from store - #8ae6fd", ()=>{
        // expect(component.find(SelectColor).length).toBe(1)
        expect(component.props().color).toBe("#8ae6fd")
    })

})