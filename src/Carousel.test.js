import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


it("renders without crashing", function() {
  render(<Carousel title="test" />)
});

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel title="test" />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the left arrow", function() {
  const {queryByTestId, queryByAltText} = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(rightArrow);

  fireEvent.click(leftArrow); 
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

//looked at solution for toHaveClass("hidden") and for setup
it("hides and shows arrows appropriately", function() {
  const {queryByTestId} = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toHaveClass("hidden")
  expect(rightArrow).not.toHaveClass("hidden")
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden")
  expect(rightArrow).not.toHaveClass("hidden")
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden")
  expect(rightArrow).toHaveClass("hidden")
});

