import React, { useEffect } from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';
import fetchColorService from '../services/fetchColorService';

jest.mock('../services/fetchColorService')

test("Renders without errors", ()=> {
    render(<BubblePage />)
    
});
jest.mock('../services/fetchColorService')

test("Renders appropriate number of colors passed in through mock", async ()=> {

    //Keep in mind that our service is called on mount for this component.
    fetchColorService()
    fetchColorService.mockResolvedValueOnce(
            {
              "color": "aliceblue",
              "code": {
                "hex": "#f0f8ff"
              },
              "id": 1
            }
          );

    render(<BubblePage  />)


    //  const colors = await screen.findAllByTestId('color')
    //  expect(colors).toHaveLength(1)

});