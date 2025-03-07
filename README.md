# 📊 Data Viewer App

A cool React app I built for managing store data and visualizing sales metrics! 🚀

## 🎯 What it Does

This app helps you:
- Manage stores and SKUs
- Plan and track sales
- See pretty charts of your data
- Calculate profits automatically

## 🛠️ Built With

- React (because who doesn't love React?)
- Redux (for that sweet state management)
- Material-UI (for making things look nice)
- AG Grid (the real MVP for handling complex data)

## 📱 Features

### 🏪 Store Management
- Add/edit/delete stores
- Keep track of:
  - Store names
  - Cities
  - States
- Nice table view with numbering
### 📦 SKU Management
- Add/edit/delete SKUs
- Track prices and costs
- Super easy to update
### 📊 Planning Grid
The cool part! Uses AG Grid to show:

- Sales Units (you can edit these)
- Sales Dollars (auto-calculated)
- GM Dollars (profit stuff)
- GM% with pretty colors:
  - 🟢 Green (≥40%) = Awesome
  - 🟡 Yellow (≥10%) = Pretty good
  - 🟧 Orange (>5%) = Meh
  - 🔴 Red (≤5%) = Need improvement
### 📈 Charts
- Bar charts showing GM$ and GM%
- Pick a store and see its performance
- Easy to read weekly data
## 🗂️ Project Structure
```plaintext
src/
├── components/     # The building blocks
├── pages/         # The main screens
├── store/         # Redux stuff
├── assets/        # Images and stuff
└── App.jsx        # Where it all begins
 ```

## 🧮 How It Calculates
```javascript
// The math behind the magic
salesDollars = salesUnits * price
gmDollars = salesDollars - (salesUnits * cost)
gmPercent = (gmDollars / salesDollars) * 100
 ```

## 🎨 Styling
- Used Material-UI because it's awesome
- Everything's responsive (min-width: 1080px)
- Charts and grids fit perfectly
## 🔧 Dev Notes
- Remember to run npm run lint before committing
- The grid updates automatically when you change sales units
- Charts refresh when store selection changes
## 💡 Future Ideas
- Add dark mode
- Export to Excel
- More chart types
- Mobile view (maybe?)
