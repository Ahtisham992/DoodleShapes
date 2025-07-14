# 🔺⬜ Shape Canvas - Kids Learning App

A comprehensive, interactive web application for kids (around age 6) to learn about shapes through play and interaction.

## ✨ Features

- **🔺⬜ Shape Dropdown**: Choose between triangles and squares from a dropdown menu
- **🎯 Drag & Drop**: All shapes are draggable for fun interaction
- **🎨 Selection**: Click on shapes to select them (highlighted with black border)
- **📏 Size Controls**: Increase (+) or decrease (-) size of selected shapes
- **🎨 Color Picker**: Change the color of selected shapes with a color picker
- **🧽 Erase**: Delete selected shapes with the erase button
- **🗑️ Clear Board**: Remove all shapes at once
- **🌈 Bright Colors**: Kid-friendly bright colors (orange, skyblue, red, etc.)
- **📱 Responsive**: Works on different screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or create the project folder:**
   ```bash
   mkdir shape-canvas-app
   cd shape-canvas-app
   ```

2. **Install dependencies:**
   ```bash
   npm install react react-dom react-scripts konva react-konva
   ```

3. **Copy all the files** from the file structure above into their respective folders.

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🎮 How to Use

1. **Add Shapes**: Click the "🔺⬜ Add Shape" dropdown and select Triangle or Square
2. **Move Shapes**: Click and drag any shape to move it around
3. **Select Shapes**: Click on a shape to select it (it will get a black border)
4. **Change Size**: Use the + and - buttons to make selected shapes bigger or smaller
5. **Change Color**: Use the color picker to change the color of selected shapes
6. **Erase Shapes**: Select a shape, then click "🧽 Erase Selected" to delete it
7. **Clear Everything**: Click "🗑️ Clear Board" to remove all shapes

## 🏗️ Technical Details

- **Framework**: React.js with functional components
- **Canvas**: Konva.js and react-konva for 2D graphics
- **State Management**: React useState hooks
- **Styling**: CSS with gradients and modern design
- **Responsive**: Automatically adjusts to screen size
- **Shape Types**: Triangles (using Line with closed path) and Squares (using Rect)

## 📁 Project Structure

```
shape-canvas-app/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Canvas.js       # Main canvas component
│   │   ├── Toolbar.js      # Toolbar with dropdown and controls
│   │   ├── Triangle.js     # Triangle shape component
│   │   └── Square.js       # Square shape component
│   ├── App.js              # Main app component
│   ├── App.css             # Enhanced styles with new controls
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🎨 Educational Value

This app helps kids learn:
- **Shape Recognition**: Identifying triangles and squares
- **Motor Skills**: Dragging and clicking
- **Size Concepts**: Understanding bigger and smaller
- **Color Recognition**: Working with different colors
- **Spatial Awareness**: Moving objects around
- **Cause and Effect**: Clicking buttons creates results

## 🆕 New Features Added

- **Shape Dropdown**: Easy selection between different shapes
- **Size Controls**: Interactive + and - buttons for resizing
- **Color Picker**: HTML5 color input for custom colors
- **Enhanced UI**: Grouped controls with better visual organization
- **Improved Responsiveness**: Better layout on different screen sizes

## 🔧 Future Enhancements

- Add more shapes (circles, rectangles, stars)
- Rotation controls for shapes
- Copy/paste functionality
- Save/load drawings
- Shape animation
- Sound effects
- Touch gestures for mobile
- Shape transformation tools

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for kids learning about shapes!