# Tech Stack
# Frontend
React.js (with Hooks)
Axios for HTTP requests
React Router for navigation
Tailwind CSS (optional styling)
# Backend
Node.js & Express.js
MongoDB + Mongoose
Multer for file uploads
JWT for authentication
dotenv for environment variables

# Backend
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydb or get an mongodb instance from Mongodb.com
JWT_SECRET=your_jwt_secret
UPLOAD_DIR=uploads for image uploads

# Backend setup 
cd backend
npm install 
node index.js

# API Testing (Postman)
{Base Url} ->(POST) -> http://localhost:3000/api/v1/user/signup (with image upload)
(for Image) key=image, Type=file , value profile.jpg

# Frontend setup 
cd frontend/trackersite
npm install 
npm run dev


# Frontend
REACT_APP_API_URL=http://localhost:5173/