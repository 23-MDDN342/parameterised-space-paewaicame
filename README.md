[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DlFCTo_q)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14047201&assignment_repo_type=AssignmentRepo)

# MDDN342 Project 1: Parameterised Space
This design is an expansion of a catalog of wallpaper designs I created as a personal venture into online digital marketplaces, elevating static designs into animated ones that ambiently ebb and flow.

It takes the form of a wallpaper pack I designed called RISOGRAPH, an arrangement of shapes with overlays of gradient maps and filters, creating a striking and vibrant visual effect.

## Shapes
The composition of the background relies on distrubuting shapes in a random fashion. I did not end up making use of the `simplex-noise.js` function, as all of my random values ended up covered by an LCG function that generates an array of pseudo-random numbers I refer to in my code. This gave me greater control over the type of values and the randomness I was provided.

The shapes are generated based on a variety of variables, such as canvas width/height, size, position, corner radii, and gradient fill. These are coordinated in a way that creates a background that aligns to a grid in an ordered manner, yet retains a sense of randomness.

## Overlay
An arrangement of rings are drawn over the background of shapes, adding more variation to the colors in the background.

The position, sizing, and color of the rings is determined by an array of presets. Clicking on the canvas cycles through a variety of presets, each with hand-crafted color palettes and ring arrangements.

An additional layer of noise is added to the background as a whole to give the gradients texture and to resemble risograph-style printing methods.

## Methods
The original designs make use of gradient maps, which map the luminance of pixels in the image to a colored gradient. I explored the possibilities of creating a similar effect in p5.js, such as using `loadPixels()` to perform arithmetic on the individual pixels themselves, or using the p5.js WebGL renderer to employ custom GLSL shaders, but both turned out to be not performant enough or not viable to learn for the remainder of the project.

I settled on using an offscreen buffer to draw graphics which would be overlaid on the original graphics via blend modes. The result is a different appearance that is more subtle, which may work nicer in the context of a Zoom background.

## ChatGPT usage
ChatGPT was used in the development of this project to debug issues and provide personalised insight on my project goals. For instance, ChatGPT walked me through the pros and cons of methods in which I could achieve the gradient-map-like effect I wanted, which led me to compromise on a simpler design. ChatGPT was not used to generate sizeable blocks of code to copy and paste, or to provide ideas that would create a major diversion from my initial concept.

The entire chat conversation for this project can be found [here](https://chat.openai.com/share/7cb701fd-df2c-4b72-a98a-4e1e0e788b92)