import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={{
        "color": "",
        "code": {
          "hex": ""
        },
        "id":1
      }} />)
});
  
test("Renders the color passed into component", () => {
    render(<Color color ={ {
        "color": "aliceblue",
        "code": {
          "hex": "#f0f8ff"
        },
        "id": 1
      }}/>)

      const colorelement = screen.getByTestId('color')
      expect(colorelement).toHaveTextContent('aliceblue')

});
const fakeDelete = jest.fn();
const fakeEdit = jest.fn();
const fakeToggleEdit = jest.fn();

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    render(<Color color ={ {
        "color": "aliceblue",
        "code": {
          "hex": "#f0f8ff"
        },
        "id": 1}}  deleteColor ={ fakeDelete } toggleEdit = {fakeEdit}/>)

      const deletebutton = screen.getByTestId('delete')
      userEvent.click(deletebutton)
      expect(fakeDelete).toBeCalledTimes(1)
      expect(fakeEdit).toBeCalledTimes(1)

});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    
    render(<Color color ={ {
        "color": "aliceblue",
        "code": {
          "hex": "#f0f8ff"
        },
        "id": 1}}  setEditColor ={ fakeEdit } toggleEdit = {fakeToggleEdit}/>)

      const colordiv = screen.getByTestId('color')
      userEvent.click(colordiv)
      expect(fakeEdit).toBeCalledTimes(1)
      expect(fakeToggleEdit).toBeCalledTimes(1)

});