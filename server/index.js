const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dynamic Data Store (In a real app, this would be MongoDB/MySQL)
let cars = [
  {
    id: '1',
    name: 'Audi Q7 50 Quattro',
    brand: 'Audi',
    price: 88,
    rating: 4.5,
    people: 4,
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    description: 'The Audi Q7 is the ultimate luxury SUV for families.',
    owner: { name: 'Jenny Doe', role: 'Owner', image: 'https://i.pravatar.cc/150?u=jenny' }
  },
  {
    id: '2',
    name: 'Tesla Model 3',
    brand: 'Tesla',
    price: 120,
    rating: 4.9,
    people: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the future of driving with the Tesla Model 3.',
    owner: { name: 'Michael Smith', role: 'Owner', image: 'https://i.pravatar.cc/150?u=michael' }
  }
];

let bookings = [];

// --- OWNER ENDPOINTS ---

// Add a new car (Owner feature)
app.post('/api/cars', (req, res) => {
  const newCar = {
    id: Date.now().toString(),
    ...req.body,
    rating: 5.0, // New cars start with 5.0
    owner: { 
      name: 'Logged-in Owner', 
      role: 'Owner', 
      image: 'https://i.pravatar.cc/150?u=owner' 
    }
  };
  cars.unshift(newCar); // Add to the top of the list
  res.status(201).json(newCar);
});

// --- BUYER ENDPOINTS ---

// Get all cars with search filter
app.get('/api/cars', (req, res) => {
  const { search } = req.query;
  if (search) {
    const filtered = cars.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.brand.toLowerCase().includes(search.toLowerCase())
    );
    return res.json(filtered);
  }
  res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === req.params.id);
  if (car) res.json(car);
  else res.status(404).json({ message: 'Car not found' });
});

app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  booking.id = Date.now().toString();
  booking.status = 'Pending';
  bookings.push(booking);
  res.status(201).json(booking);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
