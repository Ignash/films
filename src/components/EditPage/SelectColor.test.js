import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import SelectColor from "./SelectColor"


const middlewares = []
const mockStore = configureStore(middlewares)

describe("Edit Page Select color", ()=>{
    let wrapper;
    let store;
    let component;
    let select
    const onChange = jest.fn();
    let value = "#f3ae56";

    beforeEach(()=>{
        wrapper = mount(
              <SelectColor color={"#8ae6fd"} changeColor={onChange} />
        );
      
        component = wrapper;
        select = wrapper.find('select')
    });
    
    
    it("start with color #8ae6fd", ()=>{
        expect(wrapper.find('select').getDOMNode().value).toBe('#8ae6fd')
    })

    it('Changes select value', () => {
      
        component.find('select').simulate('change', {target: {value}});
        expect(onChange).toBeCalledWith(value);
        
      });

})