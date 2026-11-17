# ShoeStop Backend API (Dockerized Node.js + Express + MongoDB)

Production-ready REST API for the **ShoeStop** e-commerce platform, containerized with Docker, tested via GitHub Actions CI, and deployed on Render.

## Live Endpoints
- **Base API URL:** `https://shoestop-docker-backend.onrender.com`
- **Health & Monitoring:** `https://shoestop-docker-backend.onrender.com/api/health`

## API Routes
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Server & MongoDB health telemetry |
| `POST` | `/signup` | Public | Register a new customer account |
| `POST` | `/login` | Public | Authenticate user & issue JWT |
| `GET` | `/api/getproducts` | Public | Fetch full footwear catalog |
| `GET` | `/api/addcart` | JWT | Fetch logged-in user's cart items |
| `POST` | `/api/addcart` | JWT | Add footwear item to user's cart |
| `DELETE` | `/api/addcart/:id` | JWT | Remove item from user's cart |
| `POST` | `/api/orders` | JWT | Checkout & persist order to MongoDB |
| `GET` | `/api/orders` | JWT | Retrieve user's order history |

## Run with Docker
```bash
docker build -t shoestop-backend .
docker run -p 5000:5000 -e MONGO_URL="<your_mongo_uri>" -e JWT_SECRET="<your_secret>" shoestop-backend
```
