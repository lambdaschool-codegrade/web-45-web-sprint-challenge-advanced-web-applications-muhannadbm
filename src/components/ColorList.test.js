import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';
import userEvent from '@testing-library/user-event';

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]} />)
});

test("Renders a list of colors without errors", () => {

    render(<ColorList colors={[
        {
          "color": "aliceblue",
          "code": {
            "hex": "#f0f8ff"
          },
          "id": 1
        },
        {
          "color": "limegreen",
          "code": {
            "hex": "#99ddbc"
          },
          "id": 2
        },
        {
          "color": "aqua",
          "code": {
            "hex": "#00ffff"
          },
          "id": 3
        }
      ]} />)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", async() => {
    render(<ColorList colors={[        {
        "color": "aliceblue",
        "code": {
          "hex": "#f0f8ff"
        },
        "id": 1
      }]} />)

      const editbut = screen.getByTestId('color')
      const form = screen.queryByTestId('edit_menu')
      expect(form).toBeNull()
      userEvent.click(editbut)

      const editform = await screen.findByTestId("edit_menu");
      expect(editform).toBeInTheDocument()


});
