import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { GeminiIcon } from '../components/icons';

const Gemini: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setResponse(result.text);
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      setError(
        'Failed to get a response from the Gemini API. Please check the console for more details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <GeminiIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-3xl font-bold text-brand-text-light">Ask Gemini</h1>
      </div>

      <div className="bg-brand-surface rounded-xl shadow-lg p-6 space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-brand-text-dark mb-2"
          >
            Enter your prompt
          </label>
          <textarea
            id="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
            placeholder="e.g., What are the best exercises for building leg muscle?"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-semibold shadow disabled:bg-brand-secondary disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Response'
            )}
          </button>
        </div>
      </div>

      {(error || response || loading) && (
        <div className="bg-brand-surface rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-brand-text-light">
            Response
          </h2>
          {loading && (
            <p className="text-brand-text-dark animate-pulse">
              Gemini is thinking...
            </p>
          )}
          {error && (
            <div className="bg-brand-danger/20 text-brand-danger p-4 rounded-md text-sm">
              {error}
            </div>
          )}
          {response && (
            <div
              className="prose prose-invert max-w-none text-brand-text-light"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {response}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gemini;
