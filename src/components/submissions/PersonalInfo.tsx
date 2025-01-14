import React from 'react';

interface PersonalInfoProps {
  age: string | null;
  country: string | null;
  languages: string | null;
  hobbies: string | null;
  dreams: string | null;
}

export const PersonalInfo = ({ age, country, languages, hobbies, dreams }: PersonalInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-lg backdrop-blur-sm animate-float">
        <h3 className="font-semibold mb-2 text-purple-600">Personal Information</h3>
        <dl className="space-y-2">
          <div className="transform hover:scale-105 transition-all duration-300">
            <dt className="text-sm font-medium text-pink-500">Age</dt>
            <dd className="text-gray-900">{age}</dd>
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <dt className="text-sm font-medium text-pink-500">Country</dt>
            <dd className="text-gray-900">{country}</dd>
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <dt className="text-sm font-medium text-pink-500">Languages</dt>
            <dd className="text-gray-900">{languages}</dd>
          </div>
        </dl>
      </div>
      <div className="bg-gradient-to-bl from-purple-100 to-pink-100 p-4 rounded-lg backdrop-blur-sm animate-float" style={{ animationDelay: "0.2s" }}>
        <h3 className="font-semibold mb-2 text-purple-600">About</h3>
        <dl className="space-y-2">
          <div className="transform hover:scale-105 transition-all duration-300">
            <dt className="text-sm font-medium text-pink-500">Hobbies</dt>
            <dd className="text-gray-900">{hobbies}</dd>
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <dt className="text-sm font-medium text-pink-500">Dreams and Goals</dt>
            <dd className="text-gray-900">{dreams}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};