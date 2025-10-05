# Companies Directory

A responsive **React.js** application to display and filter company data with table and card views. Built for Frontlines Media.

<div style="display: flex; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/3fdfb847-8c00-4da3-aea3-fc6ab65d6bd6" width="49%" alt="App Screenshot 1" />
  <img src="https://github.com/user-attachments/assets/123f256f-a015-4455-8a63-3c628d415193" width="49%" alt="App Screenshot 2" />
</div>



---

## 🚀 Features

- Display companies in **Table** or **Card** view
- Filter companies by:
  - Name (search)
  - Industry
  - Location
- Sort companies by various fields
- Pagination with configurable **rows per page**
- URL query parameters preserve filter and sort state
- Responsive design for mobile and desktop
- Polished UI with icons and hover effects
- Mocked API integration (JSON Server or static JSON)
- Redux Toolkit for state management

---

## 🛠 Technologies Used

- **React.js** (Vite) – Frontend library
- **TypeScript** – Type safety
- **Redux Toolkit** – State management
- **Tailwind CSS** – Utility-first styling
- **react-data-table-component** – Table display with pagination
- **Lucide React** – Icons
- **JSON Server** – Mock API for company data

---

## 📦 Project Structure

src/

├─ components/

│ ├─ Card.tsx

│ ├─ Filters.tsx

│ └─ SelectField.tsx

├─ features/

│ └─ companies/

│ ├─ companiesSlice.ts

│ └─ types.ts

├─ constants/

│ └─ index.ts

├─ hooks/

│ └─ useAppSelector.ts / useAppDispatch.ts

├─ App.tsx

└─ main.tsx


- `Card.tsx` – Displays company information in a card layout  
- `Filters.tsx` – Filter controls (search, dropdowns, sorting)  
- `SelectField.tsx` – Reusable dropdown component with icon support  
- `companiesSlice.ts` – Redux slice managing companies, filters, sorting, and pagination  
- `constants/index.ts` – Sort options, view modes, rows per page  

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/venkylad/Dashboard-Tables.git
cd Dashboard-Tables
```

### 2. Install dependencies
```bash
npm install
```

### 3.Run JSON Server (Mock API)
```bash
npx json-server --watch db.json --port 5000
```

### 4. Run the frontend
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

## ⚙️ Scripts

- `npm run dev` – Run development server
- `npm run build` – Build production-ready app
- `npm run preview` – Preview production build

## 📄 Notes

- Filters, sort, and pagination are saved in URL query params
- Table supports rows per page selection and pagination controls
- Cards and table views can be toggled dynamically
- All external links (website, email, phone) are clickable

## 🎨 UI / Styling

- Tailwind CSS for utility-first styling
- Hover effects and shadows for card interactivity
- Icons used from Lucide React
- Responsive layouts for mobile and desktop
