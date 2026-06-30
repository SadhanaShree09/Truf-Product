import crypto from 'node:crypto'
import http from 'node:http'
import { MongoClient } from 'mongodb'

const PORT = Number(process.env.PORT || 4000)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'
const DATABASE_NAME = process.env.MONGODB_DB || 'truf_play_auth'
const USERS_COLLECTION = 'users'

let mongoClient
let usersCollectionPromise

const dashboard = {
  user: {
    name: 'Player',
    avatar: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?auto=format&fit=crop&w=240&q=80',
  },
  searchPlaceholder: 'Search for turfs, locations...',
  selectedDate: 'Today, 29 May',
  sports: [
    { label: 'Football', active: true },
    { label: 'Cricket' },
    { label: 'Badminton' },
    { label: 'Padel' },
  ],
  turf: {
    name: 'GreenField Arena',
    location: 'HSR Layout, Bangalore',
    distance: '2.4 km away',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80',
    description: 'Premium FIFA quality turf with night lighting, ample parking and locker rooms.',
    tags: ['FIFA Turf', 'Lightings', 'Parking', 'Changing Room'],
  },
  slots: [
    { time: '06:00 AM', price: 800, status: 'available' },
    { time: '07:00 AM', price: 800, status: 'available' },
    { time: '08:00 AM', price: 800, status: 'available' },
    { time: '09:00 AM', price: 800, status: 'available' },
    { time: '05:00 PM', price: 1200, status: 'available' },
    { time: '06:00 PM', price: 1200, status: 'available', featured: true },
    { time: '07:00 PM', price: 1200, status: 'available' },
    { time: '08:00 PM', price: 1200, status: 'available' },
    { time: '09:00 PM', price: 1000, status: 'available' },
    { time: '10:00 PM', price: 1000, status: 'booked' },
    { time: '11:00 PM', price: 1000, status: 'available' },
    { time: '12:00 AM', price: 800, status: 'available' },
  ],
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  response.end(JSON.stringify(payload))
}

function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let rawBody = ''

    request.on('data', (chunk) => {
      rawBody += chunk
    })

    request.on('end', () => {
      if (!rawBody) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(rawBody))
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

function verifyPassword(password, storedPassword) {
  const [salt, hash] = String(storedPassword || '').split(':')

  if (!salt || !hash) {
    return false
  }

  const derivedHash = crypto.scryptSync(password, salt, 64).toString('hex')
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derivedHash, 'hex'))
}

function serializeUser(user) {
  return {
    id: user._id?.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}

async function getUsersCollection() {
  if (!usersCollectionPromise) {
    usersCollectionPromise = (async () => {
      if (!mongoClient) {
        mongoClient = new MongoClient(MONGODB_URI)
        await mongoClient.connect()
      }

      const collection = mongoClient.db(DATABASE_NAME).collection(USERS_COLLECTION)
      await collection.createIndex({ email: 1 }, { unique: true })
      return collection
    })()
  }

  return usersCollectionPromise
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    response.end()
    return
  }

  if (request.url === '/api/health') {
    sendJson(response, 200, { ok: true })
    return
  }

  if (request.url === '/api/auth/register' && request.method === 'POST') {
    try {
      const body = await parseJsonBody(request)
      const name = String(body.name || '').trim()
      const email = normalizeEmail(body.email)
      const password = String(body.password || '')

      if (!name || !email || !password) {
        sendJson(response, 400, { message: 'Name, email, and password are required' })
        return
      }

      if (password.length < 6) {
        sendJson(response, 400, { message: 'Password must be at least 6 characters long' })
        return
      }

      const usersCollection = await getUsersCollection()
      const existingUser = await usersCollection.findOne({ email })

      if (existingUser) {
        sendJson(response, 409, { message: 'An account with that email already exists' })
        return
      }

      const userDocument = {
        name,
        email,
        passwordHash: hashPassword(password),
        createdAt: new Date(),
      }

      const result = await usersCollection.insertOne(userDocument)
      sendJson(response, 201, {
        message: 'Account created successfully',
        user: serializeUser({ ...userDocument, _id: result.insertedId }),
      })
    } catch (error) {
      if (error?.code === 11000) {
        sendJson(response, 409, { message: 'An account with that email already exists' })
        return
      }

      sendJson(response, 500, { message: 'Unable to register user' })
    }

    return
  }

  if (request.url === '/api/auth/login' && request.method === 'POST') {
    try {
      const body = await parseJsonBody(request)
      const email = normalizeEmail(body.email)
      const password = String(body.password || '')

      if (!email || !password) {
        sendJson(response, 400, { message: 'Email and password are required' })
        return
      }

      const usersCollection = await getUsersCollection()
      const user = await usersCollection.findOne({ email })

      if (!user || !verifyPassword(password, user.passwordHash)) {
        sendJson(response, 401, { message: 'Invalid email or password' })
        return
      }

      sendJson(response, 200, {
        message: 'Login successful',
        user: serializeUser(user),
      })
    } catch {
      sendJson(response, 500, { message: 'Unable to login user' })
    }

    return
  }

  if (request.url === '/api/dashboard' && request.method === 'GET') {
    sendJson(response, 200, dashboard)
    return
  }

  if (request.url === '/api/bookings' && request.method === 'POST') {
    try {
      const payload = await parseJsonBody(request)
      const bookingId = `BK-${Date.now().toString().slice(-6)}`

      sendJson(response, 201, {
        bookingId,
        status: 'confirmed',
        sport: payload.sport ?? 'Football',
        turf: payload.turf ?? dashboard.turf.name,
        slot: payload.slot ?? '06:00 PM',
        price: payload.price ?? 1200,
      })
    } catch {
      sendJson(response, 400, { message: 'Invalid booking payload' })
    }

    return
  }

  sendJson(response, 404, { message: 'Route not found' })
})

server.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`)
})
