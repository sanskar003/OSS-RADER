"use client";

import { useGithubTopLanguage } from "@/hooks/useGithubTopLanguage";


export default function TopLanguagesPage() {
  const { data, isLoading, error } = useGithubTopLanguage();

  if (isLoading) {
    return <p className="text-3xl p-6">Loading languages...</p>;
  }

  if (error || !data) {
    return (
      <p className="text-red-500 p-6">
        Failed to load GitHub languages
      </p>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Top Languages</h1>

        <p className="text-gray-600 mt-1">
          Most used languages across your GitHub repositories
        </p>

        {data.topLanguage && (
          <p className="mt-2 text-green-600 font-medium">
            🏆 Top Language: {data.topLanguage}
          </p>
        )}
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {data.languages.map((lang) => (
          <div
            key={lang.language}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          >
            <span className="font-medium">
              {lang.language}
            </span>

            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">
                {lang.bytes} bytes
              </span>

              {/* simple visual bar */}
              <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-2"
                  style={{
                    width: `${Math.min(
                      (lang.bytes / data.languages[0].bytes) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}