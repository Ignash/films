import React from 'react';
import { mount } from 'enzyme';
import SelectColor from "./SelectColor"

describe("Edit Page Select color", ()=>{
    let wrapper;
    let select
    const onChange = jest.fn();
    let value = "#f3ae56";

    beforeEach(()=>{
        wrapper = mount(
              <SelectColor color={"#8ae6fd"} changeColor={onChange} />
        );
      
        select = wrapper.find('select')
    });
    
    it("start with color #8ae6fd", ()=>{
        expect(select.getDOMNode().value).toBe('#8ae6fd')
    })

    it('Changes select value', () => {
      
        select.simulate('change', {target: {value}});
        expect(onChange).toBeCalledWith(value);
        
      });

})