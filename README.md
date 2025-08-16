# PageSync

Transform your PDFs into concise, AI-powered summaries in seconds.

## Features

- **AI-Powered Summarization** - Convert lengthy PDFs into engaging, easy-to-read summaries
- **Smart Upload** - Drag & drop PDF files with automatic processing
- **User Authentication** - Secure login/signup with Clerk
- **Dashboard** - Manage and view all your summaries in one place
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Export Options** - Markdown formatted summaries with emojis
- **Usage Limits** - Tiered pricing with different upload limits

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Clerk
- **Database:** Neon (PostgreSQL)
- **File Upload:** UploadThing
- **AI Integration:** Google Gemini & OpenAI
- **PDF Processing:** LangChain
- **Notifications:** Sonner

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pagesync
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables** (see below)

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="your-neon-database-url"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# File Upload (UploadThing)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# AI Services
GEMINI_API_KEY="your-gemini-api-key"
OPENAI_API_KEY="your-openai-api-key"
```

## Database Setup

This app uses Neon PostgreSQL. Create a table with the following structure:

```sql
CREATE TABLE pdf_summaries (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  original_file_url TEXT NOT NULL,
  summary_text TEXT NOT NULL,
  title VARCHAR,
  file_name VARCHAR,
  status VARCHAR DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

1. **Sign Up/Login** - Create an account or sign in
2. **Upload PDF** - Go to `/upload` and select your PDF file
3. **AI Processing** - Wait for AI to analyze and summarize your document
4. **View Summary** - Access your summary from the dashboard
5. **Manage** - Delete or revisit summaries anytime

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (logged-in)/       # Protected routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── common/           # Shared components
│   ├── home/             # Homepage components
│   ├── summaries/        # Summary-related components
│   ├── ui/               # shadcn/ui components
│   └── upload/           # Upload components
├── lib/                   # Utility libraries
|   ├── db.ts # db object
|   ├── gemini.ts, openai.tx # call gemini/openai api
|   ├── langchain.ts # parse PDF to text
|   ├── payment.ts, user.ts, summaries.ts # basic db operation(use db obj from db.ts)
|   ├── db.ts # db object
├── utils/                 # Helper functions
└── actions/              # Server actions
```

## Key Features Detail

### AI Summarization

- Supports both Gemini and OpenAI models
- Contextual emoji integration
- Markdown formatted output
- Structured summary format

### File Upload

- 32MB file size limit
- PDF format validation
- Progress tracking
- Error handling

### User Management

- Secure authentication with Clerk
- Usage limits by plan
- User-specific summaries

## Deployment

This app is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Automatic deployments on push

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with Next.js and AI
