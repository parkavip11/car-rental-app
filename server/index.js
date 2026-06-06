const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
const CARS_DATA = [
  {
    id: '1',
    name: 'Audi Q7 50 Quattro',
    brand: 'Audi',
    price: 88,
    rating: 4.5,
    people: 4,
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    description: 'The Audi Q7 is the ultimate luxury SUV for families. With its spacious interior, advanced technology features, and impressive performance, it provides a premium driving experience for all passengers.',
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
    description: 'Experience the future of driving with the Tesla Model 3. An all-electric powertrain delivers instant torque and incredible acceleration.',
    owner: { name: 'Michael Smith', role: 'Owner', image: 'https://i.pravatar.cc/150?u=michael' }
  },
  {
    id: '3',
    name: 'BMW M4 Coupe',
    brand: 'BMW',
    price: 150,
    rating: 4.8,
    people: 2,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1555215695-3004980adbee?auto=format&fit=crop&q=80&w=800',
    description: 'The BMW M4 Coupe combines sporty performance with everyday usability. Its powerful engine and agile handling make it a joy to drive.',
    owner: { name: 'David Lee', role: 'Owner', image: 'https://i.pravatar.cc/150?u=david' }
  }
];

const bookings = [];

// Endpoints
app.get('/api/cars', (req, res) => {
  res.json(CARS_DATA);
});

app.get('/api/cars/:id', (req, res) => {
  const car = CARS_DATA.find(c => c.id === req.params.id);
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  booking.id = Date.now().toString();
  bookings.push(booking);
  res.status(201).json({ message: 'Booking successful', booking });
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.get('/', (req, res) => {
  res.send('Car Rental API is running...');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
