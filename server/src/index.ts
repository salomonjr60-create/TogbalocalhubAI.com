import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ContentGenerationRequest, ContentGenerationResponse } from './types.js';
import { validateContentRequest } from './validators.js';
import { geminiService } from './gemini.js';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    demoMode: geminiService.isInDemoMode(),
  });
});

// Content generation endpoint
app.post('/api/generate-content', async (req: Request, res: Response) => {
  try {
    const request = req.body as Partial<ContentGenerationRequest>;

    // Validate input
    const validation = validateContentRequest(request);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors,
      });
    }

    // Generate content using Gemini
    const response = await geminiService.generateContent(
      request as ContentGenerationRequest
    );

    // Return response with appropriate status code
    const statusCode = response.success ? 200 : 500;
    res.status(statusCode).json(response);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    console.error('API error:', errorMessage);

    res.status(500).json({
      success: false,
      content: '',
      isDemoData: false,
      contentType: req.body?.contentType || 'unknown',
      timestamp: new Date().toISOString(),
      error: errorMessage,
    } as ContentGenerationResponse);
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Togba Local Hub AI Backend Server`);
  console.log(`📍 Running on http://localhost:${PORT}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/generate-content`);
  console.log(`💡 Health check: http://localhost:${PORT}/api/health`);

  if (geminiService.isInDemoMode()) {
    console.log(
      `\n⚠️  DEMO MODE: Set GEMINI_API_KEY environment variable to enable real AI generation\n`
    );
  } else {
    console.log(`\n✅ Gemini API configured and ready\n`);
  }
});

export default app;
