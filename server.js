/**
 * Application Entry Point
 * 
 * Author: Fahad Hussain
 * Description: Production-ready Node.js API server configured for containerized deployments.
 */

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// =============================================================================
// Security & Middleware Configuration
// =============================================================================

// Security HTTP headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(cors());

// Request Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP Request Logging
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Custom Headers / Metadata
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Fahad Hussain Core Platform');
  next();
});

// =============================================================================
// Health Checks (Kubernetes Liveness / Readiness Probes)
// =============================================================================

app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    author: 'Fahad Hussain',
  });
});

// =============================================================================
// API Routes
// =============================================================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Node.js Microservice API Engine',
    author: 'Fahad Hussain',
    environment: NODE_ENV,
    version: '1.0.0',
  });
});

app.post('/api/v1/resource', (req, res) => {
  const { payload } = req.body;

  if (!payload) {
    return res.status(400).json({
      success: false,
      error: 'Missing required field: payload',
    });
  }

  return res.status(201).json({
    success: true,
    data: payload,
    message: 'Resource processed successfully',
  });
});

// =============================================================================
// Error Handling Middleware
// =============================================================================

// Catch 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Global Exception Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack);

  res.status(err.status || 500).json({
    success: false,
    error: NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

// =============================================================================
// Server Initialization & Graceful Shutdown
// =============================================================================

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Developer: Fahad Hussain`);
  console.log(` Application running on port: ${PORT}`);
  console.log(` Environment: ${NODE_ENV}`);
  console.log(`====================================================`);
});

// Graceful Shutdown Signal Handlers
const handleShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
