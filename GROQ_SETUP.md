# Groq API Setup Guide

## 1. Get Your Groq API Key

1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the API key

## 2. Create Environment File

Create a file named `.env.local` in the root directory (`floatchat-landing/.env.local`) with the following content:

```bash
# Groq API Configuration
NEXT_PUBLIC_GROQ_API_KEY=your_actual_groq_api_key_here
```

Replace `your_actual_groq_api_key_here` with the API key you copied from the Groq Console.

## 3. Model Information

The application is now configured to use the **Llama-3.3-70B-Versatile** model, which provides:
- Better reasoning capabilities
- More accurate responses
- Enhanced understanding of oceanographic concepts
- Improved natural language processing

## 4. Security Notes

- The `.env.local` file is automatically ignored by git
- Never commit your API key to version control
- Keep your API key secure and private
- The API key is prefixed with `NEXT_PUBLIC_` to make it available in the browser

## 5. Testing the Setup

After setting up the environment file:
1. Restart your development server: `npm run dev`
2. Navigate to the dashboard: `/dashboard`
3. Try asking: "Show me salinity profiles near the equator"
4. You should see AI responses and generated visualizations

## 6. Troubleshooting

If you encounter issues:
- Check that the `.env.local` file is in the correct location
- Verify the API key is valid and active
- Ensure there are no extra spaces in the environment variable
- Check the browser console for any error messages
