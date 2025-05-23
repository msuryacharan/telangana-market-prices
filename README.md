# Telangana Government Market Prices

A static, responsive website that displays daily market prices of goods sold in government markets across districts of Telangana.

## Features

- Filter data by district, market, and date
- Display filtered results in a clean, tabular format
- Responsive design for mobile and desktop
- Visitor counter
- Daily data refresh from GitHub-hosted JSON

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Data Structure

The website uses a JSON file with the following structure:

```json
[
  {
    "id": 1,
    "date": "2025-05-23",
    "district": "Nalgonda",
    "market": "Miryalaguda",
    "product": "Tomato",
    "price_per_kg": 24,
    "price_per_quintal": 2400,
    "previous_day_price": 22,
    "price_change_percentage": 9.09
  },
  ...
]
```

## Updating the Data

To update the market price data:

1. Create a new JSON file with the latest data
2. Format it according to the structure above
3. Push it to the GitHub repository
4. The website will automatically fetch the latest data

## Deployment

This website is designed to be deployable via GitHub Pages:

1. Build the project: `npm run build`
2. Deploy the contents of the `dist` directory to GitHub Pages

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Build for production: `npm run build`

## License

MIT