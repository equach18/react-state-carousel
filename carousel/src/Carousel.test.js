import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke test
it("renders without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

// Snapshot testing
it("matches snapshot", () => {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click the left arrow", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // move to second pic in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  // click on the left arrow in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);
  // expect the first img to show, but the not the third one should show
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();
});

it("hides the left arrow on the first image and the right on the last", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  let leftArrow = container.querySelector(".bi-arrow-left-circle");
  let rightArrow = container.querySelector(".bi-arrow-right-circle");
  // expect left arrow not present on first pic
  expect(leftArrow).not.toBeInTheDocument();
  // expect right arrow to be present 
  expect(rightArrow).toBeInTheDocument();

  // click to last img
  for (let i =1; i < TEST_IMAGES.length; i++){
    fireEvent.click(rightArrow);
  }
  // requery the DOM after the state changed
  leftArrow = container.querySelector(".bi-arrow-left-circle");
  rightArrow = container.querySelector(".bi-arrow-right-circle");
  // expect right arrow not to be in document 
  expect(rightArrow).not.toBeInTheDocument();
  // expect left arrow to be in document
  expect(leftArrow).toBeInTheDocument();

});
